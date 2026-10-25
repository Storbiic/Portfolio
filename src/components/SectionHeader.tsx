import { motion } from "motion/react";
import { inView, revealText } from "@/lib/motion";
import { navItems } from "@/lib/navigation";

type SectionHeaderProps = {
  // The section's id, used to number it in navigation order
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
};

// A numbered mono label, then the headline with its last word set as an editorial accent
const SectionHeader = ({ id, eyebrow, title, lede, className = "mb-12 md:mb-16" }: SectionHeaderProps) => {
  const number = String(navItems.findIndex((item) => item.href === `#${id}`) + 1).padStart(2, "0");
  const split = title.lastIndexOf(" ");
  const lead = split === -1 ? "" : title.slice(0, split + 1);
  const accent = split === -1 ? title : title.slice(split + 1);

  return (
    <div className={`max-w-3xl ${className}`}>
      <motion.p variants={revealText} {...inView} className="eyebrow">
        <span className="text-foreground">{number}</span>
        <span aria-hidden="true" className="h-3 w-px bg-border" />
        {eyebrow}
      </motion.p>
      <motion.h2 variants={revealText} {...inView} custom={1} className="mt-5 text-headline">
        {lead}
        <span className="accent">{accent}</span>
      </motion.h2>
      {lede && (
        <motion.p variants={revealText} {...inView} custom={2} className="mt-4 text-lede text-muted-foreground">
          {lede}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
