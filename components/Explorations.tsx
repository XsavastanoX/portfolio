import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { Dribbble } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const explorations = [
  { id: 1, image: "/images/playground1.png", rotation: -5 },
  { id: 2, image: "/images/playground2.png", rotation: 8 },
  { id: 3, image: "/images/playground3.png", rotation: -3 },
  { id: 4, image: "/images/playground4.png", rotation: 6 },
  { id: 5, image: "/images/pic9.jpeg", rotation: -7 },
  { id: 6, image: "/images/pic10.jpeg", rotation: 4 },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinnedRef.current) return;

    // Pin the center content
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: pinnedRef.current,
      pinSpacing: false,
    });

    // Parallax movement for columns
    gsap.to(column1Ref.current, {
      y: -300,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.to(column2Ref.current, {
      y: 300,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      {/* Layer 1: Pinned Center - Higher Z-Index */}
      <div ref={pinnedRef} className="sticky top-0 h-screen w-full flex items-center justify-center z-20 pointer-events-none">
        <div className="text-center max-w-2xl px-6 pointer-events-auto">
          <span className="text-xs text-muted uppercase tracking-[0.3em] mb-6 block">Explorations</span>
          <h2 className="text-5xl md:text-7xl font-display text-text-primary mb-8">
            Creative <span className="italic">Lab</span>
          </h2>
          <p className="text-muted text-sm md:text-base mb-10">
            Side projects, visual studies, and creative prototypes—where boundaries get pushed and new ideas take shape.
          </p>
        </div>
      </div>

      {/* Layer 2: Parallax Columns - Lower Z-Index */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-20 pt-[20vh] pb-[20vh]">
        <div className="grid grid-cols-2 gap-12 md:gap-40">
          {/* Column 1 */}
          <div ref={column1Ref} className="flex flex-col gap-24 md:gap-40">
            {explorations.filter((_, i) => i % 2 === 0).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05, rotate: item.rotation * 1.5 }}
                className="aspect-square w-full max-w-[320px] bg-surface rounded-2xl overflow-hidden border border-stroke cursor-pointer shadow-2xl"
                style={{ rotate: item.rotation }}
              >
                <img
                  src={item.image}
                  alt={`Exploration ${item.id}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={column2Ref} className="flex flex-col gap-24 md:gap-40 pt-[40vh]">
            {explorations.filter((_, i) => i % 2 !== 0).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05, rotate: item.rotation * 1.5 }}
                className="aspect-square w-full max-w-[320px] bg-surface rounded-2xl overflow-hidden border border-stroke cursor-pointer shadow-2xl"
                style={{ rotate: item.rotation }}
              >
                <img
                  src={item.image}
                  alt={`Exploration ${item.id}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
