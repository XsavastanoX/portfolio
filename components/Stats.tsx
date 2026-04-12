import { motion } from "motion/react";

const stats = [
  { label: "Years Experience", value: "20+" },
  { label: "Projects Done", value: "95+" },
  { label: "Satisfied Clients", value: "200%" },
];

export default function Stats() {
  return (
    <section className="bg-bg py-24 md:py-32 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-6xl md:text-7xl lg:text-8xl font-display text-text-primary mb-4">
                {stat.value}
              </span>
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
