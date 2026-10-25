import { motion } from "motion/react";
import { Cloud, Code, Sparkle } from "@phosphor-icons/react";
import SectionHeader from "@/components/SectionHeader";
import { inView, pop, reveal, stagger, tint, type SystemColor } from "@/lib/motion";

const skillCategories: { title: string; icon: typeof Code; tint: SystemColor; skills: string[] }[] = [
  {
    title: "Programming Languages",
    icon: Code,
    tint: "blue",
    skills: ["Python", "SQL", "C/C++", "C#"],
  },
  {
    title: "Data & Cloud",
    icon: Cloud,
    tint: "teal",
    skills: ["SQL Server", "MongoDB", "Azure AI", "GCP", "Docker", "Power BI", "SharePoint"],
  },
  {
    title: "AI & ML",
    icon: Sparkle,
    tint: "purple",
    skills: ["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "FAISS", "LLMs", "RAG Systems", "Computer Vision"],
  },
];

const SkillSet = () => {
  return (
    <section id="skills" className="bg-surface py-24 md:py-32">
      <div className="container">
        <SectionHeader
          id="skills"
          eyebrow="Toolkit"
          title="Skill Set"
          lede="Expertise across programming, data engineering, cloud infrastructure, and AI/ML technologies"
        />

        {/* Laid out like a spec sheet: category on the left, its tools on the right */}
        <div className="border-b">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="grid gap-5 border-t py-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-12"
            >
              <motion.div variants={reveal} {...inView} className="flex items-center gap-3 md:items-start">
                <span className="icon-badge h-9 w-9 rounded-[0.625rem]" style={tint(category.tint)}>
                  <category.icon size={18} weight="fill" aria-hidden="true" />
                </span>
                <h3 className="text-title md:pt-1.5">{category.title}</h3>
              </motion.div>
              <motion.ul variants={stagger} {...inView} className="flex flex-wrap content-start gap-2">
                {category.skills.map((skill) => (
                  <motion.li key={skill} variants={pop} className="rounded-full bg-card px-4 py-2 text-[15px]">
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSet;
