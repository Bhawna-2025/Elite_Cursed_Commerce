import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ohGodVideo from '../assets/Oh_God_Ek_Baar_Dila_De_Meme_Video_Download.mp4';
import homelanderVideo from '../assets/Homelander_Sad_Meme_Download.mp4';
import ajayVideo from '../assets/Sad_Ajay_Devgan_Sad_Meme_Download.mp4';

let failVideoIndex = 0;
const failVideos = [homelanderVideo, ajayVideo];

export default function Gauntlet({ isOpen, onComplete, onCancel }) {
  const [step, setStep] = useState(0); 
  // 0: None
  // 1: Oh God Video
  // 2: Hard Math
  // 3: Fail Video
  // 4: Toddler Math

  const [inputValue, setInputValue] = useState('');
  
  // Math states
  const [hardEq, setHardEq] = useState({ text: '', answer: '' });
  const [easyEq, setEasyEq] = useState({ text: '', answer: '' });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      
      // Generate random hard math (Ax - B = C or Ax + B = C)
      const A = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const B = Math.floor(Math.random() * 20) + 1; // 1 to 20
      const x = Math.floor(Math.random() * 15) + 5; // 5 to 19
      const isMinus = Math.random() > 0.5;
      const C = isMinus ? (A * x) - B : (A * x) + B;
      setHardEq({
        text: `${A}x ${isMinus ? '-' : '+'} ${B} = ${C}`,
        answer: x.toString()
      });
      
      // Generate random easy math (A + B = ?)
      const easyA = Math.floor(Math.random() * 10);
      const easyB = Math.floor(Math.random() * 10);
      setEasyEq({
        text: `${easyA} + ${easyB} = ?`,
        answer: (easyA + easyB).toString()
      });

    } else {
      setStep(0);
      setInputValue('');
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (step === 1) {
      timer = setTimeout(() => setStep(2), 4000);
    } else if (step === 3) {
      timer = setTimeout(() => {
        setStep(4);
        failVideoIndex = (failVideoIndex + 1) % failVideos.length;
      }, 4000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [step]);

  const handleMathSubmit = (e) => {
    e.preventDefault();
    if (step === 2) {
      if (inputValue === hardEq.answer) {
        onComplete();
      } else {
        setStep(3); // Start fail video sequence
        setInputValue('');
      }
    } else if (step === 4) {
      if (inputValue === easyEq.answer) {
        onComplete();
      } else {
        onCancel();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="video1"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-[65vw] h-[65vh] max-w-2xl max-h-[60vh] flex items-center justify-center bg-black rounded-xl overflow-hidden relative border border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          >
            <video 
              src={ohGodVideo} 
              autoPlay 
              className="w-full h-full object-cover scale-[1.12] origin-center"
            />
            {/* Cinematic black bars to hide top and bottom watermarks without excessive cropping */}
            <div className="absolute top-0 left-0 right-0 h-[7%] bg-black z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-[7%] bg-black z-10" />
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            key="hard-math"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-background border-4 border-blood p-8 rounded-2xl shadow-[0_0_50px_rgba(255,77,77,0.5)] max-w-md w-full"
          >
            <h2 className="text-3xl font-bold text-glow mb-4">Prove you are human</h2>
            <p className="text-cream mb-6 text-xl">Solve for x: <br/><span className="font-mono text-3xl">{hardEq.text}</span></p>
            <form onSubmit={handleMathSubmit} className="flex flex-col gap-4">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-black border border-gold p-3 text-white font-mono text-xl"
                autoFocus
              />
              <button type="submit" className="bg-gold text-black font-bold py-3 hover:bg-white">Verify</button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="video-fail"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="w-[65vw] h-[65vh] max-w-2xl max-h-[60vh] flex items-center justify-center bg-black rounded-xl overflow-hidden relative border border-blood/30 shadow-[0_0_30px_rgba(139,0,0,0.3)]"
          >
            <video 
              src={failVideos[failVideoIndex]} 
              autoPlay 
              className="w-full h-full object-cover scale-[1.12] origin-center"
            />
            {/* Cinematic black bars to hide top and bottom watermarks without excessive cropping */}
            <div className="absolute top-0 left-0 right-0 h-[7%] bg-black z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-[7%] bg-black z-10" />
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="easy-math"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-pink-300 border-4 border-yellow-400 p-8 rounded-3xl max-w-sm w-full"
          >
            <h2 className="text-4xl font-comic text-blue-600 mb-4">Oopsie! Let's try an easier one! 🍼</h2>
            <p className="text-black mb-6 text-3xl font-bold">{easyEq.text}</p>
            <form onSubmit={handleMathSubmit} className="flex flex-col gap-4">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-white border-4 border-blue-400 p-4 text-black text-2xl rounded-xl"
                autoFocus
              />
              <button type="submit" className="bg-green-500 text-white font-bold py-4 rounded-xl text-xl hover:bg-green-400 border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all">I did it!</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
