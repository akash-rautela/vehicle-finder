import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

const MouseChaseEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const orbsRef = useRef<{ x: number; y: number; targetX: number; targetY: number; radius: number; hue: number }[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create floating orbs
    orbsRef.current = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      radius: 100 + Math.random() * 150,
      hue: i % 2 === 0 ? 190 + Math.random() * 20 : 38 + Math.random() * 15,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Spawn trail particles
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: 2 + Math.random() * 3,
          alpha: 0.8,
          decay: 0.015 + Math.random() * 0.01,
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = theme === "dark";

      // Draw & update floating orbs that chase the mouse
      orbsRef.current.forEach((orb) => {
        const dx = mouseRef.current.x - orb.x;
        const dy = mouseRef.current.y - orb.y;
        orb.x += dx * 0.008;
        orb.y += dy * 0.008;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        const baseAlpha = isDark ? 0.08 : 0.12;
        const lightness = isDark ? "50%" : "55%";
        gradient.addColorStop(0, `hsla(${orb.hue}, 80%, ${lightness}, ${baseAlpha})`);
        gradient.addColorStop(0.6, `hsla(${orb.hue}, 80%, ${lightness}, ${baseAlpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${orb.hue}, 80%, ${lightness}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw & update trail particles
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.01);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.radius *= 0.98;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const pAlpha = isDark ? p.alpha : p.alpha * 1.2;
        ctx.fillStyle = `hsla(190, 80%, ${isDark ? "50%" : "45%"}, ${pAlpha})`;
        ctx.fill();

        // Add glow ring in light mode
        if (!isDark && p.alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(190, 80%, 45%, ${p.alpha * 0.15})`;
          ctx.fill();
        }
      });

      // Limit particle count
      if (particlesRef.current.length > 80) {
        particlesRef.current = particlesRef.current.slice(-80);
      }

      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

export default MouseChaseEffect;
