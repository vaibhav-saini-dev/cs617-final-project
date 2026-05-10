import Dropdown from "./Dropdown";
import Card from "./Card";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function ExploreSection({ hospitals, conditions, years, hospital, setHospital, bh, setBh, condition, setCondition, condPresent, setCondPresent, year, setYear, selected }) {
  return (
    <AnimatedSection className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-8 py-24 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Explore
        </p>

        <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
          Filter the data yourself.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          Select a hospital, year, condition, or behavioral health group to see
          how the average stay changes.
        </p>

        <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
          <Dropdown
            text="Select Hospital"
            options={hospitals}
            value={hospital}
            onChange={setHospital}
          />

          <Dropdown
            text="Behavioral Health Issues?"
            options={["Behavioral Health Issues?", "Yes", "No"]}
            value={bh}
            onChange={setBh}
          />

          <Dropdown
            text="Condition"
            options={conditions}
            value={condition}
            onChange={setCondition}
          />

          <Dropdown
            text="Condition Present?"
            options={["Condition Present?", "Excess LOS", "No Excess LOS"]}
            value={condPresent}
            onChange={setCondPresent}
          />

          <Dropdown
            text="Year"
            options={years}
            value={year}
            onChange={setYear}
          />
        </div>

        <p className="mt-10 max-w-xl text-zinc-400">
          Source:{" "}
          <a
            className="text-blue-400 hover:underline"
            href="https://www.chiamass.gov/assets/docs/r/Case-Mix-Reports/CMSR-EDD-Legacy-Databook-10-01-2016-to-06-30-2019.xlsx"
            target="_blank"
          >
            Massachusetts Acute Care Hospital Emergency Department Data,
            October 2016 through June 2019
          </a>
        </p>
      </div>

      <div className="flex justify-center lg:justify-end">
        <Card
          hospital={hospital}
          bh={bh}
          condition={condition}
          condPresent={condPresent}
          year={year}
          selected={selected}
        />
      </div>
    </AnimatedSection>
  );
}