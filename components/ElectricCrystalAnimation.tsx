'use client';

import { useEffect, useRef } from 'react';

export default function ElectricCrystalAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mascotRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;
    const container = containerRef.current;

    async function init() {
      try {
        // webpackIgnore tells Next.js bundler to leave this URL as-is at runtime
        const { default: EmotiveMascot3D } = await import(
          /* webpackIgnore: true */
          'https://joshtol.github.io/emotive-engine/emotive-engine-3d-elementals.bundled.js' as string
        );

        if (destroyed) return;

        const mascot = new EmotiveMascot3D({
          coreGeometry: 'crystal',
          enableParticles: true,
          enablePostProcessing: true,
          enableShadows: false,
          enableControls: false,
          autoRotate: true,
          autoRotateSpeed: 0.3,
          cameraDistance: 1.45,
          fov: 30,
          materialVariant: 'multiplexer',
          assetBasePath: 'https://joshtol.github.io/emotive-engine/assets',
          preloadElements: [],
          backgroundPrewarm: false,
          enableBlinking: false,
          enableBreathing: false,
        });

        mascotRef.current = mascot;

        mascot.init(container);
        await mascot.start();

        if (destroyed) return;

        await mascot.core3D.elementSpawner.preloadModels('electricity');

        if (destroyed) return;

        mascot.express('electricsurge');
      } catch (err) {
        console.error('[ElectricCrystalAnimation] failed to load:', err);
      }
    }

    init();

    return () => {
      destroyed = true;
      if (mascotRef.current?.dispose) {
        try {
          mascotRef.current.dispose();
        } catch (_) {
          // ignore disposal errors
        }
      }
      mascotRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        width: 'clamp(160px, 20vw, 260px)',
        height: 'clamp(160px, 20vw, 260px)',
      }}
    />
  );
}
