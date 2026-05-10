"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

export default function BoxComparisonChart({ data, hospital, condition, condPresent, year }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const filtered = data.filter((row) => {
    const hospitalMatch = hospital === "Select Hospital" || hospital === row.Hospital;
    const conditionMatch = condition === "Condition" || condition === row.Condition;
    const condPresentMatch = condPresent === "Condition Present?" || condPresent === row["Condition Present"];
    const yearMatch = String(year) === "Year" || String(year) === String(row["Federal Fiscal Year"]);

    return hospitalMatch && conditionMatch && condPresentMatch && yearMatch;
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
      name: isMobile
        ? "Behavioral<br>Health"
        : "Behavioral Health",
      boxpoints: "outliers",
      jitter: 0.2,
      pointpos: 0,
    },
    {
      x: noBhValues,
      type: "box",
      name: isMobile
        ? "No<br>Behavioral<br>Health"
        : "No Behavioral Health",
      boxpoints: "outliers",
      jitter: 0.2,
      pointpos: 0,
    },
  ];

  const layout = {
    title: {
      text: isMobile
        ? "How Consistent are<br>Hospital Stay Lengths?"
        : "How Consistent are Hospital Stay Lengths?"
    },
    xaxis: { title: { text: "Average Stay (Days)" } },
    yaxis: { title: { text: "" } },
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    height: 500,
    margin: { t: 60, r: 40, b: 70, l: isMobile ? 70: 130 },
    showlegend: false,
  };

  return (
    <div className="w-full rounded-lg bg-white p-4">
      <Plot
        data={chartData}
        layout={layout}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}