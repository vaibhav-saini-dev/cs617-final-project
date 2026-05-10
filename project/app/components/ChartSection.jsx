import BHComparisonChart from "./BHComparisonChart";
import YearComparisonChart from "./YearComparisonChart";
import BoxComparisonChart from "./BoxComparisonChart";

export default function ChartSection({ data, hospital, bh, condition, condPresent, year }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-8 py-24">
      <div className="mb-14 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Evidence
        </p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
          The data shows how behavioral health changes the shape of a hospital stay.
        </h2>
        <p className="mt-6 text-lg leading-8 text-zinc-300">
          The charts below compare average length of stay, yearly patterns, and
          consistency across patient groups.
          <br />
          <br />
          Filtering data in the "Explore" section below updates these graphs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-4 shadow-2xl">
          <BHComparisonChart
            data={data}
            hospital={hospital}
            condition={condition}
            condPresent={condPresent}
            year={year}
          />
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-2xl">
          <YearComparisonChart
            data={data}
            hospital={hospital}
            bh={bh}
            condition={condition}
            condPresent={condPresent}
          />
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-2xl xl:col-span-2">
          <BoxComparisonChart
            data={data}
            hospital={hospital}
            condition={condition}
            condPresent={condPresent}
            year={year}
          />
        </div>
      </div>
    </section>
  );
}