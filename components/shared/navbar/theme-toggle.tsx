"use client";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { flushSync } from "react-dom";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTheme = resolvedTheme || theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    // Hitung jarak terjauh ke sudut layar agar lingkaran menutupi seluruh layar
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-radius", `${endRadius}px`);
    root.setAttribute("data-theme-transition", "true");

    const transition = document.startViewTransition(() => {
      // 1. Update class DOM secara sinkron agar browser mengambil snapshot tema BARU sebelum animasi berjalan
      if (nextTheme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }

      // 2. Sinkronkan state React
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    try {
      await transition.finished;
    } finally {
      root.removeAttribute("data-theme-transition");
    }
  };

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="p-2 border-2 border-border bg-card hover:bg-secondary transition-colors cursor-pointer shadow-hard"
    >
      {isDark ? (
        <FiSun size={20} className="text-amber-500" />
      ) : (
        <FiMoon size={20} className="text-blue-500" />
      )}
    </button>
  );
}
