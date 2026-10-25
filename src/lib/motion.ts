import type { CSSProperties } from "react";
import type { Transition, Variants } from "motion/react";

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Springs in Apple's terms: bounce 0 is critically damped, visualDuration is the response.
// Nothing here overshoots, since none of it follows a flick.
export const spring = {
  // Content that moves on its own: unhurried, settles without a bounce
  smooth: { type: "spring", bounce: 0, visualDuration: 0.6 },
  // Feedback that follows input: hover, press, indicators
  snappy: { type: "spring", bounce: 0, visualDuration: 0.3 },
} satisfies Record<string, Transition>;

// Pointer-driven values (glow, tilt) chase the pointer on a spring so they never jump
export const followPointer = { stiffness: 220, damping: 30 };

// One shared entrance: content rises into place as it reaches the viewport.
// `custom` is the item's position in its row, for a short stagger.
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index = 0) => ({ opacity: 1, y: 0, transition: { ...spring.smooth, delay: index * 0.06 } }),
};

// Headlines also come into focus, as on apple.com's product pages
export const revealText: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...spring.smooth, delay: index * 0.08 },
  }),
};

// Lists of small items (chips) pop in one after another
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: spring.snappy },
};

export const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "0px 0px -12% 0px" },
} as const;

export type SystemColor = "blue" | "indigo" | "purple" | "pink" | "orange" | "green" | "teal" | "red";

// Sets --tint for .icon-badge and .tile-glow
export const tint = (color: SystemColor) => ({ "--tint": `var(--system-${color})` }) as CSSProperties;

export const scrollToSection = (href: string) => {
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

  if (href === "#") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  document.querySelector(href)?.scrollIntoView({ behavior });
};
