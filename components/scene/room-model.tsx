"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useTranslations } from "next-intl";
import { hotspots, hotspotByMesh, type Hotspot } from "@/lib/hotspots";
import { useScene } from "./scene-state";
import { useScreenTexture } from "./screen-texture";
import { cityTime, setupCity } from "./city-lights";

const MODEL_URL = "/models/room.glb";
const DRACO_PATH = "/draco/";

useGLTF.preload(MODEL_URL, DRACO_PATH);

type Props = {
  onActivate: (hotspot: Hotspot) => void;
};

export function RoomModel({ onActivate }: Props) {
  const gltf = useGLTF(MODEL_URL, DRACO_PATH);
  const { hovered, setHovered, lampOn } = useScene();
  const t = useTranslations("hotspots");

  // Pull the interactive objects out of the loaded scene so each hotspot can be wrapped in
  // a <Select> for the outline effect. Everything else stays in `rest`.
  const { rest, groups, lampBulb, lampLight, screen, errorSign } = useMemo(() => {
    // drei caches the parsed GLTF, so work on a clone: the hotspot nodes get detached below
    // and a cached scene would lose them on the next mount.
    const scene = gltf.scene.clone(true);
    // Before the hotspots are detached: the glass and billboards belong to one.
    setupCity(scene);
    const groups = new Map<string, THREE.Object3D[]>();
    for (const spot of hotspots) {
      const nodes: THREE.Object3D[] = [];
      for (const mesh of spot.meshes) {
        const node = scene.getObjectByName(mesh);
        if (node) {
          node.removeFromParent();
          nodes.push(node);
        }
      }
      groups.set(spot.id, nodes);
    }
    const lampBulb = groups.get("lamp")?.find((n) => n.name === "lamp_bulb") as
      THREE.Mesh | undefined;
    // GLTFLoader wraps each light in a node of the same name, so search by type.
    let lampLight: THREE.PointLight | undefined;
    scene.traverse((obj) => {
      if (obj instanceof THREE.PointLight && !lampLight) lampLight = obj;
    });
    if (lampLight) {
      // Blender exports watts converted to candela, far too strong for this room.
      lampLight.intensity = 1.6;
      lampLight.distance = 2.6;
      lampLight.decay = 2;
      lampLight.color.set("#ffd9a0");
    }
    let errorSign: THREE.MeshStandardMaterial | undefined;
    const emissiveOverride: Record<string, number> = {
      screen: 0.7,
      city: 0.9,
      photo: 0.35,
    };
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = false;
        obj.receiveShadow = false;
        const material = obj.material as THREE.MeshStandardMaterial;
        if (material.name in emissiveOverride) {
          material.emissiveIntensity = emissiveOverride[material.name];
        }
        if (material.name === "neon_error") errorSign = material;
      }
    });
    const screen = groups.get("projects")?.find((n) => n.name === "monitor_screen") as
      THREE.Mesh | undefined;
    return { rest: scene, groups, lampBulb, lampLight, screen, errorSign };
  }, [gltf.scene]);

  useScreenTexture(screen);

  // Lamp toggle: ease the bulb emissive and the exported point light together.
  // Objects live in a ref so the per-frame mutation does not touch memoized values.
  const lampRef = useRef<{
    bulb?: THREE.Mesh;
    light?: THREE.PointLight;
    error?: THREE.MeshStandardMaterial;
  }>({});
  useEffect(() => {
    lampRef.current = { bulb: lampBulb, light: lampLight, error: errorSign };
  }, [lampBulb, lampLight, errorSign]);
  // City windows switch on and off over time; reduced motion keeps one lit pattern.
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  useFrame(({ clock }, delta) => {
    if (!reduceMotion) cityTime.value = clock.elapsedTime;
    // The red ERROR sign on the wall is mostly lit and drops out in two quick blips, like a
    // tube with a bad contact.
    const { bulb, light, error } = lampRef.current;
    if (error) {
      // Lit at the strength the GLB exports, so it blooms like the other neon.
      error.userData.lit ??= error.emissiveIntensity;
      const t = clock.elapsedTime % 2.4;
      const on = !((t > 1.6 && t < 1.68) || (t > 1.78 && t < 1.86));
      error.emissiveIntensity = on ? error.userData.lit : 0.06;
    }
    const k = 1 - Math.exp(-6 * delta);
    if (bulb) {
      const material = bulb.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity,
        lampOn ? 4 : 0.05,
        k,
      );
    }
    if (light) {
      light.intensity = THREE.MathUtils.lerp(light.intensity, lampOn ? 1.6 : 0, k);
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  const handleOver = (mesh: string) => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(hotspotByMesh[mesh].id);
  };

  const handleOut = () => setHovered(null);

  const handleClick = (mesh: string) => (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onActivate(hotspotByMesh[mesh]);
  };

  return (
    <group>
      <primitive object={rest} />
      {hotspots.map((spot) => {
        const nodes = groups.get(spot.id) ?? [];
        const isHovered = hovered === spot.id;
        return (
          <group key={spot.id}>
            <Select enabled={isHovered}>
              {nodes.map((node) => (
                <primitive
                  key={node.name}
                  object={node}
                  onPointerOver={handleOver(node.name)}
                  onPointerOut={handleOut}
                  onClick={handleClick(node.name)}
                />
              ))}
            </Select>
            {isHovered ? (
              <Html
                position={spot.label}
                center
                distanceFactor={4}
                style={{ pointerEvents: "none" }}
                zIndexRange={[10, 0]}
              >
                <span className="rounded-md border border-neon-cyan/50 bg-night-950/85 px-3 py-1 font-mono text-xs tracking-widest whitespace-nowrap text-neon-cyan uppercase shadow-neon-cyan">
                  {t(spot.id)}
                </span>
              </Html>
            ) : null}
          </group>
        );
      })}
    </group>
  );
}
