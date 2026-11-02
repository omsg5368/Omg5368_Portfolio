import React, { useEffect, useRef } from 'react';

interface MatrixRainCanvasProps {
  theme?: 'green' | 'cyan' | 'amber';
  opacity?: number;
}

export const MatrixRainCanvas: React.FC<MatrixRainCanvasProps> = ({
  theme = 'green',
  opacity = 0.2
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters: Katakana, latin, numbers, symbols
    const chars = '0123456789ABCDEF010101010101101010100101010101010101011010101001010101010101010110101010010101010101010101101010100101010101010101011010101001010101010101010110101010010101010101010101101010100101010101010101011010101001010101010101010110101010010101010101010101101010100101010101010101011010101001';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);

    const getColors = () => {
      switch (theme) {
        case 'cyan':
          return { head: '#ffffff', trail: '#00f0ff', dim: '#0891b2' };
        case 'amber':
          return { head: '#ffffff', trail: '#ffb000', dim: '#b45309' };
        case 'green':
        default:
          return { head: '#ffffff', trail: '#00ff66', dim: '#15803d' };
      }
    };

    let colorScheme = getColors();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      // Semi-transparent fade
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head is white, trailing characters are themed phosphor
        if (Math.random() > 0.85) {
          ctx.fillStyle = colorScheme.head;
        } else {
          ctx.fillStyle = colorScheme.trail;
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
};

