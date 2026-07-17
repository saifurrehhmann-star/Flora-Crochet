import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashPreloaderProps {
  onComplete: () => void;
}

export default function SplashPreloader({ onComplete }: SplashPreloaderProps) {
  const [loadingText, setLoadingText] = useState('Spinning yarn...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Elegant loading text sequence
    const textSequence = [
      'Spinning pastel yarn...',
      'Counting double-knots...',
      'Threading crochet hooks...',
      'Adding handmade magic...',
      'Yarnova is ready! ✨'
    ];

    let currentTextIndex = 0;
    const textInterval = setInterval(() => {
      if (currentTextIndex < textSequence.length - 1) {
        currentTextIndex++;
        setLoadingText(textSequence[currentTextIndex]);
      }
    }, 500);

    // Dynamic progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 22);

    // Auto complete after 2.6s
    const timeout = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  // Brand Name Split for Letter Animation
  const brandName = "Yarnova";
  const letterVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.15 + i * 0.08,
        type: "spring",
        stiffness: 150,
        damping: 12
      }
    })
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fdfbf7] select-none">
      {/* Soft Background Warm Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-50/60 rounded-full filter blur-3xl opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pastel-pink/50 rounded-full filter blur-3xl opacity-60 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="relative flex flex-col items-center text-center max-w-sm px-6">
        
        {/* Cute Animated Yarn Ball / Crochet Vector Logo */}
        <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
          {/* Outer Ripple Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-brand-100"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.3, 1.5], opacity: [0.4, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-brand-200"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1.4], opacity: [0.5, 0.3, 0] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: "easeOut" }}
          />

          {/* Interactive Core: Rolling/Spinning Yarn Ball & Hook */}
          <motion.div
            className="relative w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center shadow-md shadow-brand-100/40 border border-brand-100"
            animate={{ 
              rotate: 360,
              y: [0, -6, 0]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Custom SVG Yarn Lines */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-brand-400 absolute">
              {/* Wrapping thread loops */}
              <path 
                d="M 50 15 C 30 15, 15 30, 15 50 C 15 70, 30 85, 50 85 C 70 85, 85 70, 85 50 C 85 30, 70 15, 50 15 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeDasharray="4,4"
              />
              <path 
                d="M 25 35 C 40 20, 60 20, 75 35 C 70 50, 30 50, 25 35 Z" 
                fill="none" 
                stroke="#e68b8b" 
                strokeWidth="3" 
              />
              <path 
                d="M 30 65 C 35 45, 65 45, 70 65 C 55 80, 45 80, 30 65 Z" 
                fill="none" 
                stroke="#bc4747" 
                strokeWidth="2.5" 
              />
              <path 
                d="M 20 50 C 30 30, 70 70, 80 50" 
                fill="none" 
                stroke="#d46363" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />
            </svg>

            {/* Cute spinning center flower */}
            <motion.div
              className="text-2xl z-10"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              🌸
            </motion.div>

            {/* Animated Crochet Hook passing behind the yarn */}
            <motion.div 
              className="absolute text-2xl -top-3 -right-3 origin-bottom-left"
              animate={{ 
                rotate: [15, -10, 15],
                x: [0, -3, 0],
                y: [0, 3, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🥢
            </motion.div>
          </motion.div>
        </div>

        {/* Brand Logo Animation */}
        <div className="flex justify-center items-center gap-1.5 mb-2">
          <span className="text-2xl animate-pulse">🌸</span>
          <div className="flex overflow-hidden">
            {brandName.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl sm:text-4xl font-black font-display text-brand-500 tracking-tight"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Soft, whimsical subtitle */}
        <motion.p
          className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-extrabold"
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Handmade Magic
        </motion.p>

        {/* Loading status bar and text */}
        <div className="mt-12 w-48 space-y-3">
          <div className="relative h-1 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-50">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-brand-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-medium text-stone-500 italic font-sans"
            >
              {loadingText}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
