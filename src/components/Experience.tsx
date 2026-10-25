import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import SectionHeader from "@/components/SectionHeader";
import { inView, reveal, spring } from "@/lib/motion";

// Dots step along the rail's gradient, top to bottom
const dotColors = ["bg-system-blue", "bg-system-indigo", "bg-system-purple", "bg-system-pink"];

const experiences = [
  {
    title: "Data Scientist & AI Engineer (Freelance)",
    company: "Yazaki Morocco",
    location: "Kenitra, Morocco",
    period: "August 2025 - Present",
    project: "AI-Powered Supplier Quality Assistant",
    description: "Engineered an intelligent RAG-based chatbot that revolutionized supplier-quality team communication by providing instant, accurate responses to quality standards inquiries. The system empowers suppliers to independently access critical quality information while significantly enhancing ASQE productivity by reducing repetitive inquiries by 70%.",
    techStack: ["Python", "LangChain", "Ollama", "FAISS", "FastAPI", "MongoDB", "Gradio"],
  },
  {
    title: "Data Analyst (Freelance)",
    company: "Yazaki Morocco",
    location: "Kenitra, Morocco",
    period: "May 2025 - July 2025",
    project: "Automated BOM Management & ETL Pipeline",
    description: "Transformed a manual, time-intensive Excel workflow into an automated data pipeline that reduced processing time from 2 hours to under 20 minutes—an 83% efficiency gain. Developed a full-stack ETL web application with cloud integration for real-time Power BI dashboards.",
    techStack: ["Python", "FastAPI", "Power BI", "SQL", "SharePoint", "GCP"],
  },
  {
    title: "Data Scientist & AI Engineer",
    company: "Revartis",
    location: "Marrakech, Morocco",
    period: "February 2024 - March 2025",
    project: "AI Document Extraction & Intelligent Chatbots",
    description: "Led the development of enterprise-grade AI solutions for automated document processing, achieving a 60% boost in extraction accuracy. Designed and deployed custom table extraction models and conversational AI systems using state-of-the-art LLMs with scalable microservices architecture.",
    techStack: ["Python", "PyTorch", "Hugging Face", "LangChain", "Azure AI", "Docker", ".NET Core"],
  },
  {
    title: "Data Scientist",
    company: "Customs Administration & Indirect Taxes",
    location: "Rabat, Morocco",
    period: "April 2023 - December 2023",
    project: "Customs Fraud Detection System",
    description: "Developed machine learning models for automated fraud detection in customs operations, achieving 85% accuracy. Implemented end-to-end ETL pipelines with automated data preprocessing and built SQL databases optimized for model training.",
    techStack: ["Python", "TensorFlow", "ETL", "SQL Server", "Power BI", "Cognos"],
  },
];

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // The rail fills as the timeline passes the lower third of the viewport, where the dots light up
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.7", "end 0.7"] });

  return (
    <section id="experience" className="bg-surface py-24 md:py-32">
      <div className="container">
        <SectionHeader id="experience" eyebrow="Career" title="Work Experience" />

        {/* A timeline of roles: when and where on the left, what was built on the right */}
        <div ref={timelineRef} className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-px bg-border">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-system-blue via-system-purple to-system-pink"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <ol>
            {experiences.map((exp, index) => (
              <motion.li
                key={index}
                variants={reveal}
                {...inView}
                className="relative ml-8 grid gap-4 border-t py-10 md:ml-12 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-12"
              >
                {/* Lit while the role is above the lower third, matching the rail's fill */}
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-[45px] h-[11px] w-[11px] rounded-full border-2 border-border bg-surface md:-left-12"
                >
                  <motion.span
                    className={`absolute -inset-0.5 rounded-full ${dotColors[index % dotColors.length]}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ margin: "0px 0px -30% 0px" }}
                    transition={spring.snappy}
                  />
                </span>

                <div className="space-y-1">
                  <p className="text-[15px] font-semibold">{exp.company}</p>
                  {exp.location && <p className="text-[15px] text-muted-foreground">{exp.location}</p>}
                  <p className="pt-1 font-mono text-[12px] uppercase tracking-[0.04em] text-muted-foreground">{exp.period}</p>
                </div>

                <div className="min-w-0 space-y-3">
                  <h3 className="text-title">{exp.title}</h3>
                  {exp.project && <p className="font-medium text-link">{exp.project}</p>}
                  <p className="max-w-[65ch] text-muted-foreground">{exp.description}</p>

                  {exp.techStack && exp.techStack.length > 0 && (
                    <ul className="flex flex-wrap gap-2 pt-2" aria-label="Tech stack">
                      {exp.techStack.map((tech) => (
                        <li key={tech} className="rounded-full bg-card px-3 py-1 text-[13px] text-foreground/80">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
