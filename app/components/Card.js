import React, { useEffect, useState } from 'react'
import Image from 'next/image';
// Source: https://v1.tailwindcss.com/components/cards

const Card = ({ hospital, bh, year, selected }) => {
  const [avg, setAvg] = useState(0);
  const [showExtra, setShowExtra] = useState(false);
  const [std, setStd] = useState(0);
  const [longestStay, setLongestStay] = useState(0);
  const [shortestStay, setShortestStay] = useState(0);

  useEffect(() => {
    const values = selected
      .map((row) => Number(row["Average Length of Stay"]))
      .filter((value) => !isNaN(value));

    if (values.length === 0) {
      setAvg(0);
      setStd(0);
      setLongestStay(0);
      setShortestStay(0);
      return;
    }

    const total = values.reduce((sum, value) => sum + value, 0);
    const average = total / values.length;

    if (showExtra) {
      const minStay = Math.min(...values);
      const maxStay = Math.max(...values);

      const variance =
        values.reduce((sum, value) => {
          return sum + Math.pow(value - average, 2);
        }, 0) / values.length;

      setStd(Math.sqrt(variance).toFixed(2));
      setLongestStay(maxStay.toFixed(2));
      setShortestStay(minStay.toFixed(2));
    }

    setAvg(average.toFixed(2));
  }, [selected, showExtra]);

  useEffect(() => {
    if (hospital !== "Select Hospital" && bh !== "Behavioral Health Issues?" && String(year) !== "Year") {
      setShowExtra(false);
    } else {
      setShowExtra(true);
    }
  }, [hospital, bh, year]);

  return (
    <div
      className="
        w-full max-w-md rounded-3xl border border-white/10
        bg-white/8 p-8 text-white shadow-2xl shadow-black/40
        backdrop-blur-xl
      "
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
        Average Stay
      </p>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-5xl font-bold tracking-tight">{avg}</span>
        <span className="pb-2 text-xl text-zinc-300">hours</span>
      </div>

      {showExtra && (
        <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
          <div className="flex justify-between gap-6 text-sm">
            <span className="text-zinc-400">Standard Deviation</span>
            <span className="font-semibold text-white">±{std} hours</span>
          </div>

          <div className="flex justify-between gap-6 text-sm">
            <span className="text-zinc-400">Longest Stay</span>
            <span className="font-semibold text-white">{longestStay} hours</span>
          </div>

          <div className="flex justify-between gap-6 text-sm">
            <span className="text-zinc-400">Shortest Stay</span>
            <span className="font-semibold text-white">{shortestStay} hours</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;