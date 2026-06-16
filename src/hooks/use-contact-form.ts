"use client";

import { FormEvent, useEffect, useState } from "react";

export type FormStatus = "idle" | "loading" | "success" | "error";

export interface ContactFormState {
  status: FormStatus;
  errorMessage: string;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useContactForm(): ContactFormState {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(t);
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(typeof result.error === "string" ? result.error : "Une erreur est survenue.");
        return;
      }

      form.reset();
      setSelectedSubject("");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Impossible de contacter le serveur. Réessayez dans quelques instants.");
    }
  }

  return { status, errorMessage, selectedSubject, setSelectedSubject, onSubmit };
}
