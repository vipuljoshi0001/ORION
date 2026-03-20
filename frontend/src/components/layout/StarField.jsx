import { useEffect, useRef } from 'react';

export const StarField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let stars = [];
    let meteors = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 280 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.007 + 0.002,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep universe gradient
      const bg = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.2, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width
      );
      bg.addColorStop(0, '#0d1237');
      bg.addColorStop(0.5, '#020817');
      bg.addColorStop(1, '#000005');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula Blue glow
      const n1 = ctx.createRadialGradient(
        canvas.width * 0.15, canvas.height * 0.3, 0,
        canvas.width * 0.15, canvas.height * 0.3, canvas.width * 0.45
      );
      n1.addColorStop(0, 'rgba(37,99,235,0.15)');
      n1.addColorStop(1, 'transparent');
      ctx.fillStyle = n1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula Purple glow
      const n2 = ctx.createRadialGradient(
        canvas.width * 0.85, canvas.height * 0.65, 0,
        canvas.width * 0.85, canvas.height * 0.65, canvas.width * 0.38
      );
      n2.addColorStop(0, 'rgba(124,58,237,0.12)');
      n2.addColorStop(1, 'transparent');
      ctx.fillStyle = n2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula Cyan glow
      const n3 = ctx.createRadialGradient(
        canvas.width * 0.6, canvas.height * 0.05, 0,
        canvas.width * 0.6, canvas.height * 0.05, canvas.width * 0.25
      );
      n3.addColorStop(0, 'rgba(6,182,212,0.08)');
      n3.addColorStop(1, 'transparent');
      ctx.fillStyle = n3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars with twinkle
      stars.forEach(s => {
        s.phase += s.speed;
        const a = 0.3 + 0.7 * Math.abs(Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,232,240,${a})`;
        ctx.fill();
      });

      // Random meteors
      if (Math.random() > 0.994) {
        meteors.push({
          x: Math.random() * canvas.width + 300,
          y: Math.random() * canvas.height * 0.4,
          vx: -5 - Math.random() * 4,
          vy: 2.5 + Math.random() * 2,
          alpha: 1,
          len: 90 + Math.random() * 110,
        });
      }

      meteors = meteors.filter(m => m.alpha > 0.02);
      meteors.forEach(m => {
        const g = ctx.createLinearGradient(
          m.x, m.y,
          m.x + m.len * 0.7, m.y - m.len * 0.4
        );
        g.addColorStop(0, `rgba(255,255,255,${m.alpha})`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.len * (m.vx / 6), m.y + m.len * (m.vy / 6));
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.018;
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="star-canvas" />;
};