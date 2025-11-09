import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Code, Zap, Shield, Rocket, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Advanced neural networks and deep learning solutions",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Modern web applications with React, TypeScript, and Node.js",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast applications with optimal user experience",
  },
  {
    icon: Shield,
    title: "Secure Solutions",
    description: "Enterprise-grade security and data protection",
  },
  {
    icon: Rocket,
    title: "Scalable Architecture",
    description: "Systems designed to grow with your business",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Robust data pipelines and analytics infrastructure",
  },
];

const Features = () => {
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
            { opacity: 0, scale: 0.8, y: 50 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "back.out(1.7)",
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
      id="features"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="grid-bg absolute inset-0 opacity-10" />
      
      <div className="container relative z-10 mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl lg:text-6xl font-bold text-center mb-16 glow-text"
        >
          Features & Expertise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer"
            >
              <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 inline-block group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
