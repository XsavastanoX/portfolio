import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const projects = [
  {
    title: "Automotive Motion",
    category: "CGI / Motion",
    image: "/images/pic1.jpeg",
    span: "md:col-span-7",
  },
  {
    title: "Urban Architecture",
    category: "Design / 3D",
    image: "/images/pic2.jpeg",
    span: "md:col-span-5",
  },
  {
    title: "Human Perspective",
    category: "Photography",
    image: "/images/pic3.jpeg",
    span: "md:col-span-5",
  },
  {
    title: "Brand Identity",
    category: "Branding",
    image: "/images/pic4.jpeg",
    span: "md:col-span-7",
  },
];

export default function Works() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-6">
              Featured <span className="italic">Work</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              Handpicked work spanning strategy, design, and launch—where ideas become reality.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={cn(
                "group relative bg-surface border border-stroke rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[500px]",
                project.span
              )}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Halftone Overlay */}
              <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply pointer-events-none" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-bg/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8" />

              {/* Static Info (Mobile) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent md:hidden">
                <span className="text-[10px] text-white/60 uppercase tracking-widest mb-1 block">
                  {project.category}
                </span>
                <h3 className="text-xl font-display italic text-white">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
