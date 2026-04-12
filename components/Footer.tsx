import { useEffect, useRef } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { ArrowUpRight, Twitter, Linkedin, Github, Dribbble } from "lucide-react";

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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

    // Marquee Animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  const socials = [
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Dribbble, label: "Dribbble" },
    { icon: Github, label: "GitHub" },
  ];

  return (
    <footer className="relative bg-bg pt-24 md:pt-32 pb-12 overflow-hidden">
      {/* Background Video (Flipped) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="border-y border-white/10 py-8 md:py-12 mb-24 overflow-hidden whitespace-nowrap">
          <div ref={marqueeRef} className="inline-block">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-6xl md:text-8xl lg:text-9xl font-display italic text-text-primary/20 uppercase tracking-tighter mx-8">
                CRAFTING DIGITAL EXPERIENCES •
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center mb-32">
          <h2 className="text-5xl md:text-8xl font-display text-text-primary mb-12">
            Have a project <span className="italic">in mind?</span>
          </h2>
          
          <a
            href="mailto:donpetro281@gmail.com"
            className="group relative inline-flex items-center gap-4 rounded-full px-10 py-5 bg-surface border border-stroke hover:border-transparent transition-all duration-300"
          >
            <span className="absolute -inset-[1px] accent-gradient opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 -z-10" />
            <span className="text-xl md:text-2xl font-medium">donpetro281@gmail.com</span>
            <div className="w-10 h-10 rounded-full bg-text-primary text-bg flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </a>
        </div>

        {/* Footer Bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-stroke">
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                className="text-muted hover:text-text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <span className="text-xs text-muted uppercase tracking-widest">Available for projects</span>
          </div>

          <span className="text-xs text-muted">
            © 2026 SAVASTANO. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
