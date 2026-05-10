"use client";

import { useEffect, useMemo, useState } from "react";
import TitleSection from "./components/TitleSection";
import StoryIntro from "./components/StoryIntro";
import ChartSection from "./components/ChartSection";
import ExploreSection from "./components/ExploreSection";
import KeyFindings from "./components/KeyFindings";
import AdditionalDatasets from "./components/AdditionalDatasets";
import ConclusionSection from "./components/ConclusionSection";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [hospital, setHospital] = useState("Select Hospital");
  const [bh, setBh] = useState("Behavioral Health Issues?");
  const [condition, setCondition] = useState("Condition");
  const [condPresent, setCondPresent] = useState("Condition Present?");
  const [year, setYear] = useState("Year");

  useEffect(() => {
    fetch("https://vaibhav-saini-dev.github.io/cs617-final-project/data/hospital_data.json")
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

      return (hospitalMatch && bhMatch && conditionMatch && condPresMatch && yearMatch);
    });
  }, [data, hospital, bh, condition, condPresent, year]);

  const hospitals = useMemo(
    () => ["Select Hospital", ...Array.from(new Set(data.map((row) => row.Hospital))).sort()],
    [data]
  );

  const conditions = useMemo(
    () => ["Condition", ...Array.from(new Set(data.map((row) => row.Condition))).sort()],
    [data]
  );

  const years = useMemo(
    () => ["Year", ...Array.from(new Set(data.map((row) => row["Federal Fiscal Year"]))).sort()],
    [data]
  );

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <TitleSection />

      <StoryIntro />

      <ChartSection
        data={data}
        hospital={hospital}
        bh={bh}
        condition={condition}
        condPresent={condPresent}
        year={year}
      />

      <ExploreSection
        hospitals={hospitals}
        conditions={conditions}
        years={years}
        hospital={hospital}
        setHospital={setHospital}
        bh={bh}
        setBh={setBh}
        condition={condition}
        setCondition={setCondition}
        condPresent={condPresent}
        setCondPresent={setCondPresent}
        year={year}
        setYear={setYear}
        selected={selected}
      />

      <KeyFindings />

      <AdditionalDatasets />

      <ConclusionSection />
    </main>
  );
}