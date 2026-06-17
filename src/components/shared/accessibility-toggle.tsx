"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accessibility, X, Minus, Plus,
  Contrast, Moon, BookOpen,
  Zap, AlignLeft, MousePointer2,
  Volume2, Keyboard, Link2, Type,
  RotateCcw,
} from "lucide-react";
import { useTheme } from "next-themes";

// ─── Types ────────────────────────────────────────────────────────────────────

type A11ySettings = {
  textSize: number;        // -2 to 4  (index = textSize + 2 in TEXT_SCALES)
  highContrast: boolean;
  dyslexicFont: boolean;
  reduceMotion: boolean;
  readingAid: boolean;
  largeCursor: boolean;
  tts: boolean;
  keyboardNav: boolean;
  highlightLinks: boolean;
};

const DEFAULTS: A11ySettings = {
  textSize: 0,
  highContrast: false,
  dyslexicFont: false,
  reduceMotion: false,
  readingAid: false,
  largeCursor: false,
  tts: false,
  keyboardNav: false,
  highlightLinks: false,
};

// 7 steps: -2 → 80%, 0 → 100%, +4 → 145%
const TEXT_SCALES = [80, 90, 100, 110, 120, 130, 145];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadSettings(): A11ySettings {
  try {
    const raw = localStorage.getItem("a11y-settings");
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<A11ySettings>) };
  } catch { /* ignore */ }
  return DEFAULTS;
}

function saveSettings(s: A11ySettings) {
  localStorage.setItem("a11y-settings", JSON.stringify(s));
}

function loadDyslexicFont() {
  if (document.getElementById("a11y-lexend")) return;
  const link = Object.assign(document.createElement("link"), {
    id: "a11y-lexend",
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap",
  });
  document.head.appendChild(link);
}

function setCursorStyle(enabled: boolean) {
  const id = "a11y-cursor-style";
  if (!enabled) { document.getElementById(id)?.remove(); return; }
  if (document.getElementById(id)) return;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'><path d='M5 2L5 32L13 24L20 36L26 33L19 21L32 21Z' fill='black' stroke='white' stroke-width='1.5' stroke-linejoin='round'/></svg>`;
  const url = `url("data:image/svg+xml;base64,${btoa(svg)}")`;
  const style = Object.assign(document.createElement("style"), {
    id,
    textContent: `* { cursor: ${url} 5 2, auto !important; }`,
  });
  document.head.appendChild(style);
}

