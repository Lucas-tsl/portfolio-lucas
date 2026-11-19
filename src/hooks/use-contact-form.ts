"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile";

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
  /** Incrémenté après chaque envoi pour régénérer le jeton Turnstile (usage unique) */
  turnstileResetSignal: number;
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
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  // Heure d'affichage du formulaire : un envoi quasi instantané trahit un robot
  const mountedAtRef = useRef(0);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

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

    const turnstileToken = String(data.get("cf-turnstile-response") ?? "");
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setErrorMessage("Merci de patienter pendant la vérification anti-spam, puis renvoyez le message.");
      return;
    }

    setFieldErrors({});
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          turnstileToken,
          website: String(data.get("website") ?? ""), // pot de miel : rempli seulement par les robots
          elapsedMs: Date.now() - mountedAtRef.current,
        }),
      });

      const result = (await response.json()) as { error?: string; success?: boolean };
      setTurnstileResetSignal((n) => n + 1);

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(typeof result.error === "string" ? result.error : "Une erreur est survenue.");
        return;
      }

      form.reset();
      setSelectedSubject("");
      setStatus("success");
    } catch {
      setTurnstileResetSignal((n) => n + 1);
      setStatus("error");
      setErrorMessage("Impossible de contacter le serveur. Réessayez dans quelques instants.");
    }
  }

  return {
    status,
    errorMessage,
    fieldErrors,
    selectedSubject,
    setSelectedSubject,
    clearFieldError,
    turnstileResetSignal,
    onSubmit,
  };
}
