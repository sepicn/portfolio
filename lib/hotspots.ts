/**
 * Clickable objects in the room. `meshes` are node names inside public/models/room.glb
 * (see blender/build_room.py); every listed mesh reacts to hover and click for that hotspot.
 * Coordinates are in three.js space (Y up, metres): `camera` is where the camera flies when
 * the object is focused, `look` is what it looks at, `label` is where the hover label sits.
 * `fallback` is the position of the CSS hotspot on the static render, in percent.
 */
export type Hotspot = {
  id: string;
  meshes: string[];
  href: string | null;
  camera: [number, number, number];
  look: [number, number, number];
  label: [number, number, number];
  fallback: { x: number; y: number };
};

export const OVERVIEW = {
  camera: [1.1, 1.7, 2.0] as [number, number, number],
  look: [0.4, 1.35, -1.7] as [number, number, number],
};

export const hotspots: Hotspot[] = [
  {
    id: "projects",
    meshes: ["monitor", "monitor_screen", "computer_case", "keyboard"],
    href: "/projects",
    camera: [0, 1.15, -0.85],
    look: [0, 1.12, -1.63],
    label: [0, 1.4, -1.6],
    fallback: { x: 50, y: 58 },
  },
  {
    id: "services",
    meshes: ["neon_sign", "neon_border", "neon_panel"],
    href: "/services",
    camera: [0, 2.45, -1.2],
    look: [0, 2.62, -2.94],
    label: [0, 2.32, -2.9],
    fallback: { x: 56, y: 4 },
  },
  {
    id: "clients",
    meshes: ["billboard_1", "billboard_2", "billboard_3"],
    href: "/projects#clients",
    camera: [0.2, 1.85, -1.5],
    look: [0, 1.7, -3.9],
    label: [0, 1.0, -2.95],
    fallback: { x: 62, y: 36 },
  },
  {
    id: "contact",
    meshes: ["phone"],
    href: "/contact",
    camera: [-0.7, 1.3, -0.95],
    look: [-0.98, 0.86, -1.72],
    label: [-0.98, 1.05, -1.72],
    fallback: { x: 28, y: 66 },
  },
  {
    id: "education",
    meshes: ["diploma"],
    href: "/about#education",
    camera: [-1.85, 1.85, -1.9],
    look: [-2.2, 1.75, -2.98],
    label: [-2.2, 1.28, -2.9],
    fallback: { x: 20, y: 24 },
  },
  {
    id: "about",
    meshes: [
      "hifi",
      "speaker",
      "cassettes",
      "books",
      "plant",
      "gym",
      "book_open",
      "headphones",
    ],
    href: "/about",
    camera: [1.6, 1.75, -1.5],
    look: [2.1, 1.65, -2.85],
    label: [2.1, 2.05, -2.8],
    fallback: { x: 84, y: 40 },
  },
  {
    id: "cv",
    meshes: ["photo"],
    href: "/cv",
    camera: [-0.35, 1.15, -0.95],
    look: [-0.55, 0.88, -1.62],
    label: [-0.55, 1.08, -1.62],
    fallback: { x: 36, y: 68 },
  },
  {
    id: "lamp",
    meshes: ["lamp", "lamp_bulb"],
    href: null,
    camera: [0.9, 1.4, -0.9],
    look: [0.66, 1.2, -1.62],
    label: [0.75, 1.42, -1.75],
    fallback: { x: 70, y: 56 },
  },
];

export const hotspotByMesh: Record<string, Hotspot> = Object.fromEntries(
  hotspots.flatMap((spot) => spot.meshes.map((mesh) => [mesh, spot])),
);
