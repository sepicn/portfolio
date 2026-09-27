"use client";

import { useEffect, useRef } from "react";

type Labels = {
  title: string;
  start: string;
  over: string;
  restart: string;
  score: string;
  best: string;
};

type Ghost = { x: number; y: number; w: number; h: number; color: string; flying: boolean };

const C = {
  bg: "#07030f",
  grid: "#8a2be2",
  horizon: "#ff2d95",
  pac: "#ffd60a",
  dot: "#ffd9a8",
  text: "#e9e4ff",
  dim: "#8f86b3",
  cyan: "#00e5ff",
  ghosts: ["#ff2d95", "#00e5ff", "#ff8c42", "#8a2be2"],
};

const HEIGHT = 240;
const GROUND = 44; // ground band height below the running line
const PAC_R = 17;
const GRAVITY = 2600;
const JUMP_V = 830;
const MIN_JUMP_V = 320;
const START_SPEED = 360;
const MAX_SPEED = 920;
const GHOST_W = 30;
const GHOST_H = 34;
const BEST_KEY = "sepic-pac-best";

function readBest(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeBest(n: number) {
  try {
    localStorage.setItem(BEST_KEY, String(n));
  } catch {
    // Private mode or blocked storage: the record just lasts for this visit.
  }
}

const pad = (n: number) => String(Math.floor(n)).padStart(5, "0");

/** A Chrome-dino style runner: Pac-Man jumps over ghosts. Space, arrow up, click or tap. */
export function PacRunner({ labels, className }: { labels: Labels; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(HEIGHT * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const groundY = HEIGHT - GROUND;
    // Canvas fonts cannot use CSS variables, so resolve the site fonts once.
    const rootStyle = getComputedStyle(document.documentElement);
    const monoFont = rootStyle.getPropertyValue("--font-mono").trim() || "monospace";
    const displayFont = rootStyle.getPropertyValue("--font-display").trim() || "sans-serif";
    const pacX = 70;

    let state: "idle" | "running" | "over" = "idle";
    let y = groundY; // bottom of Pac-Man
    let vy = 0;
    let holding = false;
    let speed = START_SPEED;
    let distance = 0;
    let best = readBest();
    let ghosts: Ghost[] = [];
    let nextSpawn = 0;
    let t = 0;
    let flash = 0;
    let lastHundred = 0;

    const reset = () => {
      y = groundY;
      vy = 0;
      speed = START_SPEED;
      distance = 0;
      ghosts = [];
      nextSpawn = width + 200;
      lastHundred = 0;
      flash = 0;
    };

    const spawn = (x: number) => {
      const score = distance / 10;
      const flying = score > 400 && Math.random() < 0.25;
      if (flying) {
        // Floats above head height: stay on the ground and run under it.
        ghosts.push({
          x,
          y: groundY - PAC_R * 2 - 18 - GHOST_H,
          w: GHOST_W,
          h: GHOST_H,
          color: C.ghosts[Math.floor(Math.random() * 4)],
          flying: true,
        });
        return GHOST_W;
      }
      const maxPack = score > 250 ? 3 : score > 80 ? 2 : 1;
      const count = 1 + Math.floor(Math.random() * maxPack);
      for (let i = 0; i < count; i++) {
        ghosts.push({
          x: x + i * (GHOST_W + 4),
          y: groundY - GHOST_H,
          w: GHOST_W,
          h: GHOST_H,
          color: C.ghosts[Math.floor(Math.random() * 4)],
          flying: false,
        });
      }
      return count * (GHOST_W + 4);
    };

    const press = () => {
      if (state === "idle" || state === "over") {
        reset();
        state = "running";
        vy = -JUMP_V;
        holding = true;
        return;
      }
      if (y >= groundY) {
        vy = -JUMP_V;
        holding = true;
      }
    };
    const release = () => {
      holding = false;
      if (vy < -MIN_JUMP_V) vy = -MIN_JUMP_V;
    };

    const isJumpKey = (e: KeyboardEvent) =>
      e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW";
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isJumpKey(e)) return;
      e.preventDefault();
      if (!e.repeat) press();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (isJumpKey(e)) release();
    };
    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      press();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", release);

    const hits = (g: Ghost) => {
      const cx = pacX;
      const cy = y - PAC_R;
      const r = PAC_R * 0.78; // a little forgiveness
      const nx = Math.max(g.x + 3, Math.min(cx, g.x + g.w - 3));
      const ny = Math.max(g.y + 4, Math.min(cy, g.y + g.h));
      return (cx - nx) ** 2 + (cy - ny) ** 2 < r * r;
    };

    const drawBackground = (scroll: number) => {
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, width, HEIGHT);

      // Striped synthwave sun sitting on the horizon.
      const sunR = 70;
      const sx = width * 0.72;
      const sy = groundY;
      const grad = ctx.createLinearGradient(0, sy - sunR, 0, sy);
      grad.addColorStop(0, "#ffd60a");
      grad.addColorStop(1, "#ff2d95");
      ctx.save();
      ctx.beginPath();
      ctx.arc(sx, sy, sunR, Math.PI, 0);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(sx - sunR, sy - sunR, sunR * 2, sunR);
      ctx.globalAlpha = 1;
      ctx.fillStyle = C.bg;
      for (let i = 0; i < 6; i++) {
        const h = 2 + i * 1.2;
        ctx.fillRect(sx - sunR, sy - 8 - i * 11, sunR * 2, h);
      }
      ctx.restore();

      // Horizon line and the perspective grid of the floor.
      ctx.strokeStyle = C.horizon;
      ctx.shadowColor = C.horizon;
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 0.5);
      ctx.lineTo(width, groundY + 0.5);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = C.grid;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const gy = groundY + (GROUND * (i * i)) / 16;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }
      const spacing = 48;
      const off = scroll % spacing;
      const vx = width / 2;
      for (let x = -off - spacing * 12; x < width + spacing * 12; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(vx + (x - vx) * 0.35, groundY);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Pellets ahead of Pac-Man; the ones behind him are eaten.
      ctx.fillStyle = C.dot;
      const dotGap = 28;
      const dOff = scroll % dotGap;
      for (let x = pacX + PAC_R - dOff + dotGap; x < width; x += dotGap) {
        ctx.fillRect(x - 2, groundY - PAC_R - 2, 4, 4);
      }
    };

    const drawGhost = (g: Ghost) => {
      const { x, y: gy, w, h, color } = g;
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(x + w / 2, gy + w / 2, w / 2, Math.PI, 0);
      ctx.lineTo(x + w, gy + h);
      // Wavy skirt, animated so ghosts look like they float.
      const bumps = 3;
      const bw = w / bumps;
      const up = Math.sin(t * 14 + x * 0.05) > 0;
      for (let i = bumps; i > 0; i--) {
        const bx = x + i * bw;
        ctx.lineTo(bx - bw / 2, gy + h - (up ? 6 : 2));
        ctx.lineTo(bx - bw, gy + h - (up ? 0 : 4));
      }
      ctx.lineTo(x, gy + w / 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // Eyes look left, towards Pac-Man.
      for (const ex of [x + w * 0.32, x + w * 0.68]) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.ellipse(ex, gy + h * 0.4, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#1b3cff";
        ctx.beginPath();
        ctx.arc(ex - 1.8, gy + h * 0.42, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawPac = () => {
      const cy = y - PAC_R;
      const open =
        state === "over"
          ? 0.9
          : state === "idle"
            ? 0.25
            : 0.08 + Math.abs(Math.sin(t * 16)) * 0.32;
      ctx.save();
      ctx.fillStyle = C.pac;
      ctx.shadowColor = C.pac;
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(pacX, cy);
      ctx.arc(pacX, cy, PAC_R, open, Math.PI * 2 - open);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = C.bg;
      ctx.beginPath();
      ctx.arc(pacX + 2, cy - PAC_R * 0.5, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawHud = () => {
      const score = distance / 10;
      ctx.font = `600 14px ${monoFont}`;
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      const scoreText = `${labels.score} ${pad(score)}`;
      ctx.fillStyle = C.dim;
      ctx.fillText(`${labels.best} ${pad(best)}`, width - 16 - ctx.measureText(scoreText).width - 24, 14);
      const blink = flash > 0 && Math.floor(flash * 8) % 2 === 0;
      ctx.fillStyle = blink ? C.cyan : C.text;
      ctx.fillText(scoreText, width - 16, 14);

      if (state !== "running") {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const cx = width / 2;
        if (state === "over") {
          ctx.font = `700 22px ${displayFont}`;
          ctx.fillStyle = "#ff2d95";
          ctx.shadowColor = "#ff2d95";
          ctx.shadowBlur = 14;
          ctx.fillText(labels.over, cx, 70);
          ctx.shadowBlur = 0;
        }
        ctx.font = `500 14px ${monoFont}`;
        ctx.fillStyle = C.text;
        ctx.fillText(state === "over" ? labels.restart : labels.start, cx, state === "over" ? 104 : 80);
      }
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      if (state === "running") {
        speed = Math.min(MAX_SPEED, speed + 9 * dt);
        distance += speed * dt;

        vy += GRAVITY * dt * (holding || vy > 0 ? 1 : 1.6);
        y += vy * dt;
        if (y >= groundY) {
          y = groundY;
          vy = 0;
        }

        for (const g of ghosts) g.x -= speed * dt;
        ghosts = ghosts.filter((g) => g.x + g.w > -20);

        nextSpawn -= speed * dt;
        if (nextSpawn <= width) {
          const packW = spawn(width + 20);
          // Gap scales with speed so every pattern stays jumpable.
          const gap = speed * (0.55 + Math.random() * 0.75) + packW + 120;
          nextSpawn = width + gap;
        }

        const hundred = Math.floor(distance / 1000);
        if (hundred > lastHundred) {
          lastHundred = hundred;
          flash = 1;
        }
        flash = Math.max(0, flash - dt);

        if (ghosts.some(hits)) {
          state = "over";
          const score = Math.floor(distance / 10);
          if (score > best) {
            best = score;
            writeBest(best);
          }
        }
      }

      drawBackground(state === "running" ? distance : t * 30);
      for (const g of ghosts) drawGhost(g);
      drawPac();
      drawHud();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", release);
    };
  }, [labels]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={labels.title}
        className="block h-[240px] w-full touch-none select-none border border-neon-violet/40 bg-night-950 shadow-[0_0_30px_rgba(138,43,226,0.25)]"
      />
    </div>
  );
}
