"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
    ssr: false,
});

export default function YearComparisonChart({ data, hospital, bh, condition, condPresent }) {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    const filtered = data.filter((row) => {
        const hospitalMatch = hospital === "Select Hospital" || hospital === row.Hospital;
        const bhMatch = bh === "Behavioral Health Issues?" || bh === row.bh;
        const conditionMatch = condition === "Condition" || condition === row.Condition;
        const condPresentMatch = condPresent === "Condition Present?" || condPresent === row["Condition Present"];

        return hospitalMatch && bhMatch && conditionMatch && condPresentMatch;
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
        return Number(total / values.length.toFixed(2));
    };

    const chartData = [
        {
            x: ["2016", "2017", "2018", "2019"],
            y: [getAverageByYear(2016), getAverageByYear(2017), getAverageByYear(2018), getAverageByYear(2019)],
            type: "trendline",
        }
    ];

    const layout = {
        title: { 
            text: isMobile
            ? "Average Length of Stay:<br>By Year"
            : "Average Length of Stay: By Year" },
        xaxis: { title: { text: "Year" } },
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