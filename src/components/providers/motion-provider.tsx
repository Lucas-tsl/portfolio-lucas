"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";

// Le moteur d'animation est téléchargé après le premier rendu : il ne bloque plus le chargement.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

/**
 * `strict` : interdit les composants `motion.*` complets (qui ré-embarqueraient tout le moteur).
 * Les composants importent `m as motion` depuis framer-motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
