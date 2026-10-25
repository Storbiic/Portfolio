import { motion } from "motion/react";
import { inView, revealText } from "@/lib/motion";

type SectionHeaderProps = {
  title: string;
  lede?: string;
  className?: string;
};

// The headline with its last word set as an editorial accent, then an optional lede
const SectionHeader = ({ title, lede, className = "mb-12 md:mb-16" }: SectionHeaderProps) => {
  const split = title.lastIndexOf(" ");
  const lead = split === -1 ? "" : title.slice(0, split + 1);
  const accent = split === -1 ? title : title.slice(split + 1);

  return (
    <div className={`max-w-3xl ${className}`}>
      <motion.h2 variants={revealText} {...inView} className="text-headline">
        {lead}
        <span className="accent">{accent}</span>
      </motion.h2>
      {lede && (
        <motion.p variants={revealText} {...inView} custom={1} className="mt-4 text-lede text-muted-foreground">
          {lede}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
