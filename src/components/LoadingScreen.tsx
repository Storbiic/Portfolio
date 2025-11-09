import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: onLoadingComplete,
        });
      },
    });

    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.out",
      onUpdate: function () {
        if (progressTextRef.current) {
          const progress = Math.round(this.progress() * 100);
          progressTextRef.current.textContent = `${progress}%`;
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="grid-bg absolute inset-0 opacity-30" />
      
      <div className="relative z-10 w-full max-w-md px-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-5xl font-bold glow-text">NAJAR Saad</h1>
          <p className="text-sm tracking-widest text-muted-foreground uppercase">
            Data Scientist & AI Engineer
          </p>
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            ref={progressBarRef}
            className="h-full w-0 bg-gradient-to-r from-glow-subtle to-glow glow"
            style={{ width: "0%" }}
          />
        </div>

        <div className="mt-4 text-center">
          <span
            ref={progressTextRef}
            className="text-2xl font-bold text-primary"
          >
            0%
          </span>
        </div>

        {/* Floating orbs */}
        <div className="absolute -top-20 left-1/4 h-32 w-32 rounded-full bg-glow/10 blur-3xl animate-float" />
        <div className="absolute -bottom-20 right-1/4 h-40 w-40 rounded-full bg-glow-subtle/10 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  );
};

export default LoadingScreen;
