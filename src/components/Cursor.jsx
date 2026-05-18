import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor({ devMode }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (devMode) return; // In dev mode, we use native cursor

    const onMouseMove = (e) => {
      // 4-second delay lerp
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 4,
        ease: 'power2.out',
      });
      // Store real mouse coordinates globally to allow intersection checks if needed
      window.realMouseX = e.clientX;
      window.realMouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [devMode]);

  if (devMode) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-blood bg-glow/50 pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
    >
      <div className="w-1 h-1 bg-white rounded-full"></div>
    </div>
  );
}
