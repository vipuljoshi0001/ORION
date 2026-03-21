import { useEffect, useRef } from 'react';

export const StarField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let stars = [];
    let shootingStars = [];
    let scrollY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = Array.from({ length: 350 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.1,
        baseAlpha: Math.random() * 0.7 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.004 + 0.001,
        color: Math.random() > 0.85
          ? `rgba(180,220,255,`
          : Math.random() > 0.7
            ? `rgba(255,240,200,`
            : `rgba(226,232,240,`,
      }));
    };

    const spawnShootingStar = () => {
      if (Math.random() > 0.997) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          vx: -6 - Math.random() * 6,
          vy: 1.5 + Math.random() * 3,
          alpha: 1,
          len: 120 + Math.random() * 180,
          width: 1 + Math.random(),
        });
      }
    };

    const drawSolarSystem = () => {
      const cx = canvas.width * 0.78;
      const cy = canvas.height * 0.35 - scrollY * 0.3;
      const t = Date.now() / 1000;

      // Sun glow
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      sunGlow.addColorStop(0, 'rgba(255,200,80,0.25)');
      sunGlow.addColorStop(0.4, 'rgba(255,150,30,0.08)');
      sunGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun core
      const sunCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      sunCore.addColorStop(0, 'rgba(255,240,180,0.95)');
      sunCore.addColorStop(0.5, 'rgba(255,180,50,0.8)');
      sunCore.addColorStop(1, 'rgba(255,120,0,0.4)');
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = sunCore;
      ctx.fill();

      // Planets data
      const planets = [
        { r: 32, size: 2.5, speed: 1.6, color: 'rgba(180,180,180,0.9)', name: 'Mercury' },
        { r: 52, size: 3.5, speed: 1.2, color: 'rgba(220,190,100,0.9)', name: 'Venus' },
        { r: 76, size: 4, speed: 0.9, color: 'rgba(80,140,220,0.9)', name: 'Earth' },
        { r: 100, size: 3, speed: 0.7, color: 'rgba(200,100,60,0.85)', name: 'Mars' },
        { r: 140, size: 7, speed: 0.45, color: 'rgba(200,170,120,0.85)', name: 'Jupiter' },
      ];

      planets.forEach(p => {
        const angle = t * p.speed + p.r;

        // Orbit ring
        ctx.beginPath();
        ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        const px = cx + Math.cos(angle) * p.r;
        const py = cy + Math.sin(angle) * p.r;

        // Planet glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
        glow.addColorStop(0, p.color.replace('0.9)', '0.3)').replace('0.85)', '0.25)'));
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Planet body
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Saturn ring
        if (p.name === 'Jupiter') {
          ctx.beginPath();
          ctx.ellipse(px, py, p.size * 2.5, p.size * 0.6, 0.4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(200,170,120,0.35)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pure black space
      ctx.fillStyle = '#000005';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Very subtle deep blue tint at top
      const topGrad = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.4);
      topGrad.addColorStop(0, 'rgba(5,10,30,0.6)');
      topGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach(s => {
        s.phase += s.speed;
        const a = s.baseAlpha * (0.5 + 0.5 * Math.abs(Math.sin(s.phase)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${a})`;
        ctx.fill();
      });

      // Solar system
      drawSolarSystem();

      // Shooting stars
      spawnShootingStar();
      shootingStars = shootingStars.filter(s => s.alpha > 0.02);
      shootingStars.forEach(s => {
        const g = ctx.createLinearGradient(s.x, s.y, s.x + s.len * 0.8, s.y - s.len * 0.3);
        g.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
        g.addColorStop(0.3, `rgba(200,230,255,${s.alpha * 0.6})`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len * (s.vx / 8), s.y + s.len * (s.vy / 8));
        ctx.strokeStyle = g;
        ctx.lineWidth = s.width;
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.016;
      });

      animId = requestAnimationFrame(draw);
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <canvas ref={ref} className="star-canvas" />;
};