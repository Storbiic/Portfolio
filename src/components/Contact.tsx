import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32"
      data-scroll-section
    >
      <div className="grid-bg absolute inset-0 opacity-10" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 space-y-4 text-center contact-item">
          <h2 className="text-4xl font-bold lg:text-5xl glow-text">
            Get In Touch
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-glow to-glow-subtle" />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have a project in mind or just want to say hello? Drop me a message
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Contact info */}
          <div className="space-y-8">
            <div className="contact-item glass rounded-2xl p-8 border border-primary/20 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Contact Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">saad@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">+1 (234) 567-890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating orbs */}
            <div className="contact-item relative h-64 overflow-hidden rounded-2xl border border-primary/20 glass">
              <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-glow/20 blur-3xl animate-float" />
              <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-glow-subtle/20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-lg font-medium text-muted-foreground">
                  Let's build something amazing together
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="contact-item">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 border border-primary/20 space-y-6"
            >
              <h3 className="text-2xl font-bold text-foreground">Send Message</h3>
              
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="Your message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[150px] bg-background/50 border-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
