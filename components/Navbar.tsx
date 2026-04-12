import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Work"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300",
          isScrolled && "shadow-md shadow-black/10"
        )}
      >
        {/* Logo */}
        <div className="group relative w-9 h-9 flex items-center justify-center rounded-full overflow-hidden cursor-pointer">
          <div className="absolute inset-0 accent-gradient animate-gradient-shift group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-[2px] bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">SV</span>
          </div>
        </div>

        <div className="hidden md:block w-px h-5 bg-stroke mx-2" />

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={cn(
                "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200",
                link === "Home" 
                  ? "text-text-primary bg-stroke/50" 
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
              )}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-2" />

        {/* Say Hi Button */}
        <a 
          href="mailto:donpetro281@gmail.com"
          className="group relative inline-flex items-center gap-1 text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary overflow-hidden"
        >
          <span className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-1">
            Say hi <ArrowUpRight className="w-3 h-3" />
          </span>
        </a>
      </motion.div>
    </nav>
  );
}
