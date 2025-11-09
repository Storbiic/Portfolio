import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Senior AI Engineer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: "Leading AI/ML projects, developing cutting-edge solutions using deep learning and NLP.",
  },
  {
    title: "Data Scientist",
    company: "DataVerse Solutions",
    period: "2020 - 2022",
    description: "Built predictive models and data pipelines for large-scale analytics.",
  },
  {
    title: "Machine Learning Engineer",
    company: "AI StartUp",
    period: "2018 - 2020",
    description: "Developed computer vision models and deployed ML systems in production.",
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
          duration: 1,
          ease: "power3.out",
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
              duration: 0.8,
              delay: index * 0.2,
              ease: "power3.out",
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
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">
                    {exp.description}
                  </p>
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
