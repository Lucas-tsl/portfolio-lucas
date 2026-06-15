"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
    };

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string; success?: boolean };
      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "Une erreur est survenue.");
        return;
      }

      form.reset();
      setStatus("success");
      setMessage("Message envoyé avec succès !");
    } catch {
      setStatus("error");
      setMessage("Impossible de contacter le serveur actuellement.");
    }
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-14">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">Contact</h2>
      <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Nom</span>
          <input name="name" required minLength={2} className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" placeholder="Ton nom" />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Email</span>
          <input name="email" type="email" required className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" placeholder="ton@email.com" />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Message</span>
          <textarea name="message" required minLength={10} rows={5} className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" placeholder="Dis-moi ton besoin..." />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" disabled={status === "loading"} className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
            {status === "loading" ? "Envoi..." : "Envoyer"}
          </button>
          {message ? (
            <p className={`text-sm ${status === "error" ? "text-red-600 dark:text-red-400" : "text-emerald-700 dark:text-emerald-400"}`}>
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
