"use client";

import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio-data";
import type { SkillGroup } from "@/types/portfolio.types";

const SHORT_LABELS: Record<string, string> = {
  "Développement Web":              "Dev Web",
  "Bases de données":               "BDD",
  "CMS & E-commerce":               "CMS / E-com",
  "SEO & Performance":              "SEO / Perf",
  "Data & Intelligence Artificielle": "Data & IA",
  "Gestion de projet":              "Gestion",
};

const CATEGORY_COLOR: Record<string, string> = {
  "Développement Web":              "#10b981", // emerald-500
  "Bases de données":               "#14b8a6", // teal-500
  "CMS & E-commerce":               "#f97316", // orange-500
  "SEO & Performance":              "#84cc16", // lime-500
  "Data & Intelligence Artificielle": "#f59e0b", // amber-500
  "Gestion de projet":              "#94a3b8", // slate-400
};

const radarData = skillGroups.map((g) => ({
  subject: g.category,
  level: g.level,
  fullMark: 100,
  group: g,
}));

interface TooltipPayload {
  payload?: { group: SkillGroup; level: number };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  if (!data) return null;
  const { group, level } = data;
  const color = CATEGORY_COLOR[group.category] ?? "#10b981";

  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{group.category}</p>
      <p className="mt-0.5 text-sm font-bold text-zinc-900 dark:text-zinc-100">{group.name}</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div className="h-full rounded-full transition-all" style={{ width: `${level}%`, background: color }} />
        </div>
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{level}%</span>
      </div>
      <p className="mt-2 text-xs text-zinc-500">{group.focus}</p>
    </div>
  );
}

export function SkillsRadarChart() {
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      aria-label="Radar chart des compétences"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        Vue d&apos;ensemble
      </p>
      <h3 className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Niveau par domaine
      </h3>

      {/* Radar */}
      <div className="mt-4 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 8, right: 28, bottom: 8, left: 28 }}>
            <PolarGrid
              stroke="currentColor"
              className="text-zinc-200 dark:text-zinc-700"
              strokeWidth={1}
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={({ x, y, payload, textAnchor }) => {
                const label = SHORT_LABELS[payload.value as string] ?? payload.value;
                const isActive = hoveredSubject === payload.value;
                const color = CATEGORY_COLOR[payload.value as string] ?? "#10b981";
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill={isActive ? color : "currentColor"}
                    fontSize={10}
                    fontWeight={isActive ? 700 : 400}
                    className={isActive ? "" : "text-zinc-500 dark:text-zinc-400"}
                  >
                    {label}
                  </text>
                );
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Radar
              name="Niveau"
              dataKey="level"
              stroke="#059669"
              fill="#059669"
              fillOpacity={0.15}
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props as { cx?: number; cy?: number; payload: { subject: string; group: SkillGroup } };
                if (cx == null || cy == null) return <g key={payload.subject} />;
                const isActive = hoveredSubject === payload.subject;
                const color = CATEGORY_COLOR[payload.subject] ?? "#059669";
                return (
                  <circle
                    key={payload.subject}
                    cx={cx}
                    cy={cy}
                    r={isActive ? 5 : 3}
                    fill={isActive ? color : "#059669"}
                    stroke="white"
                    strokeWidth={1.5}
                    className="transition-all duration-150 dark:stroke-zinc-900"
                  />
                );
              }}
              activeDot={false}
              onMouseEnter={(data) => setHoveredSubject((data as { subject?: string })?.subject ?? null)}
              onMouseLeave={() => setHoveredSubject(null)}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Barres horizontales — lisibilité */}
      <ul className="mt-5 space-y-3" aria-label="Niveaux par domaine">
        {skillGroups.map((g, i) => {
          const isActive = hoveredSubject === g.category;
          const color = CATEGORY_COLOR[g.category] ?? "#10b981";
          const label = SHORT_LABELS[g.category] ?? g.category;
          return (
            <motion.li
              key={g.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              onMouseEnter={() => setHoveredSubject(g.category)}
              onMouseLeave={() => setHoveredSubject(null)}
              className="cursor-default"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {label}
                </span>
                <span className="font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                  {g.level}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color, opacity: isActive ? 1 : 0.7 }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${g.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                />
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
