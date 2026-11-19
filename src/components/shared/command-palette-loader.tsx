"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCommandPalette } from "@/context/command-palette";

// La palette (et les données projets qu'elle embarque) n'est téléchargée qu'au premier usage
const CommandPalette = dynamic(() => import("./command-palette").then((mod) => mod.CommandPalette), {
  ssr: false,
});

export function CommandPaletteLoader() {
  const { open, openPalette } = useCommandPalette();
  const [loaded, setLoaded] = useState(false);

  // Ouverture via le bouton de la navbar
  useEffect(() => {
    if (open) setLoaded(true);
  }, [open]);

  // Raccourci ⌘K / Ctrl+K tant que la palette n'est pas chargée (ensuite elle gère son propre raccourci)
  useEffect(() => {
    if (loaded) return;
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openPalette();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loaded, openPalette]);

  return loaded ? <CommandPalette /> : null;
}
