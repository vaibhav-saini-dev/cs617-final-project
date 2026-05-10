"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function KeyFindings() {
  const findings = [
    {
      title: "Longer average stays",
      text: "Behavioral health-related visits tend to show higher average lengths of stay.",
    },
    {
      title: "More variation",
      text: "Some stays are short, but others stretch far beyond the typical range.",
    },
    {
      title: "System pressure",
      text: "Long waits may reflect limited psychiatric beds, placement delays, and emergency department crowding.",
    },
  ];

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-8 py-20">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Key Pattern
        </p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
          Patterns behind the charts.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {findings.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/4 p-6 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-4 leading-7 text-zinc-400">{item.text}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}