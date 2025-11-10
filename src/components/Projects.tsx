import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

import project1 from "@/assets/Brain_tumor.webp";
import project2 from "@/assets/breast_cancer.webp";
import project3 from "@/assets/etl_dashboard.png";
import project4 from "@/assets/movie_recom.jpg";
import project5 from "@/assets/orange_money.png";
import project6 from "@/assets/project-6.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      image: project1,
      title: "Brain Tumor Detection",
      description: "Deep Learning system for brain tumor detection on 3D MRI dataset using ResNet, 3DUnit, and 3D AutoEncoder architectures",
      tags: ["Python", "TensorFlow", "3D CNN"],
      github: "https://github.com/Storbiic/Brain_Tumor_Detection",
    },
    {
      image: project2,
      title: "Breast Cancer Detection",
      description: "Web application for breast cancer detection using machine learning algorithms with interactive UI",
      tags: ["Python", "Scikit-learn", "Flask"],
      github: "https://github.com/Storbiic/Breast_Cancer_Detection",
    },
    {
      image: project3,
      title: "ETL Dashboard",
      description: "Automated ETL Integration Hub with real-time data processing and visualization capabilities",
      tags: ["Python", "ETL", "Dashboard"],
      github: "https://github.com/Storbiic/ETL_Dashboard",
    },
    {
      image: project4,
      title: "Movie Recommendation System",
      description: "Collaborative filtering-based recommendation system built with R for personalized movie suggestions",
      tags: ["R", "Machine Learning", "Collaborative Filtering"],
      github: "https://github.com/Storbiic/Movie-Recommendation-system-using-R-based-on-collaboratif-filtering-",
    },
    {
      image: project5,
      title: "Orange Money Application",
      description: "Mobile money transfer application simulation developed using MATLAB with GUI interface",
      tags: ["MATLAB", "GUI", "Financial Tech"],
      github: "https://github.com/Storbiic/Orang-Money_application_using_MATLAP",
    },
    /*{
      image: project6,
      title: "ETL Automated SharePoint",
      description: "Automated ETL Integration Hub using SharePoint functionality for seamless data flow",
      tags: ["Python", "SharePoint", "Automation"],
      github: "https://github.com/Storbiic/ETL_Automated_SP",
    },*/
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
          stagger: 0.2,
          duration: 1.2,
          ease: "power2.out",
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
                    {project.github && (
                      <Button
                        size="icon"
                        className="bg-primary/90 hover:bg-primary glow"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
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
