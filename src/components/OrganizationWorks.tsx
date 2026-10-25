import { motion } from "motion/react";
import { Briefcase, GitBranch, PresentationChart } from "@phosphor-icons/react";
import SectionHeader from "@/components/SectionHeader";
import { inView, reveal, tint, type SystemColor } from "@/lib/motion";

const organizations: { name: string; role: string; description: string; icon: typeof Briefcase; tint: SystemColor }[] = [
  {
    name: "Big Data & AI Workshop",
    role: "Organizing Committee",
    description: "Organized the International Workshop on Big Data and AI Applications (2023), coordinating technical sessions and facilitating knowledge exchange among researchers and practitioners.",
    icon: PresentationChart,
    tint: "orange",
  },
  {
    name: "Open Source Contributor",
    role: "AI/ML Developer",
    description: "Contributing to open-source AI projects and sharing implementations of RAG systems, LLM applications, and data engineering solutions on GitHub.",
    icon: GitBranch,
    tint: "indigo",
  },
  {
    name: "Freelance AI Consultant",
    role: "Technical Advisor",
    description: "Delivering AI-powered solutions for manufacturing and quality management, helping organizations implement intelligent automation and data-driven decision systems.",
    icon: Briefcase,
    tint: "green",
  },
];

const OrganizationWorks = () => {
  return (
    <section id="organization" className="py-24 md:py-32">
      <div className="container">
        <SectionHeader title="Beyond the Code" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {organizations.map((org, index) => (
            <motion.div
              key={org.name}
              variants={reveal}
              {...inView}
              custom={index}
              style={tint(org.tint)}
              className="relative isolate overflow-hidden rounded-tile bg-surface p-8"
            >
              <div className="tile-glow" aria-hidden="true" />
              <span className="icon-badge">
                <org.icon size={24} weight="fill" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-title">{org.name}</h3>
              <p className="mt-1 text-[15px] text-muted-foreground">{org.role}</p>
              <p className="mt-4 text-muted-foreground">{org.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationWorks;
