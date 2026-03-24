"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    setDark(!dark);
    if (!dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#eef4ff] dark:hover:bg-[#26313f] transition-colors"
      aria-label={dark ? "라이트 모드" : "다크 모드"}
    >
      <span className="material-symbols-outlined text-lg text-[#727785]" style={{ fontVariationSettings: "'FILL' 1" }}>
        {dark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
