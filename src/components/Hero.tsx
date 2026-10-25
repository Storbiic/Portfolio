import { useRef } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CaretRight, EnvelopeSimple, GithubLogo, LinkedinLogo, Sparkle } from "@phosphor-icons/react";
import { followPointer, revealText, scrollToSection } from "@/lib/motion";

const socialLinks = [
  { href: "https://github.com/Storbiic", label: "GitHub", icon: GithubLogo },
  { href: "https://www.linkedin.com/in/saad-najar/", label: "LinkedIn", icon: LinkedinLogo },
  { href: "mailto:saadnajar@icloud.com", label: "Email", icon: EnvelopeSimple },
];

// Each blob sits at its own depth, so it moves a different amount with the pointer
const glowBlobs = [
  { color: "blue", className: "left-[4%] top-[8%] h-[70%] w-[48%]", depth: 1 },
  { color: "purple", className: "left-[30%] top-[22%] h-[78%] w-[44%]", depth: -0.6 },
  { color: "pink", className: "right-[6%] top-[4%] h-[64%] w-[38%]", depth: 0.8 },
  { color: "orange", className: "right-[22%] top-[46%] h-[48%] w-[30%]", depth: -1 },
];

const GlowBlob = ({ blob, x, y }: { blob: (typeof glowBlobs)[number]; x: MotionValue<number>; y: MotionValue<number> }) => {
  const blobX = useTransform(x, (v) => v * blob.depth);
  const blobY = useTransform(y, (v) => v * blob.depth);

  return (
    <motion.div
      className={`absolute rounded-full ${blob.className}`}
      style={{
        x: blobX,
        y: blobY,
        // Eased falloff, so no rim shows where the gradient ends
        background: `radial-gradient(closest-side, hsl(var(--system-${blob.color}) / var(--glow-hero)), hsl(var(--system-${blob.color}) / calc(var(--glow-hero) * 0.4)) 50%, hsl(var(--system-${blob.color}) / calc(var(--glow-hero) * 0.1)) 75%, transparent)`,
      }}
    />
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // The glow sinks and fades as the page scrolls past the hero
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ...and leans toward the pointer. Only the user moves it; it never drifts on its own.
  const pointerX = useSpring(0, followPointer);
  const pointerY = useSpring(0, followPointer);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set(((e.clientX - rect.left) / rect.width - 0.5) * 60);
    pointerY.set(((e.clientY - rect.top) / rect.height - 0.5) * 40);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Lines enter in reading order on load
  const enter = (index: number) => ({ variants: revealText, initial: "hidden", animate: "visible", custom: index }) as const;

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate overflow-hidden pb-24 pt-36 text-center md:pb-32 md:pt-44"
    >
      <motion.div
        aria-hidden="true"
        className="grain pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[min(760px,100%)] max-w-6xl"
        style={{ y: reduceMotion ? 0 : glowY, opacity: glowOpacity }}
      >
        {/* Materializes once on load, then only responds to scroll and pointer */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {glowBlobs.map((blob) => (
            <GlowBlob key={blob.color} blob={blob} x={pointerX} y={pointerY} />
          ))}
        </motion.div>
      </motion.div>

      <div className="container">
        <motion.p {...enter(0)} className="eyebrow">
          <Sparkle weight="fill" className="h-3 w-3 text-system-purple" aria-hidden="true" />
          Data Scientist & AI Engineer
        </motion.p>
        <h1 className="mx-auto mt-6 max-w-4xl text-display">
          <motion.span {...enter(1)} className="inline-block">
            Hi,
          </motion.span>{" "}
          <motion.span {...enter(2)} className="inline-block">
            I'm
          </motion.span>{" "}
          {/* Padding keeps descenders and the italic overhang inside the gradient's clip box */}
          <motion.span
            {...enter(3)}
            className="accent -mb-[0.12em] -mr-[0.08em] inline-block pr-[0.08em] bg-gradient-to-r from-system-blue via-system-purple to-system-pink bg-clip-text pb-[0.12em] text-transparent contrast-more:bg-none contrast-more:text-foreground"
          >
            Saad Najar.
          </motion.span>
        </h1>
        <motion.p {...enter(4)} className="mx-auto mt-6 max-w-2xl text-lede text-muted-foreground">
          Crafting intelligent solutions through machine learning, deep learning,
          and cutting-edge AI technologies. Transforming data into actionable insights.
        </motion.p>

        <motion.div {...enter(5)} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button size="lg" className="group gap-3 pr-2" asChild>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
            >
              Let's get in touch
              {/* The arrow nudges toward where the button goes */}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <ArrowRight weight="bold" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </span>
            </a>
          </Button>
          <a
            href="#projects"
            className="chevron-link text-[17px]"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#projects");
            }}
          >
            See my projects
            <CaretRight weight="bold" className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        <motion.div {...enter(6)} className="mt-12 flex justify-center gap-2">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Button key={href} size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <Icon className="!size-5" />
              </a>
            </Button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
