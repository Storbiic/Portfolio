import { flushSync } from "react-dom";
import { prefersReducedMotion } from "@/lib/motion";

export type ThemeChoice = "system" | "light" | "dark";

const resolve = (choice: ThemeChoice) =>
  choice === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : choice;

// next-themes applies its class in an effect; the view transition needs it in the same frame
const applyClass = (choice: ThemeChoice) => {
  const dark = resolve(choice) === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
};

/**
 * Change the theme without an abrupt brightness jump: the new scheme grows out of `origin`
 * (the control that was pressed) as a circle. With reduced motion it cross-fades instead.
 */
export const switchTheme = (
  choice: ThemeChoice,
  setTheme: (theme: string) => void,
  origin?: { x: number; y: number }
) => {
  const update = () => {
    flushSync(() => setTheme(choice));
    applyClass(choice);
  };

  if (!document.startViewTransition || resolve(choice) === (document.documentElement.classList.contains("dark") ? "dark" : "light")) {
    update();
    return;
  }

  const transition = document.startViewTransition(update);
  if (prefersReducedMotion() || !origin) return;

  const { x, y } = origin;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
    );
  });
};

// The browser chrome (Safari's tab bar, Android's status bar) follows the page background
export const syncThemeColor = (resolved: string | undefined) => {
  const color = resolved === "dark" ? "#000000" : "#ffffff";
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.content = color;
  });
};
