import { useRef } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
};

// Words light up in reading order as the paragraph moves up through the viewport.
// Everything is fully lit by the time it reaches the middle of the screen.
const ScrollHighlightText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word key={index} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
};

export default ScrollHighlightText;
