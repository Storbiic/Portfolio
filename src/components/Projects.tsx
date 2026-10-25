import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import SectionHeader from "@/components/SectionHeader";
import { followPointer, inView, prefersReducedMotion, reveal, spring } from "@/lib/motion";

const CARD_GAP = 24;
// Maximum tilt, in degrees, when the pointer is at a card's edge
const MAX_TILT = 4;

import project1 from "@/assets/landing-brain-tumor.webp";
import project2 from "@/assets/landing-breast-cancer.webp";
import project3 from "@/assets/landing-etl-dashboard.webp";
import project4 from "@/assets/landing-movie-recommender.webp";
import project5 from "@/assets/landing-orange-money.webp";
import project6 from "@/assets/project-6.png";

type Project = {
  image: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
};

// Like a focused Apple TV poster: the card leans toward the pointer and a sheen follows it
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, followPointer);
  const rotateY = useSpring(0, followPointer);
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(28rem circle at ${sheenX}% ${sheenY}%, rgb(255 255 255 / 0.22), transparent 55%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    sheenX.set(x * 100);
    sheenY.set(y * 100);
    if (reduceMotion) return;
    rotateY.set((x - 0.5) * 2 * MAX_TILT);
    rotateX.set((0.5 - y) * 2 * MAX_TILT);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      variants={reveal}
      {...inView}
      custom={index}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      transition={spring.snappy}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="project-card group relative flex w-[min(400px,82vw)] flex-shrink-0 snap-start flex-col overflow-hidden rounded-tile bg-card shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)]:hover:shadow-[0_18px_40px_rgba(0,0,0,0.14)]"
    >
      <img src={project.image} alt="" className="aspect-[25/16] w-full object-cover" />

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-title">{project.title}</h3>
        <p className="mt-3 text-muted-foreground">{project.description}</p>
        <p className="mt-4 text-[13px] text-muted-foreground">{project.tags.join(" · ")}</p>

        {/* Always visible, so touch users can see where the card goes */}
        <span className="chevron-link mt-auto pt-6 text-[15px]">
          View on GitHub
          <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
        </span>
      </div>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
        style={{ background: sheen }}
      />
    </motion.a>
  );
};

const Projects = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });

  const projects: Project[] = [
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

  // Track whether there's more to scroll in each direction, for the arrows and edge fades
  const updateEdges = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setEdges({
      atStart: container.scrollLeft <= 1,
      atEnd: container.scrollLeft + container.clientWidth >= container.scrollWidth - 1,
    });
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const container = scrollContainerRef.current;
    const card = container?.querySelector<HTMLElement>(".project-card");
    if (!container || !card) return;
    container.scrollBy({
      left: direction * (card.offsetWidth + CARD_GAP),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  // Fade only the edges that have more content beyond them
  const fadeMask = `linear-gradient(to right, ${edges.atStart ? "black" : "transparent"}, black 3rem, black calc(100% - 3rem), ${edges.atEnd ? "black" : "transparent"})`;

  return (
    <section id="projects" className="bg-surface py-24 md:py-32">
      <div className="container">
        <SectionHeader
          title="Featured Projects"
          lede="Explore my latest work showcasing innovative solutions and cutting-edge technology"
        />

        {/* Horizontal scrollable container */}
        <div
          ref={scrollContainerRef}
          onScroll={updateEdges}
          className="hide-scrollbar -mx-4 snap-x snap-mandatory overflow-x-auto scroll-px-4 pb-8 pt-3"
          style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
        >
          <div className="flex w-max gap-6 px-4">
            {projects.map((project, index) => (
              <ProjectCard key={project.github} project={project} index={index} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {/* Where you are in the row, tracking the scroll 1:1 */}
          <div aria-hidden="true" className="mr-auto h-1 w-24 overflow-hidden rounded-full bg-foreground/10">
            <motion.div className="h-full origin-left rounded-full bg-foreground/50" style={{ scaleX: scrollXProgress }} />
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9"
            onClick={() => scrollByCard(-1)}
            disabled={edges.atStart}
            aria-label="Previous project"
          >
            <CaretLeft weight="bold" className="!size-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9"
            onClick={() => scrollByCard(1)}
            disabled={edges.atEnd}
            aria-label="Next project"
          >
            <CaretRight weight="bold" className="!size-4" />
          </Button>
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
