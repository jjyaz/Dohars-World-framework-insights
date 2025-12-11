import { useEffect, useState } from "react";

interface Cloud {
  id: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
}

export const PixelClouds = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    const newClouds: Cloud[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      y: Math.random() * 60 + 5,
      size: Math.random() * 60 + 80,
      speed: Math.random() * 40 + 60,
      delay: Math.random() * -60,
    }));
    setClouds(newClouds);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute animate-cloud-float"
          style={{
            top: `${cloud.y}%`,
            width: cloud.size,
            height: cloud.size * 0.5,
            animationDuration: `${cloud.speed}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          {/* Pixel cloud shape */}
          <svg viewBox="0 0 64 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
            <rect x="16" y="16" width="8" height="8" fill="white" />
            <rect x="24" y="16" width="8" height="8" fill="white" />
            <rect x="32" y="16" width="8" height="8" fill="white" />
            <rect x="40" y="16" width="8" height="8" fill="white" />
            <rect x="8" y="8" width="8" height="8" fill="white" />
            <rect x="16" y="8" width="8" height="8" fill="white" />
            <rect x="24" y="8" width="8" height="8" fill="white" />
            <rect x="32" y="8" width="8" height="8" fill="white" />
            <rect x="40" y="8" width="8" height="8" fill="white" />
            <rect x="48" y="8" width="8" height="8" fill="white" />
            <rect x="16" y="0" width="8" height="8" fill="white" />
            <rect x="24" y="0" width="8" height="8" fill="white" />
            <rect x="32" y="0" width="8" height="8" fill="white" />
            <rect x="40" y="0" width="8" height="8" fill="white" />
            <rect x="8" y="16" width="8" height="8" fill="white" />
            <rect x="48" y="16" width="8" height="8" fill="white" />
            <rect x="0" y="8" width="8" height="8" fill="white" />
            <rect x="56" y="8" width="8" height="8" fill="white" />
            {/* Shadow pixels */}
            <rect x="8" y="24" width="8" height="8" fill="hsl(200 60% 90%)" />
            <rect x="16" y="24" width="8" height="8" fill="hsl(200 60% 90%)" />
            <rect x="24" y="24" width="8" height="8" fill="hsl(200 60% 90%)" />
            <rect x="32" y="24" width="8" height="8" fill="hsl(200 60% 90%)" />
            <rect x="40" y="24" width="8" height="8" fill="hsl(200 60% 90%)" />
            <rect x="48" y="24" width="8" height="8" fill="hsl(200 60% 90%)" />
          </svg>
        </div>
      ))}
    </div>
  );
};
