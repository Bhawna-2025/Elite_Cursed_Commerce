import { useState, useEffect, useRef } from 'react';
import { toCursedSubscript } from '../utils/cursedText';
import { getTrappedText } from '../utils/languageTrap';
import gsap from 'gsap';

export default function ProductCard({ product, lang, devMode, onAddToCart }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isLowerHalf, setIsLowerHalf] = useState(false);
  const [hoverTimeLeft, setHoverTimeLeft] = useState(5);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  // Intersection logic using delayed cursor
  useEffect(() => {
    if (devMode) return;
    
    let animationFrame;
    const checkIntersection = () => {
      if (cardRef.current && imageRef.current && !isOutOfStock) {
        const rect = imageRef.current.getBoundingClientRect();
        const cursorEl = document.querySelector('.mix-blend-difference');
        if (cursorEl) {
          const cursorRect = cursorEl.getBoundingClientRect();
          const cursorX = cursorRect.left + cursorRect.width / 2;
          const cursorY = cursorRect.top + cursorRect.height / 2;
          
          if (
            cursorX >= rect.left && cursorX <= rect.right &&
            cursorY >= rect.top && cursorY <= rect.bottom
          ) {
            if (!isHovered) setIsHovered(true);
            if (cursorY > rect.top + rect.height / 2) {
              if (!isLowerHalf) setIsLowerHalf(true);
            } else {
              if (isLowerHalf) setIsLowerHalf(false);
            }
          } else {
            if (isHovered) setIsHovered(false);
            if (isLowerHalf) setIsLowerHalf(false);
          }
        }
      }
      animationFrame = requestAnimationFrame(checkIntersection);
    };
    
    animationFrame = requestAnimationFrame(checkIntersection);
    return () => cancelAnimationFrame(animationFrame);
  }, [devMode, isHovered, isLowerHalf, isOutOfStock]);

  // Hover animations - STABLE implementation using scale and absolute positioning without changing layout flow
  useEffect(() => {
    if (isHovered && !isOutOfStock) {
      gsap.to(imageRef.current, {
        scale: 1.5,
        zIndex: 40,
        duration: 0.3,
        filter: isLowerHalf ? 'blur(5px) brightness(0.5)' : 'blur(0px) brightness(1)',
      });
      
      gsap.to(overlayRef.current, {
        opacity: 1,
        zIndex: 50,
        scale: 1.5,
        duration: 0.3,
        display: 'flex'
      });
      
    } else {
      gsap.to(imageRef.current, {
        scale: 1,
        zIndex: 10,
        duration: 0.3,
        filter: 'blur(0px) brightness(1)'
      });
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }
      });
    }
  }, [isHovered, isLowerHalf, isOutOfStock]);

  // 5-second countdown logic
  useEffect(() => {
    let timer;
    if (isHovered && !isOutOfStock) {
      timer = setInterval(() => {
        setHoverTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsOutOfStock(true);
            setIsHovered(false); // Force exit hover state to prevent zoom bugs while out of stock
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isHovered && !isOutOfStock) {
      setHoverTimeLeft(5); // Reset if they leave before it hits 0
    }
    
    return () => clearInterval(timer);
  }, [isHovered, isOutOfStock]);

  // Out of stock flicker recovery
  useEffect(() => {
    if (isOutOfStock) {
      // Flicker animation
      const flicker = setInterval(() => {
        if (imageRef.current) {
          imageRef.current.style.opacity = Math.random() > 0.5 ? '0.2' : '0.8';
        }
      }, 100);
      
      const recovery = setTimeout(() => {
        clearInterval(flicker);
        if (imageRef.current) imageRef.current.style.opacity = '1';
        setIsOutOfStock(false);
        setHoverTimeLeft(5);
      }, 2000);
      
      return () => {
        clearInterval(flicker);
        clearTimeout(recovery);
      };
    }
  }, [isOutOfStock]);

  return (
    <div ref={cardRef} className="bg-background border border-blood/30 p-4 rounded-xl shadow-lg hover:shadow-blood/20 transition-shadow relative z-0">
      <div className="relative h-64 mb-4 flex items-center justify-center">
        <img 
          ref={imageRef}
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain rounded-lg origin-center transition-transform"
          onMouseEnter={(e) => {
            if (devMode && !isOutOfStock) {
              setIsHovered(true);
              const rect = e.currentTarget.getBoundingClientRect();
              if (e.clientY > rect.top + rect.height / 2) setIsLowerHalf(true);
            }
          }}
          onMouseMove={(e) => {
            if (devMode && isHovered && !isOutOfStock) {
              const rect = e.currentTarget.getBoundingClientRect();
              setIsLowerHalf(e.clientY > rect.top + rect.height / 2);
            }
          }}
          onMouseLeave={() => {
            if (devMode) {
              setIsHovered(false);
              setIsLowerHalf(false);
            }
          }}
        />
        
        {/* Hover Description Overlay */}
        <div 
          ref={overlayRef} 
          className="hidden absolute inset-0 items-center justify-center p-4 pointer-events-none origin-center"
        >
          <p className="text-black font-black text-sm leading-tight text-center bg-white/80 p-2 rounded backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            {toCursedSubscript(product.description)}
          </p>
        </div>

        {/* Countdown Indicator */}
        {isHovered && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-black/80 text-glow font-bold px-2 py-1 rounded border border-blood z-[60] pointer-events-none animate-pulse">
            {hoverTimeLeft}s
          </div>
        )}

        {/* Out of Stock Indicator */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-[70] flex items-center justify-center bg-black/60 rounded-lg pointer-events-none">
            <span className="text-glow text-4xl font-black uppercase tracking-widest drop-shadow-[0_0_10px_red] mix-blend-screen">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gold mb-2">{product.name}</h3>
      <div className="flex justify-between items-center mt-4">
        <span className="text-glow font-mono font-bold text-lg lollygag-price" data-baseprice={product.price}>
          ${product.price}
        </span>
        <button 
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className={`px-4 py-2 rounded font-bold transition-transform ${isOutOfStock ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blood text-cream hover:bg-blood/80 active:scale-95'}`}
        >
          {getTrappedText("Add to Cart", lang)}
        </button>
      </div>
    </div>
  );
}
