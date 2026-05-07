import Image from "next/image";
import Dropdown from "./components/Dropdown";
import Card from "./components/Card";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            When Healing Takes Longer: Behavioral Health Impact On Hospital Stay Lengths
          </h1>
          
          <Dropdown text="Select Hospital" options={["Hospital 1", "Hospital 2"]} />
          <Dropdown text="Behavioral Health Issues?" options={["Yes", "No"]} />
          <p className="max-w-md pb-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Source: <a className="text-blue-400" href="https://www.chiamass.gov/assets/docs/r/Case-Mix-Reports/CMSR-EDD-Legacy-Databook-10-01-2016-to-06-30-2019.xlsx">
            Massachusetts Acute Care Hospital Emergency Department Data October 2016 through June 2019 </a>
          </p>
        </div>
        <Card />
      </main>
    </div>
  );
}
