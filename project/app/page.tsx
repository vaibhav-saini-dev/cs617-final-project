"use client";

import { useEffect, useMemo, useState } from "react";
import Dropdown from "./components/Dropdown";
import Card from "./components/Card";
import BHComparisonChart from "./components/BHComparisonChart.js";
import YearComparisonChart from "./components/YearComparisonChart.js";
import BoxComparisonChart from "./components/BoxComparisonChart.js";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [hospital, setHospital] = useState("Select Hospital");
  const [bh, setBh] = useState("Behavioral Health Issues?");
  const [condition, setCondition] = useState("Condition");
  const [condPresent, setCondPresent] = useState("Condition Present?");
  const [year, setYear] = useState("Year");

  useEffect(() => {
    fetch("/data/hospital_data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const selected = useMemo(() => {
    return data.filter((row) => {
      const hospitalMatch = hospital === "Select Hospital" || row.Hospital === hospital;
      const bhMatch = bh === "Behavioral Health Issues?" || row.bh === bh;
      const conditionMatch = condition === "Condition" || row.Condition === condition;
      const condPresMatch = condPresent === "Condition Present?" || row["Condition Present"] === condPresent;
      const yearMatch = String(year) === "Year" || String(row["Federal Fiscal Year"]) === String(year);

      return hospitalMatch && bhMatch && conditionMatch && condPresMatch && yearMatch;
    });
  }, [data, hospital, bh, condition, condPresent, year]);

  const hospitals = useMemo(() => ["Select Hospital", ...Array.from(new Set(data.map((row) => row.Hospital))).sort()], [data]);

  const conditions = useMemo(() => ["Condition", ...Array.from(new Set(data.map((row) => row.Condition))).sort()],[data]);

  const years = useMemo(() => ["Year", ...Array.from(new Set(data.map((row) => row["Federal Fiscal Year"]))).sort()],[data]);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight lg:text-5xl">
            When Healing Takes Longer: Behavioral Health Impact On Hospital Stay Lengths
          </h1>

          <div className="grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
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

          <p className="max-w-xl text-lg text-zinc-400">
            Source:{" "}
            <a
              className="text-blue-400 hover:underline"
              href="https://www.chiamass.gov/assets/docs/r/Case-Mix-Reports/CMSR-EDD-Legacy-Databook-10-01-2016-to-06-30-2019.xlsx"
              target="_blank"
            >
              Massachusetts Acute Care Hospital Emergency Department Data October 2016 through June
              2019
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
      </section>

      <section className="mx-auto w-full max-w-7xl px-8 pb-24">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-2">
          <div className="flex justify-center">
            <BHComparisonChart
              data={data}
              hospital={hospital}
              condition={condition}
              condPresent={condPresent}
              year={year}
            />
          </div>

          <div className="flex justify-center">
            <YearComparisonChart
              data={data}
              hospital={hospital}
              bh={bh}
              condition={condition}
              condPresent={condPresent}
            />
          </div>

          <div className="flex justify-center xl:col-span-2">
            <BoxComparisonChart
              data={data}
              hospital={hospital}
              condition={condition}
              condPresent={condPresent}
              year={year}
            />
          </div>
        </div>
      </section>
    </main>
  );
}