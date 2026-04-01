import { useEffect, useRef, type ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';

interface SmoothScrollProps {
  children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
  
    // Synchronize GSAP ticker with Lenis to prevent scroll jitter
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
  
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
