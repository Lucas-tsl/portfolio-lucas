import {
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siWordpress,
  siWoocommerce,
  siMysql,
  siPostgresql,
  siMongodb,
  siPrisma,
  siTailwindcss,
  siFramer,
  siPython,
  siGithub,
  siGithubcopilot,
  siFigma,
  siGoogleanalytics,
  siGoogletagmanager,
  siCanvas,
  siExpress,
  siHtml5,
  siCss,
  siElementor,
  siVercel,
  siResend,
  siAnthropic,
  siGooglecloud,
  siGooglesearchconsole,
  siPrestashop,
  siLighthouse,
} from "simple-icons";

type SI = { svg: string; hex: string; title: string };

const ICON_MAP: Record<string, SI> = {
  // JS / TS
  javascript:       siJavascript,
  js:               siJavascript,
  typescript:       siTypescript,
  ts:               siTypescript,

  // Frontend
  react:            siReact,
  "next.js":        siNextdotjs,
  "next.js 15":     siNextdotjs,
  "next.js 16":     siNextdotjs,
  html5:            siHtml5,
  html:             siHtml5,
  css3:             siCss,
  css:              siCss,
  "tailwind css":   siTailwindcss,
  "tailwind css v4":siTailwindcss,
  "framer motion":  siFramer,

  // Backend / Runtime
  "node.js":        siNodedotjs,
  php:              siPhp,
  express:          siExpress,
  prisma:           siPrisma,
  sql:              siMysql,

  // CMS / E-commerce
  wordpress:        siWordpress,
  woocommerce:      siWoocommerce,
  prestashop:       siPrestashop,
  elementor:        siElementor,

  // Databases
  mysql:            siMysql,
  postgresql:       siPostgresql,
  mongodb:          siMongodb,

  // Tools / Design
  github:           siGithub,
  figma:            siFigma,
  canva:            siCanvas,
  vercel:           siVercel,
  resend:           siResend,

  // Analytics / SEO
  "google analytics 4":     siGoogleanalytics,
  "google analytics":        siGoogleanalytics,
  "google tag manager":      siGoogletagmanager,
  "google data studio":      siGooglecloud,
  "google merchant center":  siGooglecloud,
  "google search console":   siGooglesearchconsole,
  "pagespeed insights":      siLighthouse,
  lighthouse:                siLighthouse,

  // AI
  claude:              siAnthropic,
  "chatgpt / gpt-4":  siAnthropic,  // OpenAI icon n'est pas dans simple-icons — on fallback
  "chatgpt":           siAnthropic,
  "github copilot":    siGithubcopilot,
  python:              siPython,
};

interface TechIconProps {
  name: string;
  size?: number;
  showLabel?: boolean;
  color?: string;
  className?: string;
}

export function TechIcon({ name, size = 16, showLabel = false, color, className = "" }: TechIconProps) {
  const key = name.toLowerCase();
  const icon = ICON_MAP[key];

  if (!icon) {
    if (showLabel) return <span className={`text-xs text-zinc-600 dark:text-zinc-400 ${className}`}>{name}</span>;
    return null;
  }

  const fill = color ?? `#${icon.hex}`;
  // Strip outer <svg> tag and <title> element (title contributes to textContent)
  const innerSvg = icon.svg
    .replace(/<svg[^>]*>/, "")
    .replace("</svg>", "")
    .replace(/<title>[^<]*<\/title>/, "");

  const svgEl = (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      className="shrink-0"
      dangerouslySetInnerHTML={{ __html: innerSvg }}
    />
  );

  if (!showLabel) return svgEl;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {svgEl}
      <span className="text-xs">{name}</span>
    </span>
  );
}

const ABBREV_MAP: Record<string, string> = {
  javascript:              "JS",
  js:                      "JS",
  typescript:              "TS",
  ts:                      "TS",
  react:                   "React",
  "next.js":               "Next",
  "next.js 15":            "Next 15",
  "next.js 16":            "Next 16",
  html5:                   "HTML",
  html:                    "HTML",
  css3:                    "CSS",
  css:                     "CSS",
  "tailwind css":          "TW",
  "tailwind css v4":       "TW v4",
  "framer motion":         "Framer",
  "node.js":               "Node",
  php:                     "PHP",
  express:                 "Express",
  prisma:                  "Prisma",
  sql:                     "SQL",
  wordpress:               "WP",
  woocommerce:             "WC",
  prestashop:              "PS",
  elementor:               "Elementor",
  mysql:                   "MySQL",
  postgresql:              "PSQL",
  mongodb:                 "Mongo",
  github:                  "GitHub",
  figma:                   "Figma",
  canva:                   "Canva",
  vercel:                  "Vercel",
  resend:                  "Resend",
  "google analytics 4":    "GA4",
  "google analytics":      "GA",
  "google tag manager":    "GTM",
  "google data studio":    "GDS",
  "google merchant center":"GMC",
  "google search console": "GSC",
  "pagespeed insights":    "PSI",
  lighthouse:              "LH",
  claude:                  "Claude",
  "chatgpt / gpt-4":       "GPT-4",
  chatgpt:                 "GPT",
  "github copilot":        "Copilot",
  python:                  "Python",
};

export function getTechAbbrev(name: string): string {
  return ABBREV_MAP[name.toLowerCase()] ?? name;
}

export function hasTechIcon(name: string): boolean {
  return name.toLowerCase() in ICON_MAP;
}
