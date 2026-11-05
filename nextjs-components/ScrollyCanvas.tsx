'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { Overlay } from './Overlay';

interface ScrollyCanvasProps {
  totalFrames?: number;
  sequencePath?: string;
}

export const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({
  totalFrames = 120,
  sequencePath = '/sequence/frame_',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedPercent, setLoadedPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Track scroll progress through the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fast preloader for WebP frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, '0');
      img.src = `${sequencePath}${padded}_delay-0.067s.webp`;

      img.onload = () => {
        count++;
        const percent = Math.floor((count / totalFrames) * 100);
        setLoadedPercent(percent);

        if (count === totalFrames || count >= 20) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        count++;
        if (count >= totalFrames) setIsLoaded(true);
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, [totalFrames, sequencePath]);

  // High-performance canvas drawing loop with cover scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let currentRenderedIndex = -1;

    const render = () => {
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(progress * totalFrames))
      );

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }

      if (frameIndex !== currentRenderedIndex) {
        const img = images[frameIndex];
        if (img && img.complete && img.naturalWidth > 0) {
          const imgWidth = img.naturalWidth;
          const imgHeight = img.naturalHeight;
          const ratio = Math.max(width / imgWidth, height / imgHeight);

          const destWidth = imgWidth * ratio;
          const destHeight = imgHeight * ratio;
          const destX = (width - destWidth) / 2;
          const destY = (height - destHeight) / 2;

          ctx.fillStyle = '#06080C';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight, destX, destY, destWidth, destHeight);
          currentRenderedIndex = frameIndex;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollYProgress, images, totalFrames]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#06080C]">
      {/* Preloader */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06080C] text-[#F1EFEA]">
          <p className="text-xs tracking-[0.2em] text-[#C6A77B] uppercase mb-2 font-mono">
            Initializing Cinematic Sequence
          </p>
          <div className="w-64 h-1 bg-[#0D1522] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#9F8259] via-[#C6A77B] to-[#DFC8A7] transition-all duration-100"
              style={{ width: `${loadedPercent}%` }}
            />
          </div>
          <span className="font-mono text-xs text-[#94A3B8]">{loadedPercent}%</span>
        </div>
      )}

      {/* Sticky Pinned Viewport Container (500vh track) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#06080C] to-transparent pointer-events-none" />

        {/* Parallax Story Overlays (0%, 30%, 60%, 90%) */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
};
