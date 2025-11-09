import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Python", level: 95 },
  { name: "TensorFlow", level: 90 },
  { name: "PyTorch", level: 88 },
  { name: "React", level: 92 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Docker", level: 82 },
  { name: "SQL", level: 87 },
];

const SkillSet = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      skillsRef.current.forEach((skill, index) => {
        if (skill) {
          gsap.fromTo(
            skill,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: skill,
                start: "top 85%",
              },
            }
          );
        }
      });

      barsRef.current.forEach((bar, index) => {
        if (bar) {
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${skills[index].level}%`,
              duration: 1.5,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
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
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="grid-bg absolute inset-0 opacity-10" />
      
      <div className="container relative z-10 mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl lg:text-6xl font-bold text-center mb-16 glow-text"
        >
          Skill Set
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => (skillsRef.current[index] = el)}
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">
                  {skill.name}
                </span>
                <span className="text-sm text-primary font-medium">
                  {skill.level}%
                </span>
              </div>
              <div className="h-3 bg-muted/20 rounded-full overflow-hidden glass border border-primary/10">
                <div
                  ref={(el) => (barsRef.current[index] = el)}
                  className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full shadow-lg shadow-primary/50"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSet;
