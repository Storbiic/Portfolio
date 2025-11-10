import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 1.2,
              delay: index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="grid-bg absolute inset-0 opacity-10" />
      
      <div className="container relative z-10 mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl lg:text-6xl font-bold text-center mb-16 glow-text"
        >
          Experience
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-semibold text-lg">{exp.company}</p>
                    {exp.location && (
                      <p className="text-muted-foreground text-base font-medium">{exp.location}</p>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {exp.project && (
                    <div className="pt-2">
                      <h4 className="text-xl font-bold text-foreground/90 mb-2">
                        {exp.project}
                      </h4>
                    </div>
                  )}

                  <p className="text-foreground/80 leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3">
                      {exp.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
