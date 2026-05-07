import Dropdown from "./components/Dropdown";
import Card from "./components/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-8 py-20">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
          
          <div className="flex flex-col items-start gap-8">
            <h1 className="max-w-3xl text-4xl font-semibold">
              When Healing Takes Longer: Behavioral Health Impact On Hospital Stay Lengths
            </h1>

            <div className="flex gap-5">
              <Dropdown 
                text="Select Hospital" 
                options={["Hospital 1", "Hospital 2"]} 
              />

              <Dropdown 
                text="Behavioral Health Issues?" 
                options={["Yes", "No"]} 
              />
            </div>

            <p className="max-w-xl text-lg text-zinc-400">
              Source:{" "}
              <a
                className="text-blue-400 hover:underline"
                href="https://www.chiamass.gov/assets/docs/r/Case-Mix-Reports/CMSR-EDD-Legacy-Databook-10-01-2016-to-06-30-2019.xlsx"
              >
                Massachusetts Acute Care Hospital Emergency Department Data October 2016 through June 2019
              </a>
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Card />
          </div>

        </div>
      </section>
    </main>
  );
}