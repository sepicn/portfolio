import * as THREE from "three";

/**
 * Lived-in city behind the window: apartment windows go dark and light up again at
 * random, all on the GPU. One shared time uniform drives every patched material, so
 * nothing re-renders in React and the cost is a few ALU ops per fragment.
 *
 * Two kinds of windows get it:
 * - the skyline texture on the far plane (material "city"), whose panes blender/build_room.py
 *   (city_texture) draws on a fixed pixel grid, so each pane is found from its UV here
 *   and redrawn;
 * - the small emissive boxes on the foreground towers (node "towers"), grouped into one
 *   window each on the CPU once and tagged with a per-window seed attribute.
 */

/** Must match city_texture() in blender/build_room.py. */
export const CITY_GRID = {
  size: [1024, 512],
  cell: 8,
  paneMin: [2, 2],
  paneMax: [5, 6],
} as const;

/** Seconds, shared by every patched material. Frozen at 0 for reduced motion. */
export const cityTime = { value: 0 };

const f = (n: number) => n.toFixed(1);

const COMMON = /* glsl */ `
uniform float uCityTime;
float cityHash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
// 1 when the window with this seed is lit. Every 9 to 30 s (per window) it rolls again:
// about one roll in four leaves it dark. The switch itself takes a quarter second.
float cityWindowOn(float seed) {
  float period = mix(9.0, 30.0, cityHash(vec2(seed, 1.7)));
  float x = uCityTime / period + seed * 17.0;
  float cycle = floor(x);
  float now = step(0.26, cityHash(vec2(seed * 7.1, cycle)));
  float before = step(0.26, cityHash(vec2(seed * 7.1, cycle - 1.0)));
  return mix(before, now, smoothstep(0.0, 0.25 / period, fract(x)));
}
`;

// The web build halves the texture to 512 px and WebP drops most of the colour of a
// 1.5 px pane, so the texture only says which cells hold a lit window. The pane itself is
// redrawn here, crisp and in the synthwave palette, and switched on and off.
const SKYLINE = /* glsl */ `
vec3 cityBase = totalEmissiveRadiance;
#include <emissivemap_fragment>
#ifdef USE_EMISSIVEMAP
{
  vec2 citySize = vec2(${f(CITY_GRID.size[0])}, ${f(CITY_GRID.size[1])});
  vec2 cityPx = vec2(vEmissiveMapUv.x, 1.0 - vEmissiveMapUv.y) * citySize;
  vec2 cityCell = floor(cityPx / ${f(CITY_GRID.cell)});
  vec2 cityLocal = cityPx - cityCell * ${f(CITY_GRID.cell)};
  vec2 paneMin = vec2(${f(CITY_GRID.paneMin[0])}, ${f(CITY_GRID.paneMin[1])});
  vec2 paneMax = vec2(${f(CITY_GRID.paneMax[0])}, ${f(CITY_GRID.paneMax[1])});
  // Does this cell hold a lit pane? Read the texture once, at the pane centre.
  vec2 centrePx = cityCell * ${f(CITY_GRID.cell)} + (paneMin + paneMax) * 0.5;
  vec3 centre = textureLod(emissiveMap, vec2(centrePx.x / citySize.x, 1.0 - centrePx.y / citySize.y), 0.0).rgb;
  float cityLit = smoothstep(0.08, 0.2, max(max(centre.r, centre.g), centre.b));
  // The pane plus a pixel of slack, where the halved texture smeared its glow.
  vec2 slack = step(paneMin - 1.0, cityLocal) * step(cityLocal, paneMax + 1.0);
  vec2 aa = max(fwidth(cityPx), vec2(0.001));
  vec2 inside = smoothstep(paneMin - aa * 0.5, paneMin + aa * 0.5, cityLocal)
    * (1.0 - smoothstep(paneMax - aa * 0.5, paneMax + aa * 0.5, cityLocal));
  float seed = cityHash(cityCell);
  float pick = cityHash(cityCell + 31.7);
  // Mostly warm light, some neon pink and cyan (linear colours).
  vec3 paneColor = pick < 0.42 ? vec3(1.0, 0.67, 0.003)
    : pick < 0.62 ? vec3(1.0, 0.55, 0.15)
    : pick < 0.76 ? vec3(1.0, 0.9, 0.67)
    : pick < 0.88 ? vec3(0.0, 0.78, 1.0)
    : vec3(1.0, 0.026, 0.3);
  paneColor *= mix(0.55, 0.9, cityHash(cityCell + 7.3));
  vec3 body = vec3(0.003, 0.0015, 0.007);
  vec3 pane = mix(body, paneColor * mix(0.02, 1.0, cityWindowOn(seed)), inside.x * inside.y);
  totalEmissiveRadiance = mix(totalEmissiveRadiance, cityBase * pane, cityLit * slack.x * slack.y);
}
#endif
`;

function patch(
  material: THREE.MeshStandardMaterial,
  key: string,
  fragment: string,
  vertex?: { head: string; body: string },
  afterLights = "",
) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uCityTime = cityTime;
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>\n${COMMON}${vertex ? "varying float vCityWindowSeed;\n" : ""}`,
      )
      .replace("#include <emissivemap_fragment>", fragment)
      .replace(
        "#include <lights_fragment_end>",
        `#include <lights_fragment_end>\n${afterLights}`,
      );
    if (vertex) {
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>\n${vertex.head}`)
        .replace("#include <begin_vertex>", `#include <begin_vertex>\n${vertex.body}`);
    }
  };
  material.customProgramCacheKey = () => key;
  material.needsUpdate = true;
}

/** Skyline plane: switch the texture's panes, found by UV on the shared grid. */
export function patchSkyline(material: THREE.MeshStandardMaterial) {
  // A painted backdrop: only its own light. The room's pink and cyan point lights put a
  // grey specular sheen over the black plane that read as fog on the glass.
  material.color.set(0x000000);
  patch(
    material,
    "city-skyline",
    SKYLINE,
    undefined,
    "reflectedLight.directSpecular = vec3(0.0);\nreflectedLight.indirectSpecular = vec3(0.0);",
  );
}

const TOWER_VERTEX = {
  head: "attribute float cityWindowSeed;\nvarying float vCityWindowSeed;",
  body: "vCityWindowSeed = cityWindowSeed;",
};
const TOWER_FRAGMENT = /* glsl */ `
#include <emissivemap_fragment>
totalEmissiveRadiance *= mix(0.04, 1.0, cityWindowOn(vCityWindowSeed));
`;

/**
 * Foreground towers: the window boxes are joined into one mesh per colour, so group the
 * vertices into boxes (all corners of one box lie within 4 x 6 x 2 cm, neighbours are at
 * least 7 cm apart), give each box a seed and switch it in the shader. The materials are
 * shared with the room's neon, so the towers get their own copies.
 */
export function patchTowerWindows(towers: THREE.Object3D) {
  towers.updateWorldMatrix(true, true);
  const v = new THREE.Vector3();
  towers.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const material = obj.material as THREE.MeshStandardMaterial;
    if (!material.emissive || material.emissive.getHex() === 0) return;
    const geometry = obj.geometry as THREE.BufferGeometry;
    if (!geometry.getAttribute("cityWindowSeed")) {
      const position = geometry.getAttribute("position");
      const seeds = new Float32Array(position.count);
      const clusters: { x: number; y: number; z: number; seed: number }[] = [];
      for (let i = 0; i < position.count; i++) {
        v.fromBufferAttribute(position, i).applyMatrix4(obj.matrixWorld);
        let cluster = clusters.find(
          (c) =>
            Math.abs(c.x - v.x) < 0.05 &&
            Math.abs(c.y - v.y) < 0.07 &&
            Math.abs(c.z - v.z) < 0.03,
        );
        if (!cluster) {
          // Deterministic per window: the same city on every visit.
          const seed =
            Math.abs(Math.sin(v.x * 91.7 + v.y * 47.3 + v.z * 13.1) * 43758.5453) % 1;
          cluster = { x: v.x, y: v.y, z: v.z, seed };
          clusters.push(cluster);
        }
        seeds[i] = cluster.seed;
      }
      geometry.setAttribute("cityWindowSeed", new THREE.BufferAttribute(seeds, 1));
    }
    const own = material.clone();
    patch(own, "city-tower-windows", TOWER_FRAGMENT, TOWER_VERTEX);
    obj.material = own;
  });
}

/**
 * Everything seen through the window, set up once per mounted scene: clear glass, the
 * skyline and tower windows switching on and off, and the outdoor bodies kept dark.
 */
export function setupCity(scene: THREE.Object3D) {
  scene.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const material = obj.material as THREE.MeshStandardMaterial;
    if (material.name === "city") patchSkyline(material);
    if (material.name === "glass") {
      // Nearly clear: the pale tint lit by the cyan window light hid the city.
      material.color.set("#16222e");
      material.opacity = 0.04;
      material.roughness = 0.02;
      material.depthWrite = false;
    }
  });
  const towers = scene.getObjectByName("towers");
  if (towers) patchTowerWindows(towers);
  // The room's point lights reach the towers and billboard backs through the glass and
  // turn them a flat grey, which reads as haze on the pane. Outdoors, keep them near black
  // (own copies: the materials are shared with the desk and shelves).
  for (const name of ["towers", "billboard_1", "billboard_2", "billboard_3"]) {
    scene.getObjectByName(name)?.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const material = obj.material as THREE.MeshStandardMaterial;
      if (material.emissive && material.emissive.getHex() !== 0) return;
      const own = material.clone();
      own.color.multiplyScalar(0.25);
      obj.material = own;
    });
  }
}
