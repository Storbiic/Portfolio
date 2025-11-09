import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.4"
        )
        .fromTo(
          splineRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
          "-=1"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      data-scroll-section
    >
      {/* Grid background */}
      <div className="grid-bg absolute inset-0 opacity-20" />

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-glow/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-glow-subtle/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-widest text-primary uppercase">
                Introducing
              </p>
              <h1
                ref={headlineRef}
                className="text-5xl font-bold leading-tight lg:text-7xl glow-text"
              >
                Hi, I'm NAJAR Saad
              </h1>
              <p
                ref={subtitleRef}
                className="text-xl text-muted-foreground lg:text-2xl"
              >
                Data Scientist & AI Engineer
              </p>
            </div>

            <p className="max-w-lg text-lg leading-relaxed text-foreground/80">
              Crafting intelligent solutions through machine learning, deep learning,
              and cutting-edge AI technologies. Transforming data into actionable insights.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 glow magnetic-btn"
              >
                <a href="#contact">Hire Me</a>
              </Button>
              <div className="flex gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary magnetic-btn"
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary magnetic-btn"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary magnetic-btn"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Spline 3D - Liquid Glass */}
          <div
            ref={splineRef}
            className="relative h-[500px] lg:h-[600px]"
          >
            <iframe
              src="https://my.spline.design/liquidglass-rM3o93P8ISaWcg143hDOgO2T-RtD/"
              className="h-full w-full rounded-2xl border border-primary/20 glass"
              title="Liquid Glass 3D"
            />
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-glow/10 to-glow-subtle/10 blur-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-6 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="h-2 w-1 rounded-full bg-primary animate-glow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
