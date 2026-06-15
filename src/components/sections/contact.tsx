"use client";

import { FormEvent, useState } from "react";
import { contactSubjects } from "@/data/portfolio-data";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800 placeholder:text-zinc-400";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      subject: String(data.get("subject") || ""),
      message: String(data.get("message") || ""),
    };

    setStatus("loading");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string; success?: boolean };
      if (!response.ok) {
        setStatus("error");
        setFeedbackMessage(typeof result.error === "string" ? result.error : "Une erreur est survenue.");
        return;
      }

      form.reset();
      setSelectedSubject("");
      setStatus("success");
      setFeedbackMessage("Message envoyé avec succès ! Je vous réponds dans les plus brefs délais.");
    } catch {
      setStatus("error");
      setFeedbackMessage("Impossible de contacter le serveur. Réessayez dans quelques instants.");
    }
  }

  const activeSubject = contactSubjects.find((s) => s.value === selectedSubject);

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-14">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">Contact</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        Une question, un projet ou une collaboration en tête ? Sélectionnez le sujet qui correspond le mieux et je reviens vers vous rapidement.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Formulaire */}
        <form
          onSubmit={onSubmit}
          className="grid gap-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          {/* Sujet */}
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">Sujet de la demande</legend>
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
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Nom</span>
              <input
                name="name"
                required
                minLength={2}
                className={inputClass}
                placeholder="Votre nom"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Email</span>
              <input
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="votre@email.com"
              />
            </label>
          </div>

          {/* Message */}
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Message</span>
            <textarea
              name="message"
              required
              minLength={10}
              rows={5}
              className={inputClass}
              placeholder="Décrivez votre besoin, projet ou question..."
            />
          </label>

          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Envoi en cours…
                </span>
              ) : (
                "Envoyer le message"
              )}
            </button>
            {feedbackMessage && (
              <p
                className={`text-sm ${
                  status === "error"
                    ? "text-red-600 dark:text-red-400"
                    : "text-emerald-700 dark:text-emerald-400"
                }`}
              >
                {feedbackMessage}
              </p>
            )}
          </div>
        </form>

        {/* Panneau latéral — compétences du sujet sélectionné */}
        <aside className="flex flex-col gap-4">
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
              href={`mailto:contact@lucastroteseil.com`}
              className="mt-2 block text-sm font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
            >
              contact@lucastroteseil.com
            </a>
            <p className="mt-3 text-xs leading-5 text-zinc-500 dark:text-zinc-500">
              Basé à Bordeaux · Disponible pour des missions freelance et collaborations.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
