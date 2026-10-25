import { useEffect } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Desktop, Moon, Sun } from "@phosphor-icons/react";
import { spring } from "@/lib/motion";
import { switchTheme, syncThemeColor, type ThemeChoice } from "@/lib/theme";

const centerOf = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};

// Before next-themes resolves the system setting, the class set in index.html is the truth
const useIsDark = () => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme ? resolvedTheme === "dark" : document.documentElement.classList.contains("dark");
};

export const ThemeColorSync = () => {
  const { resolvedTheme } = useTheme();
  useEffect(() => syncThemeColor(resolvedTheme), [resolvedTheme]);
  return null;
};

// Navbar: one tap flips between light and dark
export const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { setTheme } = useTheme();
  const isDark = useIsDark();

  return (
    <button
      type="button"
      onClick={(e) => switchTheme(isDark ? "light" : "dark", setTheme, centerOf(e.currentTarget))}
      aria-label={isDark ? "Switch to light appearance" : "Switch to dark appearance"}
      className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-foreground/80 transition-colors hover:text-foreground active:bg-secondary ${className}`}
    >
      {/* The new symbol rotates in as the old one rotates out, like a dial turning */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={spring.snappy}
          className="flex"
        >
          {isDark ? <Moon size={17} weight="fill" /> : <Sun size={17} weight="fill" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

const choices: { value: ThemeChoice; label: string; icon: typeof Sun }[] = [
  { value: "system", label: "Auto", icon: Desktop },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

// Footer: the full choice, including going back to following the system, as in Settings › Display
export const AppearancePicker = () => {
  const { theme = "system", setTheme } = useTheme();

  return (
    <div role="group" aria-label="Appearance" className="inline-flex rounded-full bg-secondary p-0.5">
      {choices.map(({ value, label, icon: Icon }) => {
        const selected = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={selected}
            onClick={(e) => switchTheme(value, setTheme, centerOf(e.currentTarget))}
            className={`relative flex h-7 items-center gap-1.5 rounded-full px-3 text-xs transition-colors ${
              selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {selected && (
              <motion.span
                layoutId="appearance-selected"
                className="absolute inset-0 rounded-full bg-background shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                transition={spring.snappy}
              />
            )}
            <Icon size={13} weight={selected ? "fill" : "regular"} className="relative" aria-hidden="true" />
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
};
