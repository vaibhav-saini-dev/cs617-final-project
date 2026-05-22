export type HospitalRow = {
  Hospital: string;
  Condition: string;
  "Condition Present": string;
  Percent: string | number;
  bh: string;
  "Federal Fiscal Year": number;
};

export const STAY_BUCKETS = [
  { label: "0–4 hrs", key: "0-4" as const },
  { label: "4–6 hrs", key: "4-6" as const },
  { label: "6–8 hrs", key: "6-8" as const },
  { label: "8–12 hrs", key: "8-12" as const },
  { label: "12–24 hrs", key: "12-24" as const },
  { label: "24+ hrs", key: "24+" as const },
];

const THRESHOLDS = [
  { hours: 4, condition: "Excess LOS (>4 Hours)" },
  { hours: 6, condition: "Excess LOS (>6 Hours)" },
  { hours: 8, condition: "Excess LOS (>8 Hours)" },
  { hours: 12, condition: "Excess LOS (>12 Hours)" },
  { hours: 24, condition: "Excess LOS (>24 Hours)" },
] as const;

function parsePercent(value: string | number): number {
  return parseFloat(String(value).replace("%", "").trim());
}

function meanExcessPercent(
  rows: HospitalRow[],
  hospital: string,
  bh: string,
  condition: string
): number | null {
  const matching = rows.filter(
    (row) =>
      row.Hospital === hospital &&
      row.bh === bh &&
      row.Condition === condition &&
      row["Condition Present"] === "Excess LOS"
  );

  if (matching.length === 0) return null;

  const total = matching.reduce((sum, row) => sum + parsePercent(row.Percent), 0);
  return total / matching.length;
}

export function getStayDistribution(
  rows: HospitalRow[],
  hospital: string,
  bh: "Yes" | "No"
): { labels: string[]; probabilities: number[] } | null {
  const cumulative: Record<number, number> = {};

  for (const { hours, condition } of THRESHOLDS) {
    const percent = meanExcessPercent(rows, hospital, bh, condition);
    if (percent === null) return null;
    cumulative[hours] = percent;
  }

  const buckets: Record<(typeof STAY_BUCKETS)[number]["key"], number> = {
    "0-4": 100 - cumulative[4],
    "4-6": cumulative[4] - cumulative[6],
    "6-8": cumulative[6] - cumulative[8],
    "8-12": cumulative[8] - cumulative[12],
    "12-24": cumulative[12] - cumulative[24],
    "24+": cumulative[24],
  };

  return {
    labels: STAY_BUCKETS.map((b) => b.label),
    probabilities: STAY_BUCKETS.map((b) =>
      Number(Math.max(0, buckets[b.key]).toFixed(2))
    ),
  };
}

export function getHospitalNames(rows: HospitalRow[]): string[] {
  return Array.from(new Set(rows.map((row) => row.Hospital)))
    .filter((name) => name !== "All Visits")
    .sort((a, b) => a.localeCompare(b));
}
