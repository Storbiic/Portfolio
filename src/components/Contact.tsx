import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t("contact.error"),
        description: t("contact.fillFields"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: t("contact.successTitle"),
          description: t("contact.successMessage"),
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Email Error:', error);
      toast({
        title: t("contact.error"),
        description: t("contact.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            {t("contact.title")}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-glow to-glow-subtle" />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Contact info */}
          <div className="space-y-8">
            <div className="contact-item glass-card rounded-2xl p-8 border border-primary/20 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">{t("contact.contactInfo")}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t("contact.email")}</p>
                    <a href="mailto:saadnajar@icloud.com" className="text-muted-foreground hover:text-primary transition-colors">
                      saadnajar@icloud.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t("contact.phone")}</p>
                    <a href="tel:+212656311999" className="text-muted-foreground hover:text-primary transition-colors">
                      +212 656 311 999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t("contact.location")}</p>
                    <p className="text-muted-foreground">Kenitra, Morocco</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating orbs */}
            <div className="contact-item relative h-64 overflow-hidden rounded-2xl border border-primary/20 glass-card">
              <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-glow/20 blur-3xl animate-float" />
              <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-glow-subtle/20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-lg font-medium text-muted-foreground">
                  {t("contact.buildTogether")}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="contact-item">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 border border-primary/20 space-y-6"
            >
              <h3 className="text-2xl font-bold text-foreground">{t("contact.sendMessage")}</h3>
              
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder={t("contact.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <Textarea
                    placeholder={t("contact.messagePlaceholder")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[150px] bg-background/50 border-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t("contact.sending") : t("contact.sendButton")}
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
