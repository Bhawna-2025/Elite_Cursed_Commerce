import { useEffect, useState } from 'react';
import { getTrappedText } from '../utils/languageTrap';
import gsap from 'gsap';

export default function EvilCheckout({ cart, setCart, cartStartTime, lang, devMode }) {
  const [timeLeft, setTimeLeft] = useState(90);
  
  useEffect(() => {
    if (!cartStartTime || cart.length === 0) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - cartStartTime;
      const remaining = Math.max(0, 90 - Math.floor(elapsed / 1000));
      setTimeLeft(remaining);
      
      // 90s cart wipe
      if (elapsed > 90000) {
        setCart([]);
        alert("You took too long! Cart wiped.");
      }
      
      // 60s lollygagging surcharge
      else if (elapsed > 60000) {
        // Find all price elements and increase their visual value
        const priceEls = document.querySelectorAll('.lollygag-price');
        priceEls.forEach(el => {
          if (!el.dataset.surcharged) {
            el.dataset.surcharged = 'true';
            const basePrice = parseFloat(el.dataset.baseprice);
            const newPrice = (basePrice * 1.5).toFixed(2);
            el.innerText = `$${newPrice}`;
            
            // GSAP text-grow animation
            gsap.fromTo(el, 
              { scale: 1, color: '#FF4D4D' }, 
              { scale: 1.5, color: '#8B0000', duration: 0.5, yoyo: true, repeat: 3 }
            );
          }
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [cart, cartStartTime, setCart]);

  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-32 bg-black/90 border-t border-blood flex items-center justify-between p-4 z-50">
      
      {/* Tiny Confirm Button */}
      <button 
        className="w-4 h-4 bg-gray-700 text-[6px] text-gray-400 hover:text-white rounded absolute bottom-2 left-2 flex items-center justify-center overflow-hidden"
        onClick={() => alert('Order confirmed... wait, no it is not.')}
      >
        {getTrappedText('Confirm', lang)}
      </button>

      {/* Massive Cancel Button */}
      <button 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-24 bg-green-500 text-white text-5xl font-black rounded-full shadow-[0_0_40px_rgba(34,197,94,0.8)] hover:bg-green-400 animate-pulse"
        onClick={() => setCart([])}
      >
        {getTrappedText('Cancel', lang)}
      </button>
      
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2">
        <div className="text-gold text-xl font-bold">
          Cart Items: {cart.length}
        </div>
        <div className={`text-2xl font-mono font-bold ${timeLeft < 30 ? 'text-blood animate-bounce' : 'text-glow'}`}>
          Time Left: {timeLeft}s
        </div>
      </div>
      
    </div>
  );
}
