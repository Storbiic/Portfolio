import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";

// Counts from zero the first time the number scrolls into view.
// Screen readers get the final value only, not every frame.
const CountUp = ({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [isInView, reduceMotion, count, value]);

  return (
    <span className={className}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <motion.span ref={ref} aria-hidden="true">
        {display}
      </motion.span>
    </span>
  );
};

export default CountUp;
