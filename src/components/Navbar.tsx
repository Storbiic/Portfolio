import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/ThemeControls";
import { scrollToSection, spring } from "@/lib/motion";
import { navItems } from "@/lib/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();

  // Highlight the section crossing the middle of the viewport, so the nav answers "where am I?"
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) setActiveHref(href);
          else setActiveHref((current) => (current === href ? null : current));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(href);
  };

  const logo = (
    <a
      href="#"
      className="text-[17px] font-semibold tracking-[-0.02em]"
      onClick={(e) => {
        e.preventDefault();
        handleNavClick("#");
      }}
    >
      Saad Najar
    </a>
  );

  return (
    <nav className="material fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="container flex h-12 items-center justify-between">
        {logo}

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={`relative rounded-full px-3 py-1.5 text-xs tracking-normal transition-colors hover:text-foreground ${
                activeHref === item.href ? "text-foreground" : "text-foreground/70"
              }`}
            >
              {/* One pill slides between links, so the eye follows where you are */}
              {activeHref === item.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-foreground/[0.07]"
                  transition={spring.snappy}
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          ))}
          <ThemeToggle className="ml-2" />
        </div>

        {/* Mobile Menu: Radix handles focus trapping, Escape and scroll lock.
            It covers the bar in place and the close button sits where the menu button was. */}
        <div className="-mr-2 flex items-center gap-1 lg:hidden">
        <ThemeToggle />
        <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <Dialog.Trigger
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors active:bg-secondary lg:hidden"
            aria-label="Open menu"
          >
            <List className="h-5 w-5" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content
              aria-describedby={undefined}
              className="fixed inset-0 z-[60] overflow-y-auto bg-background pt-[env(safe-area-inset-top)] duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2"
            >
              <div className="container flex h-12 items-center justify-between">
                {logo}
                <Dialog.Close
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors active:bg-secondary"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <div className="container flex flex-col pb-10 pt-6">
                {navItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={activeHref === item.href ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    style={{ animationDelay: `${60 + index * 25}ms` }}
                    className={`py-2 text-[28px] font-semibold tracking-[-0.02em] duration-300 fill-mode-both animate-in fade-in-0 slide-in-from-top-1 transition-colors active:text-foreground/60 ${
                      activeHref === item.href ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        </div>
      </div>

      {/* Reading progress, tracking the scroll position 1:1 */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-system-blue via-system-purple to-system-pink"
        style={{ scaleX: scrollYProgress }}
      />
    </nav>
  );
};

export default Navbar;
