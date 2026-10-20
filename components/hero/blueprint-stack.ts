import * as THREE from "three";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

export type StackScene = {
  setPointer: (x: number, y: number) => void;
  setProgress: (p: number) => void;
  setFlow: (y: number) => void;
  resize: () => void;
  start: () => void;
  stop: () => void;
  dispose: () => void;
};

const BLUE = 0x3f5fdc;
const PAPER = 0xf7f9fe;
const ACCENT = 0x6f8cf0;
const LAYERS: [number, number][] = [
  [3.2, 2.2],
  [2.9, 2.0],
  [2.6, 1.8],
  [2.6, 1.8],
];
const BASE_GAP = 1.5;
const TOP = 0.08;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

export function createStackScene(
  canvas: HTMLCanvasElement,
  onFirstFrame: () => void,
  options: { auto: boolean; view: number; labels: string[] },
): StackScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(9, 9, 9);
  camera.lookAt(0, 0, 0);

  const lineMaterial = new LineMaterial({ color: BLUE, linewidth: 2, worldUnits: false });
  const surface = { polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 };
  const paper = new THREE.MeshBasicMaterial({ color: PAPER, ...surface });
  const accent = new THREE.MeshBasicMaterial({ color: ACCENT, ...surface });
  const ink = new THREE.MeshBasicMaterial({ color: BLUE, ...surface });
  const disposables: { dispose: () => void }[] = [lineMaterial, paper, accent, ink];

  function outline(geometry: THREE.BufferGeometry, mesh: THREE.Object3D, angle = 20) {
    const edges = new THREE.EdgesGeometry(geometry, angle);
    const lines = new LineSegments2(new LineSegmentsGeometry().fromEdgesGeometry(edges), lineMaterial);
    mesh.add(lines);
    disposables.push(geometry, edges, lines.geometry);
  }

  function box(w: number, h: number, d: number, material: THREE.Material, x = 0, y = 0, z = 0) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    outline(geometry, mesh);
    return mesh;
  }

  function cylinder(r: number, h: number, material: THREE.Material, x: number, y: number, z: number) {
    const geometry = new THREE.CylinderGeometry(r, r, h, 40);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    outline(geometry, mesh, 30);
    return mesh;
  }

  function label(text: string) {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.font = '500 64px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillStyle = "#2f4fd6";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(text.toUpperCase(), 500, 64);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(material);
    sprite.center.set(1, 0.5);
    sprite.scale.set(1.6, 0.4, 1);
    sprite.renderOrder = 10;
    disposables.push(texture, material);
    return sprite;
  }

  function database(layer: THREE.Group) {
    for (const x of [-0.75, 0.75]) {
      for (let k = 0; k < 3; k++) {
        layer.add(cylinder(0.42, 0.17, k === 2 ? accent : paper, x, TOP + 0.1 + k * 0.21, 0));
      }
    }
  }

  function backend(layer: THREE.Group) {
    for (const x of [-0.85, 0, 0.85]) {
      const server = box(0.62, 0.5, 1.0, paper, x, TOP + 0.25, 0);
      for (let k = 0; k < 3; k++) {
        server.add(box(0.5, 0.04, 0.02, ink, 0, 0.13 - k * 0.13, 0.51));
      }
      server.add(box(0.06, 0.06, 0.02, accent, 0.2, 0.13, 0.52));
      layer.add(server);
    }
  }

  function api(layer: THREE.Group) {
    for (const [k, z] of [-0.5, 0, 0.5].entries()) {
      layer.add(box(1.6, 0.12, 0.26, k === 1 ? ink : paper, -0.1, TOP + 0.06, z));
      const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.26, 3), ink);
      arrow.rotation.z = -Math.PI / 2;
      arrow.position.set(0.88, TOP + 0.08, z);
      disposables.push(arrow.geometry);
      layer.add(arrow);
    }
  }

  function frontend(layer: THREE.Group) {
    const win = box(1.75, 1.05, 0.06, paper, -0.3, TOP + 0.53, -0.35);
    win.add(box(1.75, 0.16, 0.08, accent, 0, 0.445, 0.01));
    for (let k = 0; k < 3; k++) win.add(box(0.07, 0.07, 0.04, paper, -0.78 + k * 0.11, 0.445, 0.06));
    win.add(box(0.8, 0.42, 0.04, paper, -0.4, 0.12, 0.05));
    win.add(box(0.3, 0.1, 0.04, ink, -0.6, -0.18, 0.06));
    for (let k = 0; k < 3; k++) win.add(box(0.24, 0.3, 0.04, paper, 0.18 + k * 0.17 - 0.12, -0.28, 0.05));
    win.add(box(0.5, 0.05, 0.04, ink, 0.4, 0.25, 0.06));
    win.add(box(0.4, 0.05, 0.04, paper, 0.35, 0.13, 0.06));
    layer.add(win);
    const phone = box(0.36, 0.68, 0.05, paper, 0.9, TOP + 0.34, 0.25);
    phone.add(box(0.28, 0.08, 0.03, accent, 0, 0.24, 0.03));
    for (let k = 0; k < 3; k++) phone.add(box(0.26, 0.1, 0.03, paper, 0, 0.08 - k * 0.15, 0.03));
    layer.add(phone);
  }

  const builders = [database, backend, api, frontend];
  const root = new THREE.Group();
  scene.add(root);
  const layers = LAYERS.map(([w, d], i) => {
    const layer = new THREE.Group();
    layer.add(box(w, 0.16, d, i === 2 ? accent : paper));
    builders[i](layer);
    const tag = label(options.labels[i] ?? "");
    tag.position.set(-w / 2 - 0.12, 0, d / 2 + 0.12);
    layer.add(tag);
    root.add(layer);
    return layer;
  });

  const links = [0, 1, 2].map((i) => {
    const [w, d] = LAYERS[i];
    const x = w * 0.42;
    const z = -d * 0.38;
    const geometry = new THREE.CylinderGeometry(0.06, 0.06, 1, 16, 1, true);
    const pillar = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.35 }));
    pillar.position.set(x, 0, z);
    outline(geometry, pillar, 30);
    disposables.push(pillar.material as THREE.Material);
    const packets = [0, 1, 2].map(() => {
      const packet = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), ink);
      packet.position.set(x, 0, z);
      disposables.push(packet.geometry);
      root.add(packet);
      return packet;
    });
    root.add(pillar);
    return { pillar, packets, phase: i * 0.21 };
  });

  let progress = 0;
  let flow = 0;
  let flowTarget = 0;
  let targetX = 0;
  let targetY = 0;
  let rotX = 0;
  let rotY = 0;
  let frame = 0;
  let running = false;
  let first = true;
  const clock = new THREE.Clock();

  function layout() {
    const t = clock.elapsedTime;
    const p = ease(progress);
    const gap = BASE_GAP + p * 0.9;
    layers.forEach((layer, i) => {
      layer.position.y = i * gap - 1.5 * gap;
    });
      flow += (flowTarget - flow) * 0.08;
    links.forEach(({ pillar, packets, phase }, i) => {
      const bottom = layers[i].position.y + 0.08;
      const length = Math.max(0.01, gap - 0.16);
      pillar.position.y = bottom + length / 2;
      pillar.scale.y = length;
      packets.forEach((packet, k) => {
        const f = (((t * 0.18 + flow + phase + k / 3) % 1) + 1) % 1;
        packet.position.y = bottom + (1 - f) * length;
      });
    });
    const drift = options.auto ? Math.sin(t * 0.45) * 0.35 : 0;
    root.rotation.y = rotY + drift + p * 0.45;
    root.rotation.x = rotX;
    root.position.y = Math.sin(t * 0.8) * 0.05 + p * 0.5;
  }

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    lineMaterial.resolution.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    const aspect = w / h;
    const view = options.view;
    camera.left = (-view * aspect) / 2;
    camera.right = (view * aspect) / 2;
    camera.top = view / 2;
    camera.bottom = -view / 2;
    camera.updateProjectionMatrix();
  }

  function tick() {
    frame = requestAnimationFrame(tick);
    rotX += (targetX - rotX) * 0.06;
    rotY += (targetY - rotY) * 0.06;
    layout();
    renderer.render(scene, camera);
    if (first) {
      first = false;
      onFirstFrame();
    }
  }

  resize();

  return {
    setPointer(x, y) {
      targetY = x * 0.22;
      targetX = y * 0.09;
    },
    setProgress(p) {
      progress = clamp(p);
    },
    setFlow(y) {
      flowTarget = y / 700;
    },
    resize,
    start() {
      if (running) return;
      running = true;
      clock.start();
      tick();
    },
    stop() {
      running = false;
      cancelAnimationFrame(frame);
      clock.stop();
    },
    dispose() {
      cancelAnimationFrame(frame);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
