"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { contactSubjects } from "@/data/portfolio-data";
import { useContactForm } from "@/hooks/use-contact-form";

const inputClass =
  "rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800 placeholder:text-zinc-400";

export function ContactSection() {
  const { status, errorMessage, selectedSubject, setSelectedSubject, onSubmit } = useContactForm();

  const activeSubject = contactSubjects.find((s) => s.value === selectedSubject);

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto w-full max-w-6xl px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="contact-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
          Contact
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Une question, un projet ou une collaboration en tête ? Sélectionnez le sujet qui correspond le mieux et je reviens vers vous rapidement.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Formulaire */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="grid gap-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          aria-label="Formulaire de contact"
          noValidate
        >
          {/* Sujet */}
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Sujet de la demande <span aria-hidden="true" className="text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {contactSubjects.map((subject) => (
                <label
                  key={subject.value}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                    selectedSubject === subject.value
                      ? "border-zinc-900 bg-zinc-950 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="subject"
                    value={subject.value}
                    required
                    className="sr-only"
                    onChange={() => setSelectedSubject(subject.value)}
                    checked={selectedSubject === subject.value}
                  />
                  {subject.label}
                </label>
              ))}
            </div>
            {activeSubject && (
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">{activeSubject.description}</p>
            )}
          </fieldset>

          {/* Nom + Email côte à côte */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                Nom <span aria-hidden="true" className="text-red-500">*</span>
              </span>
              <input
                name="name"
                required
                minLength={2}
                aria-required="true"
                className={inputClass}
                placeholder="Votre nom"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                Email <span aria-hidden="true" className="text-red-500">*</span>
              </span>
              <input
                name="email"
                type="email"
                required
                aria-required="true"
                className={inputClass}
                placeholder="votre@email.com"
              />
            </label>
          </div>

          {/* Message */}
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Message <span aria-hidden="true" className="text-red-500">*</span>
            </span>
            <textarea
              name="message"
              required
              minLength={10}
              aria-required="true"
              rows={5}
              className={inputClass}
              placeholder="Décrivez votre besoin, projet ou question..."
            />
          </label>

          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.button
              type="submit"
              disabled={status === "loading" || status === "success"}
              whileTap={status === "idle" ? { scale: 0.97 } : {}}
              className={`relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${
                status === "success"
                  ? "bg-emerald-600 text-white dark:bg-emerald-500"
                  : "bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              }`}
              aria-live="polite"
              aria-label={
                status === "loading"
                  ? "Envoi en cours"
                  : status === "success"
                  ? "Message envoyé avec succès"
                  : "Envoyer le message"
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "loading" && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Envoi en cours…
                  </motion.span>
                )}
                {status === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} aria-hidden="true" />
                    Message envoyé !
                  </motion.span>
                )}
                {(status === "idle" || status === "error") && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2"
                  >
                    <Send size={15} aria-hidden="true" />
                    Envoyer le message
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Message d'erreur uniquement */}
            <AnimatePresence>
              {status === "error" && errorMessage && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="text-sm text-red-600 dark:text-red-400"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Confirmation success inline sous le form */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                role="status"
                aria-live="polite"
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-900/20 dark:text-emerald-300">
                  <strong>Votre message a bien été envoyé.</strong> Un email de confirmation vous a été adressé. Je vous recontacte dans les meilleurs délais.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Panneau latéral */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
          className="flex flex-col gap-4"
        >
          {activeSubject && activeSubject.skills.length > 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Compétences associées
              </p>
              <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">{activeSubject.label}</p>
              <p className="mt-1.5 text-xs leading-5 text-zinc-500 dark:text-zinc-500">
                {activeSubject.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeSubject.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-200 p-5 text-center dark:border-zinc-800">
              <p className="text-xs text-zinc-400 dark:text-zinc-600">
                Sélectionnez un sujet pour voir les compétences associées
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Contact direct</p>
            <a
              href="mailto:troteseil.lucas@gmail.com"
              className="mt-2 block text-sm font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
            >
              troteseil.lucas@gmail.com
            </a>
            <p className="mt-3 text-xs leading-5 text-zinc-500 dark:text-zinc-500">
              Basé à Bordeaux · Disponible pour des missions freelance et collaborations.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
