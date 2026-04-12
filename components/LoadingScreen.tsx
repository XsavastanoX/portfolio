import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 2700;

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * 100);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(update);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12"
    >
      <div className="flex justify-between items-start">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs text-muted uppercase tracking-[0.3em]"
        >
          Portfolio
        </motion.span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex justify-end items-end">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
        </div>
        
        <div className="relative h-[3px] w-full bg-stroke/50 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 accent-gradient shadow-[0_0_8px_rgba(137,170,204,0.35)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
