import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";
import project4 from "@/assets/project-4.png";
import project5 from "@/assets/project-5.png";
import project6 from "@/assets/project-6.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      image: project1,
      title: "3D Interactive Web",
      description: "Email platform for developers with cutting-edge 3D interactions",
      tags: ["React", "Three.js", "GSAP"],
    },
    {
      image: project2,
      title: "Gaming UI Platform",
      description: "Next-level gaming interface with immersive 3D elements",
      tags: ["React", "WebGL", "Spline"],
    },
    {
      image: project3,
      title: "3D Portfolio",
      description: "Professional developer portfolio with advanced 3D animations",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      image: project4,
      title: "Gaming Website",
      description: "Dynamic gaming platform with stunning visual effects",
      tags: ["React", "Tailwind", "GSAP"],
    },
    {
      image: project5,
      title: "Animation Tools",
      description: "Educational platform for web animation techniques",
      tags: ["React", "GSAP", "Framer"],
    },
    {
      image: project6,
      title: "Animated Portfolio",
      description: "Step-by-step tutorial portfolio with smooth animations",
      tags: ["HTML", "CSS", "JS"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32"
      data-scroll-section
    >
      <div className="grid-bg absolute inset-0 opacity-10" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold lg:text-5xl glow-text">
            Featured Projects
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-glow to-glow-subtle" />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore my latest work showcasing innovative solutions and cutting-edge technology
          </p>
        </div>

        {/* Horizontal scrollable container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-8 hide-scrollbar"
        >
          <div className="flex gap-6 min-w-max px-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card glass-card group relative w-[400px] flex-shrink-0 overflow-hidden rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Overlay buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Button
                      size="icon"
                      className="bg-primary/90 hover:bg-primary glow"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-primary/50 bg-background/50 backdrop-blur hover:bg-primary/10"
                    >
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-glow/0 via-glow/10 to-glow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