function applySettings(s: A11ySettings) {
  const html = document.documentElement;
  const idx = Math.max(0, Math.min(6, s.textSize + 2));
  html.style.fontSize = idx === 2 ? "" : `${TEXT_SCALES[idx]}%`;
  html.setAttribute("data-a11y-contrast", s.highContrast ? "on" : "off");
  html.setAttribute("data-a11y-dyslexic", s.dyslexicFont ? "on" : "off");
  html.setAttribute("data-a11y-motion", s.reduceMotion ? "reduced" : "off");
  html.setAttribute("data-a11y-reading", s.readingAid ? "on" : "off");
  html.setAttribute("data-a11y-kbd", s.keyboardNav ? "on" : "off");
  html.setAttribute("data-a11y-links", s.highlightLinks ? "on" : "off");
  html.setAttribute("data-a11y-tts", s.tts ? "on" : "off");
  setCursorStyle(s.largeCursor);
  if (s.dyslexicFont) loadDyslexicFont();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 text-left transition hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/70"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-zinc-400 dark:text-zinc-500">{icon}</span>
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      </div>
      <div
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"
        }`}
        aria-hidden="true"
      >
        <div
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
      {children}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AccessibilityToggle() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const { setTheme, resolvedTheme } = useTheme();
  const panelRef = useRef<HTMLDivElement>(null);
  const ttsHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);

  // Init from localStorage on mount
  useEffect(() => {
    const s = loadSettings();
    setSettings(s);
    applySettings(s);
  }, []);

  // TTS click-to-speak handler
  useEffect(() => {
    if (ttsHandlerRef.current) {
      document.removeEventListener("click", ttsHandlerRef.current);
      ttsHandlerRef.current = null;
    }
    if (!settings.tts) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("p, h1, h2, h3, h4, li, a, button, label, span");
      const text = el?.textContent?.trim();
      if (!text || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = "fr-FR";
      window.speechSynthesis.speak(utt);
    };
    ttsHandlerRef.current = handler;
    document.addEventListener("click", handler);
    return () => {
      if (ttsHandlerRef.current) document.removeEventListener("click", ttsHandlerRef.current);
    };
  }, [settings.tts]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 80);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
  }, [open]);

  // Stop TTS on close
  useEffect(() => {
    if (!settings.tts) return;
    return () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  }, [settings.tts]);

  function update(patch: Partial<A11ySettings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveSettings(next);
    applySettings(next);
  }

  function reset() {
    setSettings(DEFAULTS);
    saveSettings(DEFAULTS);
    applySettings(DEFAULTS);
    document.documentElement.style.fontSize = "";
    setCursorStyle(false);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  const scaleLabel = (() => {
    if (settings.textSize === 0) return "Défaut";
    const scale = TEXT_SCALES[Math.max(0, Math.min(6, settings.textSize + 2))];
    return `${scale}%`;
  })();

  const isActive =
    settings.textSize !== 0 || settings.highContrast || settings.dyslexicFont ||
    settings.reduceMotion || settings.readingAid || settings.largeCursor ||
    settings.tts || settings.keyboardNav || settings.highlightLinks;

  return (
    <div ref={panelRef} className="fixed bottom-6 left-6 z-50">
      {/* ── Panel ─────────────────────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="Panneau d'accessibilité"
          className="mb-3 w-72 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Accessibility size={14} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Accessibilité</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le panneau"
              className="rounded-md p-1 text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[72vh] space-y-5 overflow-y-auto p-4">
            {/* Visuel */}
            <section>
              <SectionLabel>Visuel</SectionLabel>
              <div className="space-y-1.5">
                {/* Text size stepper */}
                <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <Type size={14} className="text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Taille du texte</span>
                  </div>
                  <div className="flex items-center gap-1" role="group" aria-label="Taille du texte">
                    <button
                      onClick={() => update({ textSize: Math.max(-2, settings.textSize - 1) })}
                      disabled={settings.textSize === -2}
                      aria-label="Réduire la taille"
                      className="rounded-lg p-1 transition hover:bg-zinc-200 disabled:opacity-30 dark:hover:bg-zinc-700"
                    >
                      <Minus size={12} aria-hidden="true" />
                    </button>
                    <span className="w-14 text-center text-xs font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                      {scaleLabel}
                    </span>
                    <button
                      onClick={() => update({ textSize: Math.min(4, settings.textSize + 1) })}
                      disabled={settings.textSize === 4}
                      aria-label="Agrandir la taille"
                      className="rounded-lg p-1 transition hover:bg-zinc-200 disabled:opacity-30 dark:hover:bg-zinc-700"
                    >
                      <Plus size={12} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <Toggle
                  icon={<Contrast size={14} />}
                  label="Contraste élevé"
                  checked={settings.highContrast}
                  onChange={(v) => update({ highContrast: v })}
                />
                <Toggle
                  icon={<Moon size={14} />}
                  label="Mode sombre"
                  checked={resolvedTheme === "dark"}
                  onChange={(v) => setTheme(v ? "dark" : "light")}
                />
                <Toggle
                  icon={<BookOpen size={14} />}
                  label="Police dyslexie (Lexend)"
                  checked={settings.dyslexicFont}
                  onChange={(v) => update({ dyslexicFont: v })}
                />
              </div>
            </section>

            {/* Lecture */}
            <section>
              <SectionLabel>Lecture</SectionLabel>
              <div className="space-y-1.5">
                <Toggle
                  icon={<Zap size={14} />}
                  label="Réduire les animations"
                  checked={settings.reduceMotion}
                  onChange={(v) => update({ reduceMotion: v })}
                />
                <Toggle
                  icon={<AlignLeft size={14} />}
                  label="Espacement renforcé"
                  checked={settings.readingAid}
                  onChange={(v) => update({ readingAid: v })}
                />
                <Toggle
                  icon={<Link2 size={14} />}
                  label="Mettre en évidence liens & titres"
                  checked={settings.highlightLinks}
                  onChange={(v) => update({ highlightLinks: v })}
                />
              </div>
            </section>

            {/* Navigation */}
            <section>
              <SectionLabel>Navigation</SectionLabel>
              <div className="space-y-1.5">
                <Toggle
                  icon={<MousePointer2 size={14} />}
                  label="Curseur agrandi"
                  checked={settings.largeCursor}
                  onChange={(v) => update({ largeCursor: v })}
                />
                <Toggle
                  icon={<Keyboard size={14} />}
                  label="Navigation clavier améliorée"
                  checked={settings.keyboardNav}
                  onChange={(v) => update({ keyboardNav: v })}
                />
                <Toggle
                  icon={<Volume2 size={14} />}
                  label="Lecture vocale (cliquer pour lire)"
                  checked={settings.tts}
                  onChange={(v) => update({ tts: v })}
                />
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-xs text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <RotateCcw size={11} aria-hidden="true" />
              Réinitialiser tous les paramètres
            </button>
          </div>
        </div>
      )}

      {/* ── Toggle button ──────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Ouvrir le panneau d'accessibilité"
        className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold shadow-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
          isActive || open
            ? "bg-emerald-600 text-white shadow-emerald-500/30"
            : "border border-zinc-200 bg-white text-zinc-600 shadow-zinc-200/60 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:shadow-zinc-900/60 dark:hover:text-zinc-100"
        }`}
      >
        <Accessibility size={15} aria-hidden="true" />
        <span className="hidden sm:inline">Accessibilité</span>
        {isActive && (
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
