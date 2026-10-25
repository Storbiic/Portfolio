import { motion } from "motion/react";
import { Brain, BracketsCurly, ChartBar, Database, Robot, RocketLaunch } from "@phosphor-icons/react";
import SectionHeader from "@/components/SectionHeader";
import { inView, reveal, tint, type SystemColor } from "@/lib/motion";

const features: { icon: typeof Brain; title: string; description: string; tint: SystemColor }[] = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "LLM fine-tuning, RAG systems, and deep learning solutions for document extraction and intelligent automation",
    tint: "purple",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Robust ETL pipelines, data automation, and analytics infrastructure with cloud integration",
    tint: "blue",
  },
  {
    icon: Robot,
    title: "AI-Powered Applications",
    description: "Production-ready chatbots, document extraction systems, and intelligent assistants using LangChain and vector databases",
    tint: "pink",
  },
  {
    icon: BracketsCurly,
    title: "Backend Development",
    description: "Scalable microservices with .NET Core, FastAPI, and cloud deployment on Azure and GCP",
    tint: "indigo",
  },
  {
    icon: ChartBar,
    title: "Business Intelligence",
    description: "Advanced analytics, KPI dashboards, and automated reporting with Power BI and SQL optimization",
    tint: "orange",
  },
  {
    icon: RocketLaunch,
    title: "MLOps & Deployment",
    description: "Model deployment, Docker containerization, and end-to-end ML pipeline management with Azure AI",
    tint: "teal",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container">
        <SectionHeader id="features" eyebrow="Capabilities" title="What I Do" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={reveal}
              {...inView}
              custom={index % 3}
              style={tint(feature.tint)}
              className="relative isolate overflow-hidden rounded-tile bg-surface p-8"
            >
              <div className="tile-glow" aria-hidden="true" />
              <span className="icon-badge">
                <feature.icon size={24} weight="fill" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-title">{feature.title}</h3>
              <p className="mt-3 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
