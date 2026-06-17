"use client";

import { useState } from "react";
import { Check, Copy, Linkedin, Twitter } from "lucide-react";

export function BlogShare({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Partager</span>
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur X (Twitter)"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
      >
        <Twitter size={14} />
      </a>
      <a
        href={liUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur LinkedIn"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
      >
        <Linkedin size={14} />
      </a>
      <button
        onClick={copyLink}
        aria-label="Copier le lien"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
      >
        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
      </button>
    </div>
  );
}
