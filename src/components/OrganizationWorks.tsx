import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Users, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const organizations = [
  {
    name: "AI Research Lab",
    role: "Research Contributor",
    description: "Contributing to open-source AI research and publishing papers on neural architectures.",
    icon: Building2,
  },
  {
    name: "Tech Community",
    role: "Speaker & Mentor",
    description: "Speaking at conferences and mentoring aspiring data scientists and developers.",
    icon: Users,
  },
  {
    name: "Innovation Hub",
    role: "Consultant",
    description: "Advising startups on AI/ML strategy and technical implementation.",
    icon: Award,
  },
];

const OrganizationWorks = () => {
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
            { opacity: 0, y: 80, rotateX: -15 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
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
      id="organization"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="grid-bg absolute inset-0 opacity-10" />
      
      <div className="container relative z-10 mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl lg:text-6xl font-bold text-center mb-16 glow-text"
        >
          Organization Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {organizations.map((org, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center group"
            >
              <div className="mb-6 inline-block p-5 rounded-2xl bg-primary/10 border border-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <org.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {org.name}
              </h3>
              <p className="text-primary font-medium mb-4">{org.role}</p>
              <p className="text-foreground/70 leading-relaxed">
                {org.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationWorks;
