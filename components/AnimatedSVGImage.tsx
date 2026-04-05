'use client';

import { useEffect, useRef } from 'react';

/* ─── lightning bolt via midpoint displacement ─────────────────────────── */
function buildBolt(
  x1: number, y1: number,
  x2: number, y2: number,
  roughness: number,
  depth: number,
): [number, number][] {
  if (depth === 0) return [[x1, y1], [x2, y2]];
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * roughness;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * roughness;
  return [
    ...buildBolt(x1, y1, mx, my, roughness / 2, depth - 1),
    ...buildBolt(mx, my, x2, y2, roughness / 2, depth - 1).slice(1),
  ];
}

function drawBolt(
  ctx: CanvasRenderingContext2D,
  pts: [number, number][],
  alpha: number,
  width: number,
  color: string,
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
  ctx.restore();
}

interface Bolt {
  pts: [number, number][];
  life: number;       // 0–1, decreases each frame
  decay: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  decay: number;
  color: string;
}

export default function AnimatedSVGImage({
  src,
  alt = '',
  style,
  className,
}: {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* resize canvas to match wrapper */
    function resize() {
      if (!canvas || !wrap) return;
      canvas.width  = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* pause when scrolled off-screen */
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(wrap);

    /* state */
    const bolts: Bolt[] = [];
    const particles: Particle[] = [];

    const BOLT_COLORS  = ['#00FFFF', '#00FFD0', '#00FF9F', '#FFFFFF'];
    const SPARK_COLORS = ['#00FFFF', '#00FFD0', '#80FFF0'];

    /* spawn a bolt from image edge toward center */
    function spawnBolt() {
      if (!canvas) return;
      const { width: W, height: H } = canvas;
      const cx = W / 2;
      const cy = H / 2;

      /* start point somewhere on image perimeter */
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.min(W, H) * 0.42;
      const sx = cx + Math.cos(angle) * radius;
      const sy = cy + Math.sin(angle) * radius;

      /* end point near center with jitter */
      const ex = cx + (Math.random() - 0.5) * W * 0.25;
      const ey = cy + (Math.random() - 0.5) * H * 0.25;

      bolts.push({
        pts: buildBolt(sx, sy, ex, ey, radius * 0.35, 6),
        life: 1,
        decay: 0.04 + Math.random() * 0.06,
        color: BOLT_COLORS[Math.floor(Math.random() * BOLT_COLORS.length)],
      });

      /* emit a few particles from the tip */
      for (let i = 0; i < 4 + Math.random() * 4; i++) {
        const speed = 0.5 + Math.random() * 1.5;
        const dir = Math.random() * Math.PI * 2;
        particles.push({
          x: sx, y: sy,
          vx: Math.cos(dir) * speed,
          vy: Math.sin(dir) * speed,
          r: 1 + Math.random() * 2,
          alpha: 0.8 + Math.random() * 0.2,
          decay: 0.015 + Math.random() * 0.03,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        });
      }
    }

    const img = imgRef.current;
    let frameCount = 0;

    function loop() {
      rafRef.current = requestAnimationFrame(loop);
      if (!canvas || !ctx || !visible) return;
      const { width: W, height: H } = canvas;

      /* ── image motion (synced to same clock) ───────────────────────── */
      if (img) {
        const t = frameCount * 0.018;
        const floatY  =  Math.sin(t)        * 7;          // ±7 px vertical float
        const swayX   =  Math.sin(t * 0.6)  * 4;          // ±4 px horizontal sway
        const rotate  =  Math.sin(t * 0.4)  * 2.5;        // ±2.5° gentle tilt
        const scale   =  1 + Math.sin(t * 0.7) * 0.03;    // ±3% breathe
        img.style.transform = `translate(${swayX}px, ${floatY}px) rotate(${rotate}deg) scale(${scale})`;
      }

      /* clear */
      ctx.clearRect(0, 0, W, H);

      /* spawn bolts on a staggered schedule */
      frameCount++;
      if (frameCount % 18 === 0) spawnBolt();
      if (frameCount % 30 === 0) spawnBolt(); // double-up occasionally

      /* draw & age bolts */
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        drawBolt(ctx, b.pts, b.life * 0.85, 1.5, b.color);
        /* white core flash on fresh bolts */
        if (b.life > 0.7) drawBolt(ctx, b.pts, (b.life - 0.7) * 2, 0.5, '#FFFFFF');
        b.life -= b.decay;
        if (b.life <= 0) bolts.splice(i, 1);
      }

      /* draw & age particles */
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // slight gravity
        p.alpha -= p.decay;
        if (p.alpha <= 0) particles.splice(i, 1);
      }

      /* ambient glow ring that pulses */
      const pulse = 0.15 + 0.12 * Math.sin(frameCount * 0.05);
      const cx = W / 2, cy = H / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.48);
      grad.addColorStop(0,   `rgba(0,255,220,${pulse * 0.45})`);
      grad.addColorStop(0.55,`rgba(0,200,255,${pulse * 0.2})`);
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(W, H) * 0.48, 0, Math.PI * 2);
      ctx.fill();

    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* the original image, unchanged */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        aria-hidden="true"
        className={className}
        style={{
          ...style,
          willChange: 'transform',
          filter: 'saturate(0) sepia(1) hue-rotate(185deg) saturate(4) brightness(1.25)',
        }}
      />

      {/* electric overlay — sits on top, no pointer events */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
