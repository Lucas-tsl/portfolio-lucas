import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio-data";

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Confidentialité" },
  { href: "/accessibilite", label: "Accessibilité" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{profile.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">{profile.title}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            {profile.wordpress && (
              <a
                href={profile.wordpress}
                target="_blank"
                rel="noreferrer"
                aria-label="WordPress"
                className="text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <svg viewBox="0 0 122.52 122.523" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M8.708 61.26c0 20.802 12.089 38.779 29.619 47.298L13.258 39.872a52.354 52.354 0 0 0-4.55 21.388zM96.74 58.608c0-6.495-2.333-10.993-4.334-14.494-2.664-4.329-5.161-7.995-5.161-12.324 0-4.831 3.664-9.328 8.825-9.328.233 0 .454.029.681.042-9.35-8.566-21.807-13.796-35.489-13.796-18.36 0-34.513 9.42-43.91 23.688 1.233.037 2.395.063 3.382.063 5.497 0 14.006-.667 14.006-.667 2.833-.166 3.167 3.994.337 4.329 0 0-2.847.335-6.015.501L48.2 93.547l11.501-34.493-8.188-22.434c-2.83-.166-5.511-.501-5.511-.501-2.832-.166-2.5-4.496.332-4.329 0 0 8.679.667 13.843.667 5.496 0 14.006-.667 14.006-.667 2.835-.166 3.168 3.994.337 4.329 0 0-2.853.335-6.015.501l18.992 56.494 5.242-17.517c2.272-7.269 4.001-12.49 4.001-16.989zM62.184 65.857l-15.768 45.819a52.628 52.628 0 0 0 14.846 2.142 52.5 52.5 0 0 0 17.247-2.902 4.685 4.685 0 0 1-.364-.706zM107.376 36.046a41.67 41.67 0 0 1 .38 5.163c0 5.096-.954 10.827-3.832 17.988l-15.386 44.501c14.984-8.729 25.076-24.902 25.076-43.437a52.547 52.547 0 0 0-6.238-24.215z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} {profile.name}. Tous droits réservés.
          </p>
          <nav className="flex flex-wrap gap-4" aria-label="Liens légaux">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-zinc-400 underline-offset-2 transition hover:text-zinc-700 hover:underline dark:text-zinc-600 dark:hover:text-zinc-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
