import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, CircleNotch, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import SectionHeader from "@/components/SectionHeader";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { API_ENDPOINTS } from "@/lib/api";
import { inView, reveal, spring, tint, type SystemColor } from "@/lib/motion";

type Field = "name" | "email" | "message";

const FIELDS: Field[] = ["name", "email", "message"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// How long the button shows its "sent" state before it's ready again
const SENT_DURATION = 2500;

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    if (status !== "sent") return;
    const timer = setTimeout(() => setStatus("idle"), SENT_DURATION);
    return () => clearTimeout(timer);
  }, [status]);

  const validate = (field: Field, value: string) => {
    if (!value.trim()) return t(`contact.${field}Required`);
    if (field === "email" && !EMAIL_REGEX.test(value)) return t("contact.emailInvalid");
    return "";
  };

  // Validate inline: on blur, then live while the user corrects an error
  const handleBlur = (field: Field) => {
    setErrors((prev) => ({ ...prev, [field]: validate(field, formData[field]) }));
  };

  const handleChange = (field: Field, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
    }
  };

  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    name: field,
    value: formData[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(field, e.target.value),
    onBlur: () => handleBlur(field),
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: `h-12 rounded-xl bg-background px-4 text-[17px] md:text-[17px] focus-visible:ring-offset-0 ${errors[field] ? "border-destructive focus-visible:ring-destructive" : ""}`,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = Object.fromEntries(FIELDS.map((field) => [field, validate(field, formData[field])]));
    setErrors(nextErrors);

    const firstInvalid = FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(API_ENDPOINTS.SEND_EMAIL || 'http://localhost:3001/api/send-email', {
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to send message' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast({
          title: t("contact.successTitle"),
          description: t("contact.successMessage"),
        });
        // Reset form on success
        setFormData({ name: "", email: "", message: "" });
        setStatus("sent");
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: t("contact.error"),
        description: t("contact.errorMessage"),
        variant: "destructive",
      });
      setStatus("idle");
    }
  };

  const contactDetails: { icon: typeof Phone; label: string; value: string; href?: string; tint: SystemColor }[] = [
    { icon: EnvelopeSimple, label: t("contact.email"), value: "saadnajar@icloud.com", href: "mailto:saadnajar@icloud.com", tint: "blue" },
    { icon: Phone, label: t("contact.phone"), value: "+212 656 311 999", href: "tel:+212656311999", tint: "green" },
    { icon: MapPin, label: t("contact.location"), value: "Kenitra, Morocco", tint: "red" },
  ];

  const buttonLabel = {
    idle: t("contact.sendButton"),
    sending: (
      <>
        <CircleNotch weight="bold" className="animate-spin" aria-hidden="true" />
        {t("contact.sending")}
      </>
    ),
    sent: (
      <>
        <Check weight="bold" aria-hidden="true" />
        {t("contact.successTitle")}
      </>
    ),
  }[status];

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container">
        <SectionHeader title={t("contact.title")} lede={t("contact.subtitle")} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          {/* Left: Contact info */}
          <motion.div variants={reveal} {...inView} className="space-y-8">
            <h3 className="text-title">{t("contact.contactInfo")}</h3>

            <ul className="space-y-6">
              {contactDetails.map(({ icon: Icon, label, value, href, tint: color }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="icon-badge h-11 w-11 rounded-xl" style={tint(color)}>
                    <Icon size={20} weight="fill" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="break-words text-link hover:underline underline-offset-4">
                        {value}
                      </a>
                    ) : (
                      <p>{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="max-w-sm text-lede text-muted-foreground">{t("contact.buildTogether")}</p>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div variants={reveal} {...inView} custom={1}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 rounded-tile bg-surface p-6 sm:p-8"
            >
              <h3 className="text-title">{t("contact.sendMessage")}</h3>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-[15px] font-normal">{t("contact.nameLabel")}</Label>
                  <Input type="text" autoComplete="name" {...fieldProps("name")} />
                  {errors.name && (
                    <p id="contact-name-error" className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-[15px] font-normal">{t("contact.emailLabel")}</Label>
                  <Input type="email" autoComplete="email" {...fieldProps("email")} />
                  {errors.email && (
                    <p id="contact-email-error" className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-[15px] font-normal">{t("contact.messageLabel")}</Label>
                  <Textarea
                    {...fieldProps("message")}
                    className={`${fieldProps("message").className} min-h-[150px] resize-none py-3`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                {/* The label swaps in place, so the button reports progress where the user is looking */}
                <Button type="submit" size="lg" disabled={status === "sending"} className="w-full overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={status}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                      transition={spring.snappy}
                    >
                      {buttonLabel}
                    </motion.span>
                  </AnimatePresence>
                </Button>
                <p className="sr-only" role="status">
                  {status === "sending" ? t("contact.sending") : status === "sent" ? t("contact.successTitle") : ""}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
