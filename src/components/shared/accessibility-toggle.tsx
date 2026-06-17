"use client";

import { useEffect, useState } from "react";
import { Accessibility } from "lucide-react";

export function AccessibilityToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("a11y-mode") === "on";
    setEnabled(stored);
    document.documentElement.setAttribute("data-a11y", stored ? "on" : "off");
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("a11y-mode", next ? "on" : "off");
    document.documentElement.setAttribute("data-a11y", next ? "on" : "off");
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Désactiver le mode accessibilité" : "Activer le mode accessibilité"}
      title={enabled ? "Désactiver le mode accessibilité" : "Activer le mode accessibilité"}
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold shadow-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
        enabled
          ? "bg-emerald-600 text-white shadow-emerald-500/30"
          : "border border-zinc-200 bg-white text-zinc-600 shadow-zinc-200/60 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:shadow-zinc-900/60 dark:hover:text-zinc-100"
      }`}
    >
      <Accessibility size={15} aria-hidden="true" />
      <span className="hidden sm:inline">Accessibilité</span>
    </button>
  );
}
