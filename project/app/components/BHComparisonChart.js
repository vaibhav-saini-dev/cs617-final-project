"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

export default function BHComparisonChart({ data, hospital, condition, condPresent, year}) {
  const filtered = data.filter((row) => {
    const hospitalMatch = hospital === "Select Hospital" || hospital === row.Hospital;
    const conditionMatch = condition === "Condition" || condition === row.Condition;
    const condPresentMatch = condPresent === "Condition Present?" || condPresent === row["Condition Present"];
    const yearMatch = String(year) === "Year" || String(year) === String(row["Federal Fiscal Year"]);

    return hospitalMatch && conditionMatch && condPresentMatch && yearMatch;
  });

  const getAverageByBH = (bhValue) => {
    const values = filtered
      .filter((row) => row.bh === bhValue)
      .map((row) => Number(row["Average Length of Stay"]))
      .filter((value) => !isNaN(value));

    if (values.length === 0) return 0;

    const total = values.reduce((sum, value) => sum + value, 0);
    return Number((total / values.length).toFixed(2));
  };

  const chartData = [
    {
      x: ["Behavioral Health", "No Behavioral Health"],
      y: [getAverageByBH("Yes"), getAverageByBH("No")],
      type: "bar",
    },
  ];

  const layout = {
    title: { text: "Average Length of Stay: BH vs No BH" },
    xaxis: { title: { text: "Patient Group" } },
    yaxis: { title: { text: "Average Stay (Days)" } },
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    height: 400,
    margin: { t: 60, r: 30, b: 80, l: 70 },
  };

  return (
    <div className="w-full rounded-lg bg-white p-4">
      <Plot
        data={chartData}
        layout={layout}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}