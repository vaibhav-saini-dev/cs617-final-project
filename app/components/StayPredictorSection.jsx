"use client";

import { useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import StayDistributionChart from "./StayDistributionChart";
import AnimatedSection from "./AnimatedSection";
import {
  getHospitalNames,
  getStayDistribution,
} from "../../lib/stayDistribution";

const PLACEHOLDER_HOSPITAL = "Select a hospital";
const PLACEHOLDER_BH = "Behavioral health issue?";

export default function StayPredictorSection({ data }) {
  const [hospital, setHospital] = useState(PLACEHOLDER_HOSPITAL);
  const [bh, setBh] = useState(PLACEHOLDER_BH);

  const hospitals = useMemo(
    () => [PLACEHOLDER_HOSPITAL, ...getHospitalNames(data)],
    [data]
  );

  const bhOptions = [PLACEHOLDER_BH, "Yes", "No"];

  const ready =
    hospital !== PLACEHOLDER_HOSPITAL && (bh === "Yes" || bh === "No");

  const distribution = useMemo(() => {
    if (!ready) return null;
    return getStayDistribution(data, hospital, bh);
  }, [data, hospital, bh, ready]);

  return (
    <AnimatedSection className="mx-auto w-full max-w-7xl px-8 py-24">
      <div className="mb-14 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Length of stay predictor
        </p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
          How long might your visit last?
        </h2>
        <p className="mt-6 text-lg leading-8 text-zinc-300">
          Choose a hospital and whether the visit involves behavioral health. The
          chart shows the estimated chance your emergency stay falls in each time
          window, based on Massachusetts ED data from 2016–2019.
        </p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Hospital
          </p>
          <Dropdown
            options={hospitals}
            value={hospital}
            onChange={setHospital}
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Behavioral health issue
          </p>
          <Dropdown options={bhOptions} value={bh} onChange={setBh} />
        </div>
      </div>

      <div className="mt-12">
        {!ready && (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-8 py-16 text-center text-zinc-400">
            Select a hospital and behavioral health option to view the
            probability distribution.
          </div>
        )}

        {ready && distribution && (
          <StayDistributionChart
            labels={distribution.labels}
            probabilities={distribution.probabilities}
            hospital={hospital}
            bh={bh}
          />
        )}

        {ready && !distribution && (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-16 text-center text-zinc-400">
            No distribution data found for this combination.
          </div>
        )}
      </div>

      <p className="mt-10 max-w-2xl text-sm text-zinc-500">
        Probabilities are derived from share of visits exceeding 4, 6, 8, 12, and
        24 hour thresholds in the source dataset, averaged across fiscal years.
      </p>
    </AnimatedSection>
  );
}
