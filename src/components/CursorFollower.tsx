import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: "hsl(var(--primary))",
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: "hsl(var(--primary) / 0.3)",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .magnetic-btn"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Cursor ring */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-primary/30 rounded-full pointer-events-none z-[100] hidden lg:block"
        style={{
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[100] hidden lg:block"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default CursorFollower;
