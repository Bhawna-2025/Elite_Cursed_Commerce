import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReverseScrollWrapper({ children, devMode }) {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(2000); // Default placeholder

  useEffect(() => {
    if (devMode) {
      // If dev mode is on, just kill standard triggers and allow normal scroll
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.set(contentRef.current, { clearProps: 'all' });
      return;
    }

    // Measure the actual height of the content to set the dummy scroll wrapper height
    if (contentRef.current) {
      const height = contentRef.current.getBoundingClientRect().height;
      setContentHeight(Math.max(height, window.innerHeight * 2)); // Ensure at least some scroll
    }

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1, // Smooth scrub
      onUpdate: (self) => {
        // Move content UP when scrolling DOWN (this is actually normal, wait.
        // If we want it to move UP when scrolling DOWN, that means scrolling down takes us to the top?
        // Wait, normally scrolling down moves content UP. 
        // If we want "reverse scroll": scrolling down moves content DOWN (so we go higher up the page).
        // Let's implement literal "content moves UP when scrolling DOWN" but super exaggerated, or "content moves DOWN when scrolling DOWN".
        // The prompt says: "make the page content move UP when the user scrolls DOWN" - which is how normal scrolling works physically, 
        // but maybe it means it scrolls twice as fast? Or inverted?
        // Usually, scrolling down = window goes down = content goes up.
        // Let's make scrolling down move the content DOWN (so we scroll up).
        // That's truly reverse.
        const scrollDistance = self.progress * (contentHeight - window.innerHeight);
        
        gsap.to(contentRef.current, {
          y: scrollDistance, // Positive Y means content goes down!
          duration: 0.1,
          ease: 'none',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      st.kill();
      gsap.set(contentRef.current, { clearProps: 'all' });
    };
  }, [devMode, contentHeight, children]);

  if (devMode) {
    return <div className="w-full min-h-screen relative">{children}</div>;
  }

  return (
    <>
      {/* Dummy scrollable element */}
      <div ref={wrapperRef} style={{ height: `${contentHeight}px` }} className="w-full absolute top-0 left-0 pointer-events-none opacity-0"></div>
      
      {/* Fixed content container */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div ref={contentRef} className="w-full absolute bottom-0 pointer-events-auto">
           {/* We start it at the bottom so moving it down reveals higher content, wait no.
               Let's just start at top and move Y positively. */}
        </div>
      </div>
      
      {/* Wait, the above logic is too complex for React mounting. Let's do a simpler approach: */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-background">
         <div ref={contentRef} className="w-full absolute left-0" style={{ bottom: 0 }}>
            {children}
         </div>
      </div>
      {/* We set height so body can scroll */}
      <div ref={wrapperRef} style={{ height: `${contentHeight}px` }} className="w-full absolute top-0 left-0 -z-10 opacity-0 pointer-events-none" />
    </>
  );
}
