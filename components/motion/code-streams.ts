const SNIPPETS = [
  "const hex = new Prism(6);",
  "rotateY(-60deg)",
  "translateZ(450px)",
  "git push origin main",
  "<ProjectCard />",
  "SELECT * FROM work;",
  "npm run build",
  "await deploy(site);",
  "if (scroll) turn();",
  "0x3F9A 0xC0DE",
  "01101110 01100101",
  "{ status: 200 }",
  "useEffect(() => {",
  "export default Page;",
  "lighthouse --perf 98",
  "ssh prod@edge",
  "docker compose up",
  "fn render(face)",
  'hreflang="sr"',
  "return <Neon />;",
];

const COLORS = ["0, 229, 255", "255, 45, 149", "138, 43, 226"];

type Stream = {
  side: 1 | -1; // 1 enters from the left, -1 from the right
  x: number;
  y: number;
  speed: number;
  text: string;
  color: string;
  size: number;
  wave: number;
  phase: number;
};

/**
 * Lines of code that flow in from both sides of a canvas like veins and fade out before
 * the middle. `boost()` returns 0..1 and speeds them up (the spinning prism feeds it).
 * Runs only while the canvas is on screen. Returns a cleanup function.
 */
export function startCodeStreams(canvas: HTMLCanvasElement, boost: () => number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const font = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-mono")
    .trim();
  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = false;
  let streams: Stream[] = [];

  const spawn = (fresh: boolean): Stream => {
    const side = Math.random() < 0.5 ? 1 : -1;
    const reach = width * 0.42;
    const x = fresh ? Math.random() * reach : 0;
    return {
      side,
      x,
      y: Math.random() * height,
      speed: 0.4 + Math.random() * 1.2,
      text: SNIPPETS[(Math.random() * SNIPPETS.length) | 0],
      color: COLORS[Math.random() < 0.6 ? 0 : Math.random() < 0.5 ? 1 : 2],
      size: 10 + Math.round(Math.random() * 4),
      wave: 6 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
    };
  };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.round(Math.min(90, (height / 900) * 70));
    streams = Array.from({ length: count }, () => spawn(true));
  };

  const draw = () => {
    const speedUp = 1 + boost() * 7;
    ctx.clearRect(0, 0, width, height);
    const reach = width * 0.42;
    for (let i = 0; i < streams.length; i++) {
      const s = streams[i];
      s.x += s.speed * speedUp;
      if (s.x > reach) {
        streams[i] = spawn(false);
        continue;
      }
      const t = s.x / reach; // 0 at the edge, 1 where it fades out
      const alpha = Math.min(1, t * 6) * (1 - t) * 0.55;
      const px = s.side === 1 ? s.x : width - s.x;
      const py = s.y + Math.sin(t * Math.PI * 2 + s.phase) * s.wave;
      ctx.font = `${s.size}px ${font}`;
      ctx.textAlign = s.side === 1 ? "right" : "left";
      ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
      ctx.shadowColor = `rgba(${s.color}, ${alpha})`;
      ctx.shadowBlur = 8;
      ctx.fillText(s.text, px, py);
      // A thin trail behind the head of each line.
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(${s.color}, ${alpha * 0.35})`;
      const trail = 40 + s.speed * speedUp * 30;
      ctx.fillRect(
        s.side === 1
          ? px - trail - s.text.length * s.size * 0.6
          : px + s.text.length * s.size * 0.6,
        py - 1,
        trail,
        1,
      );
    }
    frame = visible ? requestAnimationFrame(draw) : 0;
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !frame) frame = requestAnimationFrame(draw);
  });
  observer.observe(canvas);
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(canvas);
  resize();

  return () => {
    observer.disconnect();
    sizeObserver.disconnect();
    cancelAnimationFrame(frame);
    ctx.clearRect(0, 0, width, height);
  };
}
