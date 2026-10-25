import type { Config } from "tailwindcss";

// System font first: SF Pro on Apple devices (with optical sizing), Inter elsewhere
const systemStack = [
  "-apple-system",
  "BlinkMacSystemFont",
  '"SF Pro Text"',
  '"SF Pro Display"',
  "Inter",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
];

// Editorial accent words: Instrument Serif everywhere, so Safari and Chrome match
const serifStack = ['"Instrument Serif"', '"New York"', "ui-serif", "Georgia", "serif"];

// Labels, dates and meta: Geist Mono, then the platform's mono
const monoStack = ['"Geist Mono"', "ui-monospace", '"SF Mono"', "Menlo", "monospace"];

export default {
  // A class on <html>, set before first paint from the saved choice or the system setting
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
      },
      // Content measure close to apple.com's ~1000px column
      screens: {
        xl: "1144px",
      },
    },
    extend: {
      fontFamily: {
        sans: systemStack,
        display: systemStack,
        serif: serifStack,
        mono: monoStack,
      },
      // Tracking and leading change with size: tight on large type, near zero on body
      fontSize: {
        display: ["clamp(3rem, 8vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" }],
        headline: ["clamp(2.25rem, 5vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.022em", fontWeight: "600" }],
        lede: ["clamp(1.1875rem, 2.2vw, 1.5rem)", { lineHeight: "1.35", letterSpacing: "-0.012em", fontWeight: "500" }],
        title: ["1.3125rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        body: ["1.0625rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        link: "hsl(var(--link))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        system: {
          blue: "hsl(var(--system-blue) / <alpha-value>)",
          indigo: "hsl(var(--system-indigo) / <alpha-value>)",
          purple: "hsl(var(--system-purple) / <alpha-value>)",
          pink: "hsl(var(--system-pink) / <alpha-value>)",
          orange: "hsl(var(--system-orange) / <alpha-value>)",
          green: "hsl(var(--system-green) / <alpha-value>)",
          teal: "hsl(var(--system-teal) / <alpha-value>)",
          red: "hsl(var(--system-red) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Large content tiles, as on apple.com
        tile: "1.75rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
