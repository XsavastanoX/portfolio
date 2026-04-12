import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";

const entries = [
  {
    title: "The Future of Digital Interaction",
    image: "/images/pic5.jpeg",
    content: "The future of digital interaction is not just about screens, but about seamless integration into our daily lives. We are moving towards a world where technology feels invisible yet indispensable, focusing on natural interfaces and intuitive feedback loops that respect human psychology.",
  },
  {
    title: "The Power of Less: Minimalism in Modern Design",
    image: "/images/pic6.jpeg",
    content: "Minimalism is more than just white space; it's about intentionality. By removing the non-essential, we allow the core message and functionality to shine. Modern minimalism focuses on high-quality typography, purposeful motion, and a reduced cognitive load for the user.",
  },
  {
    title: "Motion as Strategy: Why Movement Drives User Experience",
    image: "/images/pic7.jpeg",
    content: "Motion is a language that guides users through a digital experience. It provides context, reinforces hierarchy, and gives feedback. When used correctly, motion makes an interface feel alive and responsive, bridging the gap between static pixels and dynamic interaction.",
  },
  {
    title: "Design Systems That Scale",
    image: "/images/pic8.jpeg",
    content: "A scalable design system is the foundation of any successful product. It ensures consistency across platforms and accelerates development. By defining a clear set of components, tokens, and guidelines, teams can focus on solving user problems rather than reinventing the wheel.",
  },
];

export default function Journal() {
  const [selectedEntry, setSelectedEntry] = useState<typeof entries[0] | null>(null);

  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-6">
              Latest <span className="italic">Thinking</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              Explorations on design, engineering, and the craft of building digital experiences.
            </p>
          </div>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedEntry(entry)}
              className="group flex flex-col sm:flex-row items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-stroke">
                <img
                  src={entry.image}
                  alt={entry.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-medium text-text-primary group-hover:text-accent transition-colors">
                  {entry.title}
                </h3>
              </div>

              <div className="hidden sm:flex w-12 h-12 rounded-full border border-stroke items-center justify-center group-hover:bg-text-primary group-hover:text-bg transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEntry(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-3xl md:text-4xl font-display italic text-text-primary">
                    {selectedEntry.title}
                  </h3>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="p-2 hover:bg-stroke rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-stroke">
                  <img
                    src={selectedEntry.image}
                    alt={selectedEntry.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-muted leading-relaxed text-lg">
                  {selectedEntry.content}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
