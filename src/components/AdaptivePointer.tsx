import { useEffect, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { spring } from "@/lib/motion";

/*
 * The iPadOS pointer, translated for the web (HIG › Pointing devices):
 *  - highlight: a small control with a transparent background. The pointer becomes a translucent
 *    rounded rectangle behind it, with a gentle parallax.
 *  - lift: a small control with an opaque background. The pointer fades out beneath it while the
 *    control scales up with a shadow and a specular highlight.
 *  - hover: a large element. The pointer keeps its shape; the element handles its own effect.
 *    An accessory badge says where a link goes.
 *  - text: over text entry the system I-beam takes over.
 * The circle tracks the pointer 1:1. Only shape changes are animated, so nothing lags the hand.
 */

type Mode = "pointer" | "highlight" | "lift" | "hover" | "text";

const SIZE = 18;
const INTERACTIVE = "a[href], button:not(:disabled), [role='button'], summary";
const TEXT_ENTRY =
  "input:not([type='checkbox'], [type='radio'], [type='submit'], [type='button']), textarea, select, [contenteditable='true']";
// Past either dimension, an element is "large" and gets the hover effect instead
const LARGE = { width: 320, height: 120 };
// How far the platter drifts toward the pointer; the control itself moves half as far
const PARALLAX = 4;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const hasOpaqueBackground = (el: HTMLElement) => {
  const match = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
  if (!match) return false;
  const alpha = match[1].split(/[\s,/]+/).filter(Boolean)[3];
  return (alpha === undefined ? 1 : parseFloat(alpha)) > 0.5;
};

const resolveTarget = (el: Element | null): { mode: Mode; target: HTMLElement | null } => {
  if (!el) return { mode: "pointer", target: null };
  if (el.closest(TEXT_ENTRY)) return { mode: "text", target: null };

  const target = el.closest<HTMLElement>(`[data-pointer], ${INTERACTIVE}`);
  if (!target) return { mode: "pointer", target: null };

  const forced = target.dataset.pointer as Mode | undefined;
  if (forced) return { mode: forced, target };

  const rect = target.getBoundingClientRect();
  if (rect.width > LARGE.width || rect.height > LARGE.height) return { mode: "hover", target };
  return { mode: hasOpaqueBackground(target) ? "lift" : "highlight", target };
};

// The element's box without the parallax we applied, so the effect never feeds back into itself
const layoutRect = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const translate = getComputedStyle(el).translate;
  const [tx = 0, ty = 0] = translate === "none" ? [] : translate.split(" ").map(parseFloat);
  return { left: rect.left - tx, top: rect.top - ty, width: rect.width, height: rect.height };
};

const originalTransitions = new WeakMap<HTMLElement, string>();
const EFFECT_TRANSITION =
  "translate 200ms cubic-bezier(0.2, 0.8, 0.2, 1), scale 250ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 250ms ease-out";

