import AnimatedSection from "./AnimatedSection";

export default function StoryIntro() {
  return (
    <AnimatedSection className="mx-auto max-w-5xl px-8 py-24">
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold sm:text-5xl">
          A hospital stay is supposed to be temporary.
        </h2>

        <p className="text-lg leading-8 text-zinc-300">
          But for patients experiencing behavioral health crises, emergency
          departments can become places of waiting. Behind every extra hour is a
          person waiting for evaluation, placement, treatment, or a safe next
          step.
        </p>

        <p className="text-lg leading-8 text-zinc-300">
          This project explores how behavioral health status relates to hospital
          length of stay across Massachusetts acute care emergency department
          data from 2016 through 2019.
        </p>
      </div>
    </AnimatedSection>
  );
}