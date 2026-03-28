import React from 'react';
import type { LoadingProps } from './loading.types';

export const Loading: React.FC<LoadingProps> = ({
  size = 16,
  color = 'white',
}) => {
  const dotSize = size * 0.25;
  const gap = size * 0.15;

  return (
    <>
      <style>{`
        @keyframes dotBounce {
          0%, 20% { 
            transform: scale(1) translateY(0); 
            opacity: 0.4; 
          }
          50% { 
            transform: scale(1.2) translateY(-${size * 0.25}px); 
            opacity: 1; 
          }
          100% { 
            transform: scale(1) translateY(0); 
            opacity: 0.4; 
          }
        }

        .loading-dot {
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        .loading-dot:nth-child(1) { animation-delay: 0s; }
        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <div
        className="inline-flex items-center justify-center"
        style={{
          gap: `${gap}px`,
          height: `${size}px`,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="loading-dot rounded-full"
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </>
  );
};
