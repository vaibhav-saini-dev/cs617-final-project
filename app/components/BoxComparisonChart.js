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

export default function BoxComparisonChart({ data, hospital, year }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const filtered = data.filter((row) => {
    const hospitalMatch = hospital === "Select Hospital" || hospital === row.Hospital;
    const yearMatch = String(year) === "Year" || String(year) === String(row["Federal Fiscal Year"]);

    return hospitalMatch && yearMatch;
  });

  const getValuesByBH = (bhValue) => {
    const values = filtered
      .filter((row) => row.bh === bhValue)
      .map((row) => Number(row["Average Length of Stay"]))
      .filter((value) => !isNaN(value));

    if (values.length === 0) {
      return 0;
    }

    return values;
  };

  const bhValues = getValuesByBH("Yes");
  const noBhValues = getValuesByBH("No");

  const chartData = [
    {
      x: bhValues,
      type: "box",
      name: isMobile ? "Behavioral<br>Health" : "Behavioral Health",
      boxpoints: "outliers",
      jitter: 0.25,
      pointpos: 0,
      marker: { color: chartTheme.blue, opacity: 0.75 },
      line: { color: chartTheme.blue },
      fillcolor: chartTheme.blueSoft,
      hovertemplate: "<b>Behavioral Health</b><br>%{x:.2f} hours<extra></extra>",
    },
    {
      x: noBhValues,
      type: "box",
      name: isMobile ? "No<br>Behavioral<br>Health" : "No Behavioral Health",
      boxpoints: "outliers",
      jitter: 0.25,
      pointpos: 0,
      marker: { color: chartTheme.orange, opacity: 0.75 },
      line: { color: chartTheme.orange },
      fillcolor: chartTheme.orangeSoft,
      hovertemplate: "<b>No Behavioral Health</b><br>%{x:.2f} hours<extra></extra>",
    },
  ];

  const layout = {
    title: {
      text: isMobile
        ? "How Consistent are<br>Hospital Stay Lengths?"
        : "How Consistent are Hospital Stay Lengths?",
      font: { color: chartTheme.text },
    },
    xaxis: {
      title: { text: "Average Stay (Hours)", font: { color: chartTheme.text } },
      tickfont: { color: chartTheme.muted },
      gridcolor: chartTheme.grid,
      zerolinecolor: chartTheme.grid,
    },
    yaxis: {
      title: { text: "" },
      tickfont: { color: chartTheme.muted },
      gridcolor: chartTheme.grid,
      zerolinecolor: chartTheme.grid,
    },
    paper_bgcolor: chartTheme.paper,
    plot_bgcolor: chartTheme.plot,
    font: { color: chartTheme.text },
    height: 500,
    margin: { t: 70, r: 40, b: 80, l: isMobile ? 80 : 150 },
    showlegend: false,
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