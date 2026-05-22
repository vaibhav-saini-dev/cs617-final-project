"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import BHComparisonChart from "./BHComparisonChart";
import YearComparisonChart from "./YearComparisonChart";
import BoxComparisonChart from "./BoxComparisonChart";

export default function ChartSection({ data, hospital, bh, year }) {
  return (
    <AnimatedSection className="mx-auto w-full max-w-7xl px-8 py-24">
      <div className="mb-14 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Evidence
        </p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
          The data shows how behavioral health changes the shape of a hospital stay.
        </h2>
        <p className="mt-6 text-lg leading-8 text-zinc-300">
          The charts below compare average length of stay, yearly patterns, and consistency across patient groups.
          <br /><br />
          Filtering data in the "Explore" section above updates these graphs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 xl:grid-cols-2">
        {[
          <BHComparisonChart data={data} hospital={hospital} year={year} />,
          <YearComparisonChart data={data} hospital={hospital} bh={bh} />,
          <BoxComparisonChart data={data} hospital={hospital} year={year} />,
        ].map((chart, index) => (
          <motion.div
            key={index}
            className={`rounded-3xl border border-white/10 bg-white/4 p-4 shadow-2xl shadow-blue-950/20 backdrop-blur ${index === 2 ? "xl:col-span-2" : ""}`}
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.12, duration: 0.7 }}
          >
            {chart}
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}