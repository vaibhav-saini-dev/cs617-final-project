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
};

export default function YearComparisonChart({ data, hospital, bh }) {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    const filtered = data.filter((row) => {
        const hospitalMatch = hospital === "Select Hospital" || hospital === row.Hospital;
        const bhMatch = bh === "Behavioral Health Issues?" || bh === row.bh;

        return hospitalMatch && bhMatch;
    });

    const getAverageByYear = (yearValue) => {
        const values = filtered
            .filter((row) => yearValue === row["Federal Fiscal Year"])
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
            x: ["2016", "2017", "2018", "2019"],
            y: [getAverageByYear(2016), getAverageByYear(2017), getAverageByYear(2018), getAverageByYear(2019)],
            type: "scatter",
            mode: "lines+markers",
            line: {
                color: chartTheme.blue,
                width: 3,
                shape: "spline",
            },
            marker: {
                color: chartTheme.blue,
                size: 9,
                line: {
                    color: "#bfdbfe",
                    width: 2,
                },
            },
            hoverTemplate: "%{x}<br><b>%{y:.2f} hours</b><extra></extra>",
        },
    ];

    const layout = {
        title: {
            text: isMobile
                ? "Average Length of Stay:<br>By Year"
                : "Average Length of Stay: By Year",
            font: { color: chartTheme.text },
        },
        xaxis: {
            title: { text: "Year", font: { color: chartTheme.text } },
            tickfont: { color: chartTheme.muted },
            gridcolor: chartTheme.grid,
            zerolinecolor: chartTheme.grid,
        },
        yaxis: { 
            title: { text: "Average Stay (Hours)", font: { color: chartTheme.text } }, 
            tickfont: { color: chartTheme.muted },
            gridcolor: chartTheme.grid,
            zerolinecolor: chartTheme.grid,
         },
        paper_bgcolor: chartTheme.paper,
        plot_bgcolor: chartTheme.plot,
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