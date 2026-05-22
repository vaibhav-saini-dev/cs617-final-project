"use client";

import { useEffect, useMemo, useState } from "react";
import TitleSection from "./components/TitleSection";
import StoryIntro from "./components/StoryIntro";
import ChartSection from "./components/ChartSection";
import StayPredictorSection from "./components/StayPredictorSection";
import ExploreSection from "./components/ExploreSection";
import KeyFindings from "./components/KeyFindings";
import AdditionalDatasets from "./components/AdditionalDatasets";
import ConclusionSection from "./components/ConclusionSection";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [hospital, setHospital] = useState("Select Hospital");
  const [bh, setBh] = useState("Behavioral Health Issues?");
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
      const yearMatch = String(year) === "Year" || String(row["Federal Fiscal Year"]) === String(year);

      return (hospitalMatch && bhMatch && yearMatch);
    });
  }, [data, hospital, bh, year]);

  const hospitals = useMemo(
    () => ["Select Hospital", ...Array.from(new Set(data.map((row) => row.Hospital))).sort()],
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

      <ExploreSection
        hospitals={hospitals}
        years={years}
        hospital={hospital}
        setHospital={setHospital}
        bh={bh}
        setBh={setBh}
        year={year}
        setYear={setYear}
        selected={selected}
      />

      <ChartSection
        data={data}
        hospital={hospital}
        bh={bh}
        year={year}
      />
      
      <KeyFindings />

      <StayPredictorSection data={data} />

      <AdditionalDatasets />

      <ConclusionSection />
    </main>
  );
}