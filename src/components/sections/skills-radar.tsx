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

const radarData = skillGroups.map((g) => ({
  subject: g.category,
  level: g.level,
  fullMark: 100,
  group: g,
}));

// Short labels for the radar axes (avoids overflow on small screens)
const SHORT_LABELS: Record<string, string> = {
  "Développement Web": "Dev Web",
  "Bases de données": "Bases de données",
  "CMS & E-commerce": "CMS / E-com",
  "SEO & Performance": "SEO / Perf",
  "Data & Intelligence Artificielle": "Data & IA",
  "Gestion de projet": "Gestion projet",
};

interface TooltipPayload {
  payload?: { group: SkillGroup; level: number };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  if (!data) return null;
  const { group, level } = data;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{group.category}</p>
      <p className="mt-0.5 text-sm font-bold text-zinc-900 dark:text-zinc-100">{group.name}</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-100"
            style={{ width: `${level}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{level}%</span>
      </div>
      <p className="mt-2 text-xs text-zinc-500">{group.focus}</p>
    </div>
  );
}

function ActiveDot({
  cx,
  cy,
  group,
  isHovered,
}: {
  cx?: number;
  cy?: number;
  group: SkillGroup;
  isHovered: boolean;
}) {
  if (cx == null || cy == null) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={isHovered ? 6 : 4}
      fill={isHovered ? "#18181b" : "white"}
      stroke="#18181b"
      strokeWidth={2}
      className="transition-all duration-200 dark:fill-zinc-100 dark:stroke-zinc-100"
      aria-label={`${group.category} : ${group.level}%`}
    />
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
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
        Vue d&apos;ensemble
      </p>
      <h3 className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Niveau par domaine
      </h3>

      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid
              stroke="currentColor"
              className="text-zinc-200 dark:text-zinc-700"
              strokeWidth={1}
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={({ x, y, payload, textAnchor }) => {
                const label = SHORT_LABELS[payload.value as string] ?? payload.value;
                const isHovered = hoveredSubject === payload.value;
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill="currentColor"
                    className={`text-[10px] transition-all ${
                      isHovered
                        ? "font-semibold text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-500 dark:text-zinc-500"
                    }`}
                    fontSize={10}
                    fontWeight={isHovered ? 600 : 400}
                  >
                    {label}
                  </text>
                );
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />
            <Radar
              name="Niveau"
              dataKey="level"
              stroke="#18181b"
              fill="#18181b"
              fillOpacity={0.12}
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props as { cx: number; cy: number; payload: { subject: string; group: SkillGroup } };
                return (
                  <ActiveDot
                    key={payload.subject}
                    cx={cx}
                    cy={cy}
                    group={payload.group}
                    isHovered={hoveredSubject === payload.subject}
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

      {/* Legend */}
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3" aria-label="Légende">
        {skillGroups.map((g) => (
          <li
            key={g.id}
            className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" aria-hidden="true" />
            <span className={hoveredSubject === g.category ? "font-semibold text-zinc-900 dark:text-zinc-100" : ""}>
              {SHORT_LABELS[g.category] ?? g.category}
            </span>
            <span className="ml-auto font-mono text-[10px]">{g.level}%</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
