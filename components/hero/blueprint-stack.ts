import * as THREE from "three";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

export type StackScene = {
  setPointer: (x: number, y: number) => void;
  setProgress: (p: number) => void;
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
  [2.8, 2.0],
  [2.4, 1.7],
  [2.0, 1.4],
];
const BASE_GAP = 1.05;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

export function createStackScene(
  canvas: HTMLCanvasElement,
  onFirstFrame: () => void,
  onLayers: (ys: number[]) => void,
): StackScene {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(9, 9, 9);
  camera.lookAt(0, 0, 0);

  const lineMaterial = new LineMaterial({ color: BLUE, linewidth: 2.2, worldUnits: false });
  const paper = new THREE.MeshBasicMaterial({ color: PAPER, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  const accent = new THREE.MeshBasicMaterial({ color: ACCENT, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  const disposables: { dispose: () => void }[] = [lineMaterial, paper, accent];

  function block(w: number, h: number, d: number, material: THREE.Material) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geometry, material);
    const edges = new THREE.EdgesGeometry(geometry);
    const lines = new LineSegments2(new LineSegmentsGeometry().fromEdgesGeometry(edges), lineMaterial);
    mesh.add(lines);
    disposables.push(geometry, edges, lines.geometry);
    return mesh;
  }

  const root = new THREE.Group();
  scene.add(root);
  const layers = LAYERS.map(([w, d], i) => {
    const layer = new THREE.Group();
    layer.add(block(w, 0.16, d, i === 2 ? accent : paper));
    const bars = i === 2 ? 6 : 4;
    for (let j = 0; j < bars; j++) {
      const bar = block(0.18, 0.18, d * 0.6, paper);
      bar.position.set(-w / 2 + 0.35 + (j * (w - 0.7)) / (bars - 1), 0.17, 0);
      layer.add(bar);
    }
    root.add(layer);
    return layer;
  });

  const pillars = [0, 1, 2].map((i) => {
    const [w, d] = LAYERS[i];
    const group = new THREE.Group();
    for (const side of [-1, 1]) {
      const pillar = block(0.05, 1, 0.05, accent);
      pillar.position.set(side * w * 0.35, 0, -d * 0.3);
      group.add(pillar);
    }
    root.add(group);
    return group;
  });

  let progress = 0;
  let targetX = 0;
  let targetY = 0;
  let rotX = 0;
  let rotY = 0;
  let frame = 0;
  let running = false;
  let first = true;
  const clock = new THREE.Clock();
  const probe = new THREE.Vector3();

  function layout() {
    const p = ease(progress);
    const gap = BASE_GAP + p * 1.25;
    layers.forEach((layer, i) => {
      layer.position.y = i * gap - (1.5 * gap);
    });
    pillars.forEach((group, i) => {
      group.position.y = i * gap - 1.5 * gap + gap / 2 + 0.1;
      group.scale.y = Math.max(0.01, gap - 0.25);
    });
    root.rotation.y = rotY + p * 0.55;
    root.rotation.x = rotX;
    root.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.06 + p * 0.6;
  }

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    lineMaterial.resolution.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    const aspect = w / h;
    const view = 9.8;
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
    const h = canvas.clientHeight;
    onLayers(
      layers.map((layer) => {
        probe.set(0, 0, 0);
        layer.localToWorld(probe);
        probe.project(camera);
        return ((1 - probe.y) / 2) * h;
      }),
    );
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