const Pointer = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const width = useMotionValue(SIZE);
  const height = useMotionValue(SIZE);
  const radius = useMotionValue(SIZE / 2);
  const opacity = useMotionValue(0);
  const scale = useMotionValue(1);
  const accessoryX = useMotionValue(-100);
  const accessoryY = useMotionValue(-100);

  const [mode, setMode] = useState<Mode>("pointer");
  const [showAccessory, setShowAccessory] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("adaptive-pointer");

    let current: HTMLElement | null = null;
    let currentMode: Mode = "pointer";
    let morphUntil = 0;
    let visible = false;
    const last = { x: -100, y: -100 };

    const move = (value: typeof x, to: number, animated: boolean) => {
      if (animated) animate(value, to, spring.snappy);
      else value.jump(to);
    };

    let opacityTarget = 0;
    const setOpacity = (to: number) => {
      if (to === opacityTarget) return;
      opacityTarget = to;
      animate(opacity, to, { duration: 0.15, ease: "easeOut" });
    };

    const engage = (el: HTMLElement) => {
      if (!originalTransitions.has(el)) originalTransitions.set(el, el.style.transition);
      const base = getComputedStyle(el).transition;
      el.style.transition = base && !base.startsWith("all 0s") ? `${base}, ${EFFECT_TRANSITION}` : EFFECT_TRANSITION;
    };

    const release = (el: HTMLElement | null) => {
      if (!el) return;
      el.removeAttribute("data-pointer-lifted");
      el.style.translate = "";
      // Keep the effect transition until the control has eased back
      window.setTimeout(() => {
        if (el !== current && originalTransitions.has(el)) {
          el.style.transition = originalTransitions.get(el) ?? "";
          originalTransitions.delete(el);
        }
      }, 300);
    };

    const update = () => {
      const { mode: nextMode, target } = resolveTarget(document.elementFromPoint(last.x, last.y));

      if (target !== current || nextMode !== currentMode) {
        release(current);
        current = target;
        currentMode = nextMode;
        morphUntil = performance.now() + 300;
        if (target && (nextMode === "highlight" || nextMode === "lift")) engage(target);
        if (target && nextMode === "lift") target.setAttribute("data-pointer-lifted", "");
        setMode(nextMode);
        setShowAccessory(nextMode === "hover" && !!target?.matches("a[target='_blank']"));
      }

      const morphing = performance.now() < morphUntil;
      accessoryX.jump(last.x + 12);
      accessoryY.jump(last.y + 12);

      if (target && (nextMode === "highlight" || nextMode === "lift")) {
        const rect = layoutRect(target);
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clamp((last.x - cx) / (rect.width / 2), -1, 1);
        const dy = clamp((last.y - cy) / (rect.height / 2), -1, 1);
        const offsetX = dx * PARALLAX;
        const offsetY = dy * PARALLAX * 0.6;
        target.style.translate = `${offsetX / 2}px ${offsetY / 2}px`;

        if (nextMode === "highlight") {
          // Text links have no padding of their own, so the platter grows past them
          const styles = getComputedStyle(target);
          const padX = parseFloat(styles.paddingLeft) < 6 ? 8 : 0;
          const padY = parseFloat(styles.paddingTop) < 4 ? 4 : 0;
          const w = rect.width + padX * 2;
          const h = rect.height + padY * 2;
          const r = Math.min(parseFloat(styles.borderTopLeftRadius) || 10, h / 2);
          move(x, rect.left - padX + offsetX, true);
          move(y, rect.top - padY + offsetY, true);
          move(width, w, true);
          move(height, h, true);
          move(radius, r, true);
          if (visible) setOpacity(1);
        } else {
          // Lift: the pointer sinks into the control's center and fades
          target.style.setProperty("--pointer-x", `${((last.x - rect.left) / rect.width) * 100}%`);
          target.style.setProperty("--pointer-y", `${((last.y - rect.top) / rect.height) * 100}%`);
          move(x, cx - SIZE / 4, true);
          move(y, cy - SIZE / 4, true);
          move(width, SIZE / 2, true);
          move(height, SIZE / 2, true);
          move(radius, SIZE / 4, true);
          setOpacity(0);
        }
        return;
      }

      move(x, last.x - SIZE / 2, morphing);
      move(y, last.y - SIZE / 2, morphing);
      move(width, SIZE, morphing);
      move(height, SIZE, morphing);
      move(radius, SIZE / 2, morphing);
      if (visible) setOpacity(nextMode === "text" ? 0 : 1);
    };

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        visible = false;
        setOpacity(0);
        return;
      }
      const first = !visible;
      last.x = e.clientX;
      last.y = e.clientY;
      visible = true;
      if (first) {
        // Appear where the pointer is, rather than flying in from the corner
        x.jump(last.x - SIZE / 2);
        y.jump(last.y - SIZE / 2);
      }
      update();
    };

    // Content moves under a still pointer while scrolling; re-target what's now beneath it
    const handleScroll = () => {
      if (visible) update();
    };

    const handleOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      visible = false;
      setOpacity(0);
      release(current);
      current = null;
      currentMode = "pointer";
    };

    const handleDown = () => {
      setPressed(true);
      animate(scale, 0.9, spring.snappy);
    };

    const handleUp = () => {
      setPressed(false);
      animate(scale, 1, spring.snappy);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    document.addEventListener("mouseout", handleOut);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      root.classList.remove("adaptive-pointer");
      release(current);
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("scroll", handleScroll, { capture: true });
      document.removeEventListener("mouseout", handleOut);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [x, y, width, height, radius, opacity, scale, accessoryX, accessoryY]);

  const surface =
    mode === "highlight"
      ? pressed
        ? "bg-foreground/[0.14]"
        : "bg-foreground/[0.08]"
      : "bg-foreground/30 shadow-[0_0_0_1px_hsl(var(--background)/0.5)] contrast-more:bg-foreground/70";

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[100] transition-colors duration-200 ${surface}`}
        style={{ x, y, width, height, borderRadius: radius, opacity, scale }}
      />
      {/* Accessory: a small badge beside the pointer, here meaning "opens in a new tab" */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background shadow-md"
        style={{ x: accessoryX, y: accessoryY }}
        initial={false}
        animate={{ opacity: showAccessory ? 1 : 0, scale: showAccessory ? 1 : 0.5 }}
        transition={spring.snappy}
      >
        <ArrowUpRight size={13} weight="bold" />
      </motion.div>
    </>
  );
};

// Only for a mouse or trackpad, and only when motion is welcome. Everyone else keeps the system pointer.
const AdaptivePointer = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return enabled ? <Pointer /> : null;
};

export default AdaptivePointer;
