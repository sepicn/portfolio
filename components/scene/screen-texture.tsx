"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const W = 512;
const H = 384;

type Painter = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
};

function createPainter(): Painter {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  texture.minFilter = THREE.LinearFilter;
  return { canvas, ctx: canvas.getContext("2d")!, texture };
}

/**
 * Draws a moving synthwave sunset onto a canvas and feeds it to the monitor's emissive map.
 * The grid scrolls toward the viewer, the sun stripes drift, and a brighter band rolls down
 * the screen the way an old CRT does. Repainted at 24 fps at most.
 */
export function useScreenTexture(screen: THREE.Mesh | undefined) {
  const painter = useRef<Painter | null>(null);
  const last = useRef(0);

  useEffect(() => {
    if (!screen) return;
    painter.current ??= createPainter();
    const { texture } = painter.current;
    const material = screen.material as THREE.MeshStandardMaterial;
    const previous = material.emissiveMap;
    material.emissiveMap = texture;
    material.emissive.set("#ffffff");
    material.needsUpdate = true;
    return () => {
      material.emissiveMap = previous;
      material.needsUpdate = true;
      painter.current?.texture.dispose();
      painter.current = null;
    };
  }, [screen]);

  useFrame(({ clock }) => {
    const p = painter.current;
    if (!p) return;
    const t = clock.getElapsedTime();
    if (t - last.current < 1 / 24) return;
    last.current = t;
    paint(p.ctx, t);
    p.texture.needsUpdate = true;
  });
}

function paint(ctx: CanvasRenderingContext2D, t: number) {
  const horizon = H * 0.58;

  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, "#1b0638");
  sky.addColorStop(0.7, "#6a1b7a");
  sky.addColorStop(1, "#ff2d95");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, horizon);

  const cx = W / 2;
  const cy = horizon - H * 0.06;
  const r = H * 0.22;
  const sun = ctx.createLinearGradient(0, cy - r, 0, cy + r);
  sun.addColorStop(0, "#ffd60a");
  sun.addColorStop(1, "#ff3b5c");
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = sun;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  ctx.fillStyle = "#1b0638";
  const drift = (t * 12) % 14;
  for (let i = 0; i < 7; i++) {
    const y = cy - r * 0.05 + i * 14 + drift;
    ctx.fillRect(cx - r, y, r * 2, 2 + i * 1.6);
  }
  ctx.restore();

  ctx.fillStyle = "#0b0416";
  ctx.fillRect(0, horizon, W, H - horizon);
  ctx.strokeStyle = "#00e5ff";
  ctx.lineWidth = 1.5;
  ctx.shadowColor = "#00e5ff";
  ctx.shadowBlur = 6;
  const speed = (t * 0.6) % 1;
  for (let i = 0; i < 9; i++) {
    const p = (i + speed) / 9;
    const y = horizon + (H - horizon) * p * p;
    ctx.globalAlpha = 0.25 + p * 0.75;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.8;
  for (let i = -6; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 22, horizon);
    ctx.lineTo(cx + i * 160, H);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#ff2d95";
  ctx.fillRect(0, horizon - 1, W, 2);

  ctx.fillStyle = "rgba(0,0,0,0.22)";
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
  const band = ((t * 60) % (H + 80)) - 80;
  const bandGradient = ctx.createLinearGradient(0, band, 0, band + 80);
  bandGradient.addColorStop(0, "rgba(255,255,255,0)");
  bandGradient.addColorStop(0.5, "rgba(255,255,255,0.08)");
  bandGradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = bandGradient;
  ctx.fillRect(0, band, W, 80);

  ctx.font = "bold 18px monospace";
  ctx.fillStyle = "#00e5ff";
  ctx.fillText("sepic.me", 18, H - 18);
  if (Math.floor(t * 2) % 2 === 0) ctx.fillRect(118, H - 32, 10, 16);
}
