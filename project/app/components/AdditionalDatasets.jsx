export default function AdditionalDatasets() {
  const sources = [
    {
      title: "Mental health visits are more likely to exceed 6 and 12 hours",
      text: "A national study of emergency department visits found that mental health patients consistently experienced longer stays than medical patients, especially when transfers or co-occurring disorders were involved. The research also found major regional variation in how psychiatric emergencies are managed across the United States.",
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9223052/",
    },

    {
      title: "Shorter psychiatric stays can increase readmission cycles",
      text: "The Treatment Advocacy Center found that states with shorter psychiatric hospital stays often had significantly higher readmission rates. As psychiatric bed availability declined over decades, hospitals increasingly faced pressure to discharge patients faster despite ongoing mental health needs.",
      link: "https://www.tac.org/reports_publications/released-relapsed-rehospitalized-length-of-stay-and-readmission-rates-in-state-hospitals-a-comparitive-state-survey/",
    },

    {
      title: "Overcrowding and delayed psychiatric care extend ED stays",
      text: "Research during the COVID-19 pandemic showed psychiatric emergency patients spending substantially longer periods in emergency departments. Factors such as overcrowding, delayed psychiatric intervention, isolation protocols, and limited placement options contributed to extended stays.",
      link: "https://www.sciencedirect.com/science/article/pii/S0022395620308657",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Additional Datasets
        </p>

        <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
          Behind the Longer Waits.
        </h2>

        <p className="mt-6 text-lg leading-8 text-zinc-300">
          The Massachusetts emergency department dataset reveals patterns in
          hospital stay lengths, but outside studies help explain the larger
          systems behind those delays. Research on psychiatric boarding,
          hospital overcrowding, limited psychiatric bed capacity, and
          readmission cycles shows that behavioral health emergencies often
          place pressure on emergency departments beyond what traditional care
          systems were designed to handle.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sources.map((source) => (
          <a
            key={source.title}
            href={source.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 bg-white/4 p-6 shadow-xl transition hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/[0.07]"
          >
            <h3 className="text-xl font-semibold text-white">
              {source.title}
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
              {source.text}
            </p>

            <p className="mt-6 text-sm font-semibold text-blue-400">
              View source
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}