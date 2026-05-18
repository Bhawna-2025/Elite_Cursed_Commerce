import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function FleeingFooter({ devMode }) {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (devMode) {
      // Reset position in dev mode so it can be clicked
      gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5 });
      return;
    }

    const handleMouseMove = (e) => {
      if (!buttonRef.current || !containerRef.current) return;

      const btnRect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate center of the button
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      // Calculate distance between mouse and button center
      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // If mouse is within 150px, run away!
      if (distance < 150) {
        // Calculate escape vector (opposite of mouse approach)
        const angle = Math.atan2(distY, distX);
        const escapeDist = 100; // How far it jumps
        
        // Move opposite to the angle
        let newX = position.x - Math.cos(angle) * escapeDist;
        let newY = position.y - Math.sin(angle) * escapeDist;

        // Keep it somewhat bounded inside the footer so it doesn't fly off screen completely
        const maxJumpX = containerRect.width / 2 - btnRect.width;
        const maxJumpY = containerRect.height / 2 - btnRect.height;

        // Wrap around if it goes too far
        if (Math.abs(newX) > maxJumpX) newX *= -0.5;
        if (Math.abs(newY) > maxJumpY) newY *= -0.5;

        setPosition({ x: newX, y: newY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position, devMode]);

  useEffect(() => {
    if (!devMode) {
      gsap.to(buttonRef.current, {
        x: position.x,
        y: position.y,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  }, [position, devMode]);

  return (
    <footer 
      ref={containerRef}
      className="w-full bg-black/90 border-t border-blood py-24 relative overflow-hidden flex flex-col items-center justify-center mt-20"
    >
      <h2 className="text-2xl text-gold mb-8 font-bold text-center">
        Join our Newsletter (We promise not to sell your soul)
      </h2>
      
      <div className="relative w-full h-32 flex items-center justify-center">
        <button
          ref={buttonRef}
          onClick={() => {
            if (devMode) {
              alert("You caught it! Dev Mode is cheating though.");
            } else {
              alert("Wait, how did you click this?! You win!");
            }
          }}
          className="absolute bg-glow text-black font-black text-xl px-8 py-4 rounded-full shadow-[0_0_20px_rgba(255,77,77,0.8)] hover:bg-white transition-colors cursor-none"
        >
          Sign Up Now
        </button>
      </div>
      
      <p className="text-cream/30 text-sm mt-8">
        © 2026 Elite Cursed Commerce. All rights surrendered.
      </p>
    </footer>
  );
}
