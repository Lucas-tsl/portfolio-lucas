"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HUMAN_CHECKS, type HumanCheck } from "@/lib/human-check";

type Props = {
  error?: string;
  /** Passe à true après un envoi réussi : la réponse est effacée */
  cleared: boolean;
  onAnswer: () => void;
};

/**
 * Question anti-robot décalée (« La Terre est ronde ou plate ? »).
 * Champs envoyés avec le formulaire : humanCheckId (caché) et humanCheck (réponse choisie).
 */
export function HumanCheckField({ error, cleared, onAnswer }: Props) {
  // Première question fixe au rendu serveur, puis tirage au sort côté client (évite l'écart d'hydratation)
  const [check, setCheck] = useState<HumanCheck>(HUMAN_CHECKS[0]);
  const [options, setOptions] = useState(HUMAN_CHECKS[0].options);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const picked = HUMAN_CHECKS[Math.floor(Math.random() * HUMAN_CHECKS.length)];
    setCheck(picked);
    setOptions(Math.random() < 0.5 ? picked.options : [picked.options[1], picked.options[0]]);
  }, []);

  useEffect(() => {
    if (cleared) setSelected("");
  }, [cleared]);

  const isRight = selected !== "" && selected === check.answer;
  const isWrong = selected !== "" && !isRight;

  return (
    <fieldset className="grid gap-2 text-sm">
      <legend className="mb-1.5 font-medium text-zinc-700 dark:text-zinc-300">
        Petite vérification anti-robot <span aria-hidden="true" className="text-red-500">*</span>
      </legend>
      <p className="text-zinc-600 dark:text-zinc-400">{check.question}</p>
      <input type="hidden" name="humanCheckId" value={check.id} />

      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const active = selected === option.value;
          const tone = !active
            ? "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700"
            : option.value === check.answer
              ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-200"
              : "border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-600 dark:bg-amber-950/30 dark:text-amber-200";
          return (
            <motion.label
              key={option.value}
              whileTap={{ scale: 0.96 }}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-500 ${tone}`}
            >
              <input
                type="radio"
                name="humanCheck"
                value={option.value}
                checked={active}
                onChange={() => {
                  setSelected(option.value);
                  onAnswer();
                }}
                className="sr-only"
              />
              <span aria-hidden="true" className="text-lg leading-none">
                {option.emoji}
              </span>
              {option.label}
            </motion.label>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {isRight && (
          <motion.p
            key="right"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="text-xs text-emerald-700 dark:text-emerald-400"
          >
            {check.rightMessage}
          </motion.p>
        )}
        {isWrong && (
          <motion.p
            key="wrong"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="text-xs text-amber-700 dark:text-amber-400"
          >
            {check.wrongMessage}
          </motion.p>
        )}
        {!selected && error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="text-xs text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </fieldset>
  );
}
