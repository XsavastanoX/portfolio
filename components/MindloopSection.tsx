import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function MindloopSection() {
  return (
    <div className="bg-ml-background text-ml-foreground font-body overflow-hidden">
      <Hero />
      <SearchChanged />
      <Mission />
      <Solution />
      <CTA />
    </div>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-ml-background to-transparent z-[2]" />

      <div className="relative z-10 pt-20 md:pt-32 max-w-5xl mx-auto">
        <motion.h1 
          {...fadeUp(0.2)}
          className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-[-1px] md:tracking-[-2px] mb-8 leading-[1.1]"
        >
          Stay in the <span className="font-display italic font-normal">Loop</span>
        </motion.h1>

        <motion.p 
          {...fadeUp(0.4)}
          className="text-base md:text-xl text-ml-hero-subtitle max-w-2xl mx-auto mb-12 px-4"
        >
          Curated insights on technology, design, and building with purpose—delivered when it matters.
        </motion.p>
      </div>
    </section>
  );
}

function SearchChanged() {
  const platforms = [
    { name: "ChatGPT", desc: "AI that truly understands context and conversation.", icon: "/images/mindloop/icon-chatgpt.png" },
    { name: "Perplexity", desc: "Direct answers, zero fluff—search that gets to the point.", icon: "/images/mindloop/icon-perplexity.png" },
    { name: "Google AI", desc: "The next era of discovery and intelligent search.", icon: "/images/mindloop/icon-google.png" },
  ];

  return (
    <section className="pt-52 md:pt-64 pb-24 md:pb-32 px-6 max-w-[1400px] mx-auto text-center">
      <motion.h2 
        {...fadeUp(0.2)}
        className="text-5xl md:text-7xl lg:text-8xl mb-12"
      >
        Search has <span className="font-display italic">changed.</span> Have you?
      </motion.h2>
      <motion.p 
        {...fadeUp(0.4)}
        className="text-ml-muted-foreground text-lg max-w-2xl mx-auto mb-24"
      >
        Information is evolving. Mindloop helps you cut through the noise with curated insights and meaningful deep dives.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20">
        {platforms.map((p, i) => (
          <motion.div 
            key={p.name} 
            {...fadeUp(0.6 + i * 0.1)}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 mb-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
              <img src={p.icon} alt={p.name} className="w-full h-full object-contain rounded-2xl" referrerPolicy="no-referrer" />
            </div>
            <h3 className="font-semibold text-base mb-2">{p.name}</h3>
            <p className="text-ml-muted-foreground text-sm max-w-[200px]">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p {...fadeUp(1)} className="text-ml-muted-foreground text-sm">
        Answer the moment, or someone else will.
      </motion.p>
    </section>
  );
}

function Mission() {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const text1 = "We’re building a space where curiosity meets clarity. Where readers discover depth, writers find their audience, and every piece of content sparks a conversation worth having.";
  const text2 = "A seamless space where content, community, and insight converge—with less noise, less friction, and more meaning for everyone.";

  const words1 = text1.split(" ");
  const words2 = text2.split(" ");

  return (
    <section ref={containerRef} className="pb-32 md:pb-44 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full max-w-2xl aspect-square mb-24 overflow-hidden rounded-full border border-ml-border">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
          />
        </div>

        <div className="text-center">
          <p className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] leading-tight mb-12">
            {words1.map((word, i) => {
              const start = i / words1.length;
              const end = (i + 1) / words1.length;
              const opacity = useTransform(scrollYProgress, [start * 0.5, end * 0.5], [0.15, 1]);
              const color = ["curiosity", "meets", "clarity"].includes(word.replace(/[—,.]/g, "")) 
                ? "text-ml-foreground" 
                : "text-ml-hero-subtitle";
              
              return (
                <motion.span key={i} style={{ opacity }} className={cn("inline-block mr-[0.2em]", color)}>
                  {word}
                </motion.span>
              );
            })}
          </p>

          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-ml-hero-subtitle leading-relaxed">
            {words2.map((word, i) => {
              const start = 0.5 + (i / words2.length) * 0.5;
              const end = 0.5 + ((i + 1) / words2.length) * 0.5;
              const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
              
              return (
                <motion.span key={i} style={{ opacity }} className="inline-block mr-[0.2em]">
                  {word}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const features = [
    { title: "Curated For You", desc: "Quality over quantity—content selected for relevance, depth, and impact." },
    { title: "Tools for Creators", desc: "Everything you need to write, publish, and connect with the audience that matters." },
    { title: "Community", desc: "Connect with thinkers, makers, and curious minds who care about the same things you do." },
    { title: "Smart Distribution", desc: "Meet your readers where they are—seamless reach across every platform." },
  ];

  return (
    <section className="py-32 md:py-44 px-6 border-t border-ml-border/30">
      <div className="max-w-[1400px] mx-auto">
        <motion.span {...fadeUp(0.2)} className="text-xs tracking-[3px] uppercase text-ml-muted-foreground mb-8 block">
          THE SOLUTION
        </motion.span>
        <motion.h2 {...fadeUp(0.4)} className="text-4xl md:text-6xl mb-16">
          Where <span className="font-display italic">Meaningful</span> Content Lives
        </motion.h2>

        <motion.div {...fadeUp(0.6)} className="w-full aspect-[3/1] rounded-2xl overflow-hidden mb-24 border border-ml-border">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
          />
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fadeUp(0.8 + i * 0.1)}>
              <h3 className="font-semibold text-base mb-4">{f.title}</h3>
              <p className="text-ml-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsUrl = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
    }
  }, []);

  return (
    <section className="relative py-32 md:py-44 px-6 border-t border-ml-border/30 overflow-hidden flex flex-col items-center justify-center text-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      />
      <div className="absolute inset-0 bg-ml-background/45 z-[1]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-10 h-10 border-2 border-ml-foreground/60 rounded-full flex items-center justify-center mb-8">
          <div className="w-5 h-5 border border-ml-foreground/60 rounded-full" />
        </div>

        <h2 className="text-5xl md:text-7xl font-display italic text-ml-foreground mb-8">
          Get Started
        </h2>
        <p className="text-ml-muted-foreground text-lg max-w-xl mb-12">
          Join Mindloop today and discover content that actually matters.
        </p>
      </div>
    </section>
  );
}
