"use client";

import { FormEvent, useEffect, useState } from "react";

export type FormStatus = "idle" | "loading" | "success" | "error";

export type FieldErrors = {
  subject?: string;
  name?: string;
  email?: string;
  message?: string;
};

export interface ContactFormState {
  status: FormStatus;
  errorMessage: string;
  fieldErrors: FieldErrors;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  clearFieldError: (field: keyof FieldErrors) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

function validate(payload: { name: string; email: string; subject: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!payload.subject) errors.subject = "Veuillez choisir un sujet.";
  if (payload.name.trim().length < 2) errors.name = "Le nom est requis (2 caractères minimum).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) errors.email = "Adresse email invalide.";
  if (payload.message.trim().length < 10) errors.message = "Le message est trop court (10 caractères minimum).";
  return errors;
}

export function useContactForm(): ContactFormState {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(t);
  }, [status]);

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: selectedSubject,
      message: String(data.get("message") ?? ""),
    };

    const errors = validate(payload);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
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

  return { status, errorMessage, fieldErrors, selectedSubject, setSelectedSubject, clearFieldError, onSubmit };
}
