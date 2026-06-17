"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Retour en haut de page"
          className="fixed bottom-6 right-6 z-40 hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-lg shadow-zinc-200/50 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:shadow-zinc-900/50 dark:hover:text-zinc-100 md:flex"
        >
          <ArrowUp size={15} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
