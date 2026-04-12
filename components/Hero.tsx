import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";

const roles = ["Creative", "Fullstack", "Founder", "Scholar"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsUrl = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
    const localUrl = "/videos/background.mp4";

    // Try local video first, then HLS
    fetch(localUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          video.src = localUrl;
        } else {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(hlsUrl);
            hls.attachMedia(video);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = hlsUrl;
          }
        }
      })
      .catch(() => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(hlsUrl);
          hls.attachMedia(video);
        }
      });

    // GSAP Entrance
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".name-reveal", { opacity: 1, y: 0, duration: 1.2, delay: 0.1 })
      .to(".blur-in", { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 }, "-=0.8");

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <span className="blur-in inline-block text-xs text-muted uppercase tracking-[0.3em] mb-8">
          FEATURED '26
        </span>
        
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          SAVASTANO
        </h1>

        <div className="blur-in text-lg md:text-2xl text-text-primary/90 mb-6">
          A{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="font-display italic text-text-primary inline-block"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
          {" "}lives in Algeria.
        </div>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12">
          Crafting fluid digital experiences by obsessing over the micro-details that make interfaces feel inevitable.
        </p>

        <div className="blur-in flex flex-wrap justify-center gap-4">
          <button className="group relative rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg border-2 border-transparent hover:bg-bg hover:text-text-primary hover:border-text-primary hover:scale-105 transition-all duration-300">
            See Works
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
