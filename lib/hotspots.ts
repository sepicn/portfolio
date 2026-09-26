/**
 * Clickable objects in the room. `meshes` are node names inside public/models/room.glb
 * (see blender/build_room.py); every listed mesh reacts to hover and click for that hotspot.
 * Coordinates are in three.js space (Y up, metres): `camera` is where the camera flies when
 * the object is focused, `look` is what it looks at, `label` is where the hover label sits.
 * Where each hotspot sits on the static render comes from lib/room-views.json, which
 * blender/build_room.py writes by projecting `look` through the render camera.
 */
import views from "./room-views.json";

export type Hotspot = {
  id: string;
  meshes: string[];
  href: string | null;
  camera: [number, number, number];
  look: [number, number, number];
  label: [number, number, number];
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
    camera: [-0.05, 1.02, -0.85],
    look: [-0.05, 0.99, -1.63],
    label: [-0.05, 1.26, -1.6],
  },
  {
    id: "services",
    meshes: ["neon_sign", "neon_border", "neon_panel"],
    href: "/services",
    camera: [0, 2.45, -1.2],
    look: [0, 2.62, -2.94],
    label: [0, 2.32, -2.9],
  },
  {
    id: "clients",
    // The glass makes the whole window a target, so visitors do not have to hit a billboard.
    meshes: ["billboard_1", "billboard_2", "billboard_3", "window_glass"],
    href: "/projects#clients",
    camera: [0.2, 1.85, -1.5],
    look: [0, 1.7, -3.9],
    label: [0, 1.0, -2.95],
  },
  {
    id: "contact",
    meshes: ["phone"],
    href: "/contact",
    camera: [-0.7, 1.3, -0.95],
    look: [-0.98, 0.86, -1.72],
    label: [-0.98, 1.05, -1.72],
  },
  {
    id: "education",
    meshes: ["diploma"],
    href: "/about#education",
    camera: [-1.85, 1.85, -1.9],
    look: [-2.2, 1.75, -2.98],
    label: [-2.2, 1.28, -2.9],
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
  },
  {
    id: "cv",
    meshes: ["photo"],
    href: "/cv",
    camera: [-0.35, 1.15, -0.95],
    look: [-0.55, 0.88, -1.62],
    label: [-0.55, 1.08, -1.62],
  },
  {
    id: "lamp",
    meshes: ["lamp", "lamp_bulb"],
    href: null,
    camera: [0.9, 1.4, -0.9],
    look: [0.66, 1.2, -1.62],
    label: [0.75, 1.42, -1.75],
  },
];

export const hotspotByMesh: Record<string, Hotspot> = Object.fromEntries(
  hotspots.flatMap((spot) => spot.meshes.map((mesh) => [mesh, spot])),
);

type Point = { x: number; y: number };

/** Position of each hotspot on /images/room-preview.webp, in percent from the top left. */
export const roomViews: Record<string, Point> = views.landscape;

/** Position of each hotspot on /images/tour/overview.webp; may fall outside 0 to 100. */
export const tourViews: Record<string, Point> = views.tour;

/** Hotspots in the order the phone tour visits them (the lamp only toggles, so it is left out). */
export const tourOrder = [
  "projects",
  "services",
  "clients",
  "about",
  "education",
  "cv",
  "contact",
];
