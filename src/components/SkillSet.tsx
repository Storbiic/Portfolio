import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Database,
  Cloud,
  Server,
  Container,
  FileCode,
  Brain,
  Bot,
  Network,
  Sparkles,
  TrendingUp,
  Cpu,
  FileJson,
  Braces,
  Terminal,
  Package,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: Code2 },
      { name: "JavaScript", icon: FileJson },
      { name: "TypeScript", icon: Braces },
      { name: "Java", icon: Terminal },
      { name: "C++", icon: Code2 },
      { name: "R", icon: FileCode },
    ],
  },
  {
    title: "Data & Cloud",
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "AWS", icon: Cloud },
      { name: "Docker", icon: Container },
      { name: "Kubernetes", icon: Server },
      { name: "MongoDB", icon: Database },
      { name: "Apache Spark", icon: Package },
    ],
  },
  {
    title: "AI & ML",
    skills: [
      { name: "TensorFlow", icon: Brain },
      { name: "PyTorch", icon: Bot },
      { name: "Scikit-learn", icon: Network },
      { name: "Neural Networks", icon: Sparkles },
      { name: "Deep Learning", icon: TrendingUp },
      { name: "Computer Vision", icon: Cpu },
    ],
  },
];

const SkillSet = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

      gsap.fromTo(
        ".skill-category",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skill-category",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".skill-icon-card",
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          duration: 1,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: ".skill-icon-card",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="grid-bg absolute inset-0 opacity-10" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 space-y-4 text-center">
          <h2
            ref={titleRef}
            className="text-4xl font-bold lg:text-5xl glow-text"
          >
            Skill Set
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-glow to-glow-subtle" />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Expertise across programming, data engineering, cloud infrastructure, and AI/ML technologies
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category space-y-8">
              <h3 className="text-2xl font-bold text-center text-primary">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-icon-card glass-card rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 group cursor-pointer flex flex-col items-center justify-center gap-4 text-center"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-glow/20 to-glow-subtle/20 blur-2xl rounded-full" />
                      <div className="relative bg-primary/10 p-4 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                        <skill.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSet;
