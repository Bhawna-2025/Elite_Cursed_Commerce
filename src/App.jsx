import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Cursor from './components/Cursor';
import ProductCard from './components/ProductCard';
import Gauntlet from './components/Gauntlet';
import EvilCheckout from './components/EvilCheckout';
import FleeingFooter from './components/FleeingFooter';
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';
import { getTrappedText } from './utils/languageTrap';
import { ShoppingCart, Search } from 'lucide-react';
import invisibleCloakImg from './assets/product_images/invisible cloak.png';
import quantumAppleImg from './assets/product_images/quantum apple.jpg';
import vampireMirrorImg from './assets/product_images/vempire mirror.jpg';

const DUMMY_PRODUCTS = [
  { id: 1, name: "Cursed Chalice", price: 666.00, image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=500&q=80", description: "Drink from it and lose your sanity. This chalice was forged in the fiery depths of an ancient volcano, cursed by a forgotten deity. Whoever drinks from this vessel shall find their thirst quenched, but their mind forever bound to the shadows. Do not use at parties." },
  { id: 2, name: "Haunted GPU", price: 1099.99, image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80", description: "Mines crypto for demons. Fans scream eternally. It offers unprecedented frame rates in modern titles, but randomly manifests terrifying ghosts on your monitor during late-night gaming sessions. Requires a blood sacrifice for driver updates." },
  { id: 3, name: "Invisible Cloak", price: 99.99, image: invisibleCloakImg, description: "It works perfectly to hide your physical form from the naked eye, but unfortunately, it makes you entirely blind while wearing it, and it smells faintly of rotting cabbage. Dry clean only." },
  { id: 4, name: "Quantum Apple", price: 4.99, image: quantumAppleImg, description: "Simultaneously eaten and not eaten. Tastes like pure mathematics. If you bite into it, there is a 50% chance you will be teleported to a dimension where apples eat you. A great source of theoretical fiber." },
  { id: 5, name: "Vampire Mirror", price: 149.00, image: vampireMirrorImg, description: "Reflects absolutely everything in the room except for human beings. Great for taking selfies of your empty outfits. Frequently whispers compliments in a language that hasn't been spoken in three millennia." },
  { id: 6, name: "Time-Loop Watch", price: 250.00, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80", description: "Always shows exactly 5 minutes ago. No matter how many times you wind it, change the battery, or smash it with a hammer, it will persist in reminding you of the recent past. Excellent for people who love dwelling on their mistakes." },
  { id: 7, name: "Cursed Keyboard", price: 120.00, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80", description: "Every key you press types a letter from a forgotten language. Good for summoning, bad for programming. Backspace is permanently disabled." },
  { id: 8, name: "Demonic Toaster", price: 45.00, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80", description: "Burns bread perfectly, but also screams in agony while doing it. Occasionally produces toast with ominous symbols that foretell your doom." },
  { id: 9, name: "Sentient Mouse", price: 89.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", description: "Not a computer mouse. A regular mouse that gained sentience after eating your gaming PC's thermal paste. It constantly judges your APM." }
];

export default function App() {
  const [devMode, setDevMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartStartTime, setCartStartTime] = useState(null);
  const [lang, setLang] = useState('English');
  const [gauntletOpen, setGauntletOpen] = useState(false);
  const [targetProductIndex, setTargetProductIndex] = useState(null);
  
  // Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // New Navigation and Sign-up States
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'signup', 'shop'
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k') {
        setDevMode(prev => !prev);
        if (!devMode) {
          document.body.classList.add('dev-mode');
        } else {
          document.body.classList.remove('dev-mode');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [devMode]);

  const handleLangToggle = () => {
    if (lang === 'English') setLang('Hindi');
    else if (lang === 'Hindi') setLang('Spanish');
    else setLang('English');
  };

  const startGauntlet = (index) => {
    setTargetProductIndex(index);
    setGauntletOpen(true);
  };

  const handleGauntletSuccess = () => {
    setGauntletOpen(false);
    // Add the product IMMEDIATELY BELOW the target item
    const nextIndex = (targetProductIndex + 1) % DUMMY_PRODUCTS.length;
    const itemToAdd = DUMMY_PRODUCTS[nextIndex];
    
    setCart(prev => {
      const newCart = [...prev, itemToAdd];
      if (prev.length === 0) setCartStartTime(Date.now());
      return newCart;
    });
  };

  // Cursed Search logic: search for one item, get a completely different one (shifted by 1)
  const displayedProducts = searchQuery.trim()
    ? (() => {
        const query = searchQuery.toLowerCase();
        const matches = DUMMY_PRODUCTS.filter(p => p.name.toLowerCase().includes(query));
        if (matches.length > 0) {
          return matches.map(p => DUMMY_PRODUCTS[p.id % DUMMY_PRODUCTS.length]);
        }
        return [];
      })()
    : DUMMY_PRODUCTS;

  if (currentPage === 'landing') {
    return (
      <>
        <Cursor devMode={devMode} />
        <LandingPage 
          onSignUp={() => setCurrentPage('signup')}
          onEnterAsGuest={() => {
            setIsSignedUp(false);
            setCurrentPage('shop');
          }}
        />
      </>
    );
  }

  if (currentPage === 'signup') {
    return (
      <>
        <Cursor devMode={devMode} />
        <SignUpPage 
          onSignUpComplete={(name) => {
            setIsSignedUp(true);
            setUserName(name);
            setCurrentPage('shop');
          }}
          onBack={() => setCurrentPage('landing')}
        />
      </>
    );
  }

  return (
    <>
      <Cursor devMode={devMode} />
      
      {/* Main App Container */}
      <div className="min-h-screen bg-background text-cream font-sans">
        
        {/* Header */}
        <header className="fixed top-0 w-full bg-black/80 backdrop-blur border-b border-blood p-4 z-40 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-black text-blood tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(139,0,0,0.8)]">
              Elite Cursed Commerce
            </h1>
            {isSignedUp && userName && (
              <span className="text-[10px] text-gold font-mono uppercase tracking-widest mt-0.5">
                💀 Vessel: {userName}
              </span>
            )}
          </div>
          <div className="flex gap-6 items-center">
            
            {/* Attention-grabbing glitched search bar reveal button */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/50 bg-red-950/20 text-red-400 font-mono text-xs hover:border-red-500 hover:text-white transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <Search className="w-3.5 h-3.5 animate-bounce" />
                <span>⚠️ DESTRUCTIVE SEARCH</span>
              </button>

              <AnimatePresence>
                {showSearch && (
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden flex items-center border border-gold bg-black rounded"
                  >
                    <input 
                      type="text"
                      placeholder="Type query to self-destruct..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-cream px-2 py-1 text-xs outline-none w-full font-mono placeholder:text-red-500/50"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={handleLangToggle}
              className="px-3 py-1 border border-gold text-gold hover:bg-gold hover:text-black transition-colors"
            >
              Lang: {lang}
            </button>
            <button 
              onClick={() => {
                if (!isSignedUp) {
                  alert("ERROR: You can never leave.");
                  gsap.to(document.body, { rotation: "+=360", duration: 2, ease: "power2.inOut" });
                } else {
                  setIsSignedUp(false);
                  setUserName('');
                  setCart([]);
                  setCurrentPage('landing');
                }
              }}
              className="px-3 py-1 border border-blood text-blood hover:bg-blood hover:text-white transition-colors"
            >
              Logout
            </button>
            <div className="flex items-center gap-2 text-glow relative">
              <ShoppingCart />
              <span className="font-bold">{cart.length}</span>
            </div>
          </div>
        </header>

        {/* Dev Mode Banner */}
        {devMode && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded font-bold z-50">
            DEV MODE ACTIVE
          </div>
        )}

        {/* Main Content */}
        <main className="pt-32 pb-48 px-8 max-w-7xl mx-auto">
          <p className="text-center text-xl mb-12 text-cream/50 italic">
            "Every purchase is a mistake. Every checkout is a journey."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => {
              const originalIndex = DUMMY_PRODUCTS.findIndex(p => p.id === product.id);
              return (
                <ProductCard 
                  key={product.id}
                  product={product}
                  lang={lang}
                  devMode={devMode}
                  onAddToCart={() => startGauntlet(originalIndex)}
                />
              );
            })}
          </div>
        </main>
        
        <FleeingFooter devMode={devMode} />
        
      </div>

      {/* Overlays */}
      <Gauntlet 
        isOpen={gauntletOpen} 
        onComplete={handleGauntletSuccess} 
        onCancel={() => setGauntletOpen(false)} 
      />
      
      <EvilCheckout 
        cart={cart}
        setCart={setCart}
        cartStartTime={cartStartTime}
        lang={lang}
        devMode={devMode}
      />
    </>
  );
}
