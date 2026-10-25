import { motion } from "motion/react";
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { AppearancePicker } from "@/components/ThemeControls";
import { reveal, scrollToSection } from "@/lib/motion";
import { navItems } from "@/lib/navigation";

const socialLinks = [
  { href: "https://github.com/Storbiic", label: "GitHub", icon: GithubLogo },
  { href: "https://www.linkedin.com/in/saad-najar/", label: "LinkedIn", icon: LinkedinLogo },
  { href: "mailto:saadnajar@icloud.com", label: "Email", icon: EnvelopeSimple },
];

const Footer = () => {
  return (
    <motion.footer
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      className="bg-surface pb-[max(2rem,env(safe-area-inset-bottom))] pt-10 text-xs text-muted-foreground">
      <div className="container">
        {/* Navigation: same destinations as the header */}
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="transition-colors hover:text-foreground hover:underline underline-offset-4"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 flex flex-col-reverse gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Saad Najar. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 sm:-mr-2">
            <AppearancePicker />
            <div className="-ml-2 flex gap-1 sm:ml-0">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-foreground active:bg-secondary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
