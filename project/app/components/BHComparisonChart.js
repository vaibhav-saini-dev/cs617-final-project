"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

const chartTheme = {
  paper: "rgba(255,255,255,0)",
  plot: "rgba(255,255,255,0)",
  text: "#e4e4e7",
  muted: "#a1a1aa",
  grid: "rgba(255,255,255,0.08)",
  blue: "#60a5fa",
  blueSoft: "rgba(96,165,250,0.35)",
  orange: "#fb923c",
  orangeSoft: "rgba(251,146,60,0.35)",
};

export default function BHComparisonChart({ data, hospital, condition, condPresent, year }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

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

    if (values.length === 0) {
      return 0;
    }

    const total = values.reduce((sum, value) => sum + value, 0);
    return Number((total / values.length).toFixed(2));
  };

  const chartData = [
    {
      x: isMobile
        ? ["Behavioral<br>Health", "No<br>Behavioral<br>Health"]
        : ["Behavioral Health", "No Behavioral Health"],
      y: [getAverageByBH("Yes"), getAverageByBH("No")],
      type: "bar",
      marker: {
        color: [chartTheme.blue, chartTheme.orange],
        line: {
          color: [chartTheme.blueSoft, chartTheme.orangeSoft],
          width: 2,
        },
      },
      hoverTemplate: "%{x}<br><b>%{y:.2f} days</b><extra></extra>",
    },
  ];

  const layout = {
    title: {
      text: isMobile
        ? "Average Length of Stay:<br> BH vs No BH"
        : "Average Length of Stay: BH vs No BH",
      font: { color: chartTheme.text }
    },
    xaxis: { 
      title: { text: "Patient Group", font: { color: chartTheme.text } },
      tickfont: { color: chartTheme.muted },
      gridcolor: chartTheme.grid,
      zerolinecolor: chartTheme.grid,
     },
    yaxis: { 
      title: { text: "Average Stay (Days)", font: { color: chartTheme.text } },
      tickfont: { color: chartTheme.muted },
      gridcolor: chartTheme.grid,
      zerolinecolor: chartTheme.grid
     },
    paper_bgcolor: chartTheme.paper,
    plot_bgcolor: chartTheme.plot,
    font: { color: chartTheme.text },
    height: 400,
    margin: { t: 70, r: 30, b: 80, l: 75 },
  };

  return (
    <div className="w-full rounded-2xl">
      <Plot
        data={chartData}
        layout={layout}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}