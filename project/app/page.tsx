"use client";

import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import Card from "./components/Card";
import BHComparisonChart from "./components/BHComparisonChart.js";

export default function Home() {
  const [data, setData] = useState([]);
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

  const selected = data.filter((row) => {
    const hospitalMatch = hospital === "Select Hospital" || row.Hospital === hospital;

    const bhMatch = bh === "Behavioral Health Issues?" || row.bh === bh;

    const conditionMatch = condition === "Condition" || row.Condition === condition;

    const condPresMatch = condPresent === "Condition Present?" || row["Condition Present"] === condPresent;

    const yearMatch = String(year) === "Year" || String(row["Federal Fiscal Year"]) === String(year);

    return hospitalMatch && bhMatch && conditionMatch && condPresMatch && yearMatch;
  });

  useEffect(() => {
    console.log("Hospital: ", hospital);
    console.log("BH: ", bh);
    console.log("Condition: ", condition);
    console.log("Condition Present: ", condPresent);
    console.log("Year: ", year)
    console.log(" ");
  }, [hospital, bh, condition, condPresent, year]);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-8 py-20">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">

          <div className="flex flex-col items-start gap-8">
            <h1 className="max-w-3xl text-4xl font-semibold">
              When Healing Takes Longer: Behavioral Health Impact On Hospital Stay Lengths
            </h1>

            <div className="flex flex-col gap-5">
              <Dropdown
                text="Select Hospital"
                options={["Select Hospital", ...new Set(data.map((row) => row.Hospital))]}
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
                options={["Condition", ...new Set(data.map((row) => row.Condition))]}
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
                options={["Year", ...new Set(data.map((row) => row["Federal Fiscal Year"]))]}
                value={year}
                onChange={setYear}
              />
            </div>

            <p className="max-w-xl text-lg text-zinc-400">
              Source:{" "}
              <a
                className="text-blue-400 hover:underline"
                href="https://www.chiamass.gov/assets/docs/r/Case-Mix-Reports/CMSR-EDD-Legacy-Databook-10-01-2016-to-06-30-2019.xlsx"
              >
                Massachusetts Acute Care Hospital Emergency Department Data October 2016 through June 2019
              </a>
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Card hospital={hospital} bh={bh} condition={condition} condPresent={condPresent} year={year} selected={selected} />
          </div>

          <BHComparisonChart
            data={data}
            hospital={hospital}
            condition={condition}
            condPresent={condPresent}
            year={year}
          />

        </div>
      </section>
    </main>
  );
}