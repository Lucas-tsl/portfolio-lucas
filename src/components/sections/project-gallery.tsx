"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/types/portfolio.types";

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex items-start snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <figure
            key={i}
            className="flex w-[78%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 sm:w-[380px]"
          >
            <div className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="max-h-[480px] w-full object-contain"
              />
            </div>
            {img.caption && (
              <figcaption className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-500">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-3 hidden justify-end gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Capture précédente"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Capture suivante"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
