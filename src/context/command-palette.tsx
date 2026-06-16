"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CommandPaletteCtx {
  open: boolean;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteCtx>({
  open: false,
  openPalette: () => {},
  closePalette: () => {},
  togglePalette: () => {},
});

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const ctx: CommandPaletteCtx = {
    open,
    openPalette: () => setOpen(true),
    closePalette: () => setOpen(false),
    togglePalette: () => setOpen((o) => !o),
  };

  return (
    <CommandPaletteContext.Provider value={ctx}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}
