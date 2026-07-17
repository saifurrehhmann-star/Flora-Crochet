import { useState, useEffect } from 'react';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ANNOUNCEMENTS = [
  { text: "✨ 10% OFF on your first purchase! Use coupon code: CROCHETLOVE", icon: Sparkles },
  { text: "🌸 Free shipping on all orders over Rs. 1500! 🌸", icon: Heart },
  { text: "🎁 Need custom sizing? Design yours now with our Custom Order System!", icon: Gift }
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = ANNOUNCEMENTS[index].icon;

  return (
    <div className="bg-[#bc4747] text-[#ffeef2] text-xs font-medium py-2 px-4 shadow-inner relative overflow-hidden" id="announcement-bar">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center text-center gap-1.5"
          >
            <CurrentIcon className="w-3.5 h-3.5 text-pastel-yellow" />
            <span>{ANNOUNCEMENTS[index].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
