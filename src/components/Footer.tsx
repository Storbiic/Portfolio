import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-12 border-t border-primary/20">
      <div className="grid-bg absolute inset-0 opacity-5" />
      
      {/* Floating particles */}
      <div className="absolute top-0 left-1/4 h-32 w-32 rounded-full bg-glow/5 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-glow-subtle/5 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Social links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background/50 backdrop-blur transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background/50 backdrop-blur transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background/50 backdrop-blur transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background/50 backdrop-blur transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 NAJAR Saad. Made with{" "}
              <span className="text-primary">❤</span> by MiladiCode
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
