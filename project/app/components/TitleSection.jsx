export default function TitleSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-8 py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/sources & images/cover.png')" }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-black via-black/85 to-black/50" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Massachusetts Emergency Department Data
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
            When Healing Takes Longer
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300">
            Behavioral health patients often face longer and less predictable
            hospital stays, revealing pressure points inside emergency care.
          </p>
        </div>
      </div>
    </section>
  );
}