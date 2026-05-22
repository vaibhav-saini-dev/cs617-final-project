"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const chartTheme = {
  paper: "rgba(255,255,255,0)",
  plot: "rgba(255,255,255,0)",
  text: "#e4e4e7",
  muted: "#a1a1aa",
  grid: "rgba(255,255,255,0.08)",
  bar: "#60a5fa",
  barSoft: "rgba(96,165,250,0.35)",
};

export default function StayDistributionChart({ labels, probabilities, hospital, bh }) {
  const bhLabel = bh === "Yes" ? "with" : "without";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const chartData = [
    {
      x: labels,
      y: probabilities,
      type: "bar",
      marker: {
        color: chartTheme.bar,
        line: { color: chartTheme.barSoft, width: 2 },
      },
      text: probabilities.map((p) => `${p.toFixed(2)}%`),
      textposition: "outside",
      textfont: { color: chartTheme.text, size: isMobile ? 11 : 12 },
      cliponaxis: false,
      hovertemplate: "%{x}<br><b>%{y:.2f}%</b> of visits<extra></extra>",
    },
  ];

  const layout = {
    title: {
      text: isMobile
        ? `Stay length probability<br>${hospital}`
        : `Length of stay probability — ${hospital}`,
      font: { color: chartTheme.text, size: isMobile ? 14 : 16 },
      subtitle: {
        text: `Patients ${bhLabel} behavioral health issues (2016–2019 average)`,
        font: { color: chartTheme.muted, size: 12 },
      },
      x: 0.5,
      xanchor: "center",
    },
    xaxis: {
      title: { text: "Length of Stay", font: { color: chartTheme.text } },
      tickfont: { color: chartTheme.muted, size: isMobile ? 10 : 12 },
      gridcolor: chartTheme.grid,
    },
    yaxis: {
      title: { text: "% Chance", font: { color: chartTheme.text } },
      tickfont: { color: chartTheme.muted },
      gridcolor: chartTheme.grid,
      zerolinecolor: chartTheme.grid,
      ticksuffix: "%",
      range: [0, Math.min(100, Math.max(...probabilities, 10) * 1.28)],
    },
    paper_bgcolor: chartTheme.paper,
    plot_bgcolor: chartTheme.plot,
    font: { color: chartTheme.text },
    height: 420,
    margin: { t: isMobile ? 110 : 90, r: 24, b: 80, l: 64 },
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/30 backdrop-blur-md sm:p-6">
      <Plot
        data={chartData}
        layout={layout}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
