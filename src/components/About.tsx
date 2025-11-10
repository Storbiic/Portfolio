import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile.png";
import { Brain, Database, Sparkles, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Brain, name: "Machine Learning", color: "from-cyan-400 to-blue-500" },
    { icon: Database, name: "Data Science", color: "from-blue-400 to-indigo-500" },
    { icon: Sparkles, name: "Deep Learning", color: "from-indigo-400 to-purple-500" },
    { icon: TrendingUp, name: "AI Engineering", color: "from-purple-400 to-pink-500" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -100, filter: "blur(10px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32"
      data-scroll-section
    >
      <div className="grid-bg absolute inset-0 opacity-10" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Profile image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-glow via-glow-subtle to-transparent opacity-20 blur-2xl animate-pulse" />
              <div className="glass-card relative overflow-hidden rounded-full border-2 border-primary/30 p-4 group hover:scale-105 transition-transform duration-500">
                <img
                  src={profileImg}
                  alt="NAJAR Saad"
                  className="h-full w-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* Right: Bio & Skills */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold lg:text-5xl glow-text">
                About Me
              </h2>
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-glow to-glow-subtle" />
            </div>

            <p className="text-lg leading-relaxed text-foreground/80">
              I'm a passionate Data Scientist and AI Engineer specializing in building
              intelligent systems that solve real-world problems. With expertise in
              machine learning, deep learning, and advanced analytics, I transform
              complex data into actionable insights.
            </p>

            <p className="text-lg leading-relaxed text-foreground/80">
              My work focuses on creating scalable AI solutions, developing predictive
              models, and leveraging cutting-edge technologies to drive innovation and
              business growth.
            </p>

            {/* Skills grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-card glass-card rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${skill.color} mb-3`}>
                    <skill.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
