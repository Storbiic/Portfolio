import { motion } from "motion/react";
import SectionHeader from "@/components/SectionHeader";
import CountUp from "@/components/motion/CountUp";
import ScrollHighlightText from "@/components/motion/ScrollHighlightText";
import { inView, reveal } from "@/lib/motion";

// Outcomes from the roles listed under Experience. Each figure gets its own pair of system
// colors, stepping along the same blue → pink run as the hero.
const highlights = [
  { value: 70, label: "fewer repetitive supplier inquiries with a RAG quality assistant", gradient: "from-system-blue to-system-indigo" },
  { value: 83, label: "faster BOM processing, from 2 hours to under 20 minutes", gradient: "from-system-indigo to-system-purple" },
  { value: 60, label: "higher accuracy in AI document extraction", gradient: "from-system-purple to-system-pink" },
  { value: 85, label: "accuracy detecting customs fraud with machine learning", gradient: "from-system-pink to-system-red" },
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-4xl">
          <SectionHeader id="about" eyebrow="Profile" title="About Me" className="" />
          <ScrollHighlightText
            className="mt-6 text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-[1.2] tracking-[-0.02em]"
            text="I'm a passionate Data Scientist and AI Engineer building intelligent systems that solve real-world problems. With expertise in machine learning, deep learning, and advanced analytics, I transform complex data into actionable insights."
          />
          <motion.p variants={reveal} {...inView} className="mt-6 max-w-2xl text-muted-foreground">
            My work focuses on creating scalable AI solutions, developing predictive
            models, and leveraging cutting-edge technologies to drive innovation and
            business growth.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              variants={reveal}
              {...inView}
              custom={index}
              className="rounded-tile bg-surface p-7"
            >
              <p className="text-[clamp(2.75rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                <CountUp
                  value={item.value}
                  suffix="%"
                  className={`bg-gradient-to-br bg-clip-text text-transparent contrast-more:bg-none contrast-more:text-foreground ${item.gradient}`}
                />
              </p>
              <p className="mt-3 text-[15px] leading-snug text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
