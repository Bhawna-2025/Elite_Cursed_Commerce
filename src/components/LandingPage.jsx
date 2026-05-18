import { motion } from 'framer-motion';

export default function LandingPage({ onSignUp, onEnterAsGuest }) {
  return (
    <div className="min-h-screen bg-[#070707] text-cream flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none">
      {/* Horrific Background Effects */}
      <div className="absolute inset-0 bg-radial-gradient from-blood/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blood/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Floating dust/blood particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blood rounded-full animate-ping duration-1000" />
        <div className="absolute top-2/3 left-3/4 w-3 h-3 bg-blood rounded-full animate-ping duration-700" />
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-gold rounded-full animate-ping duration-1500" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 max-w-2xl"
      >
        <span className="text-xs font-mono tracking-[0.4em] text-red-500 uppercase block mb-4 animate-pulse">
          ⚠️ WARNING: ENTRY LEVEL MAXIMUM SANITY HAZARD ⚠️
        </span>
        
        <h1 className="text-5xl md:text-7xl font-black text-blood tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(139,0,0,0.9)] mb-6 font-mono">
          Elite Cursed <br />
          <span className="text-gold text-4xl md:text-6xl drop-shadow-[0_0_15px_rgba(212,175,55,0.7)]">Commerce</span>
        </h1>

        <p className="text-cream/70 text-lg md:text-xl font-mono leading-relaxed mb-12 max-w-xl mx-auto border-l-4 border-blood pl-4">
          You have wandered into the dark web's most forbidden marketplace. The products here carry curses that science cannot explain. Are you ready to trade your sanity for premium goods?
        </p>

        {/* Cursed Rules */}
        <div className="bg-black/60 border border-blood/30 p-6 rounded-lg mb-12 text-left font-mono text-sm max-w-md mx-auto shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <h3 className="text-gold font-bold mb-3 border-b border-gold/20 pb-1 uppercase tracking-wider">📜 Terms of Eternal Bondage</h3>
          <ul className="space-y-2 text-cream/60">
            <li className="flex gap-2">
              <span className="text-blood">I.</span> <span>All sales are absolutely final. We do not accept returns from other planes of existence.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blood">II.</span> <span>Your soul is held as collateral until payment is cleared by the Underworld Bank.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blood">III.</span> <span>Before signing up, you will remain trapped in this store forever. You cannot log out.</span>
            </li>
          </ul>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05, shadow: "0 0 25px #8B0000" }}
            whileTap={{ scale: 0.95 }}
            onClick={onSignUp}
            className="w-full sm:w-auto px-8 py-4 bg-blood text-cream font-bold rounded-lg border-2 border-red-500 shadow-[0_0_15px_rgba(139,0,0,0.5)] hover:bg-red-950 transition-colors uppercase tracking-widest text-sm"
          >
            ✍️ Sign Up & Pledge Soul
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnterAsGuest}
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-cream/50 hover:text-cream border border-cream/20 hover:border-cream rounded-lg transition-colors font-mono uppercase tracking-widest text-xs"
          >
            Enter as Mortal Guest
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
