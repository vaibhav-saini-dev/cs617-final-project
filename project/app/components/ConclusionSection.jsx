"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function ConclusionSection() {
    return (
        <AnimatedSection className="mx-auto max-w-5xl px-8 py-28 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
                Takeaway
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                Behind every data point is someone waiting for care.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
                Behavioral health emergencies do not exist in isolation. The data shows how
                longer and less predictable hospital stays are tied to broader pressures
                inside emergency care systems, including overcrowding, psychiatric boarding,
                limited bed availability, and delayed placement. Behind every extended stay
                is a patient moving through a healthcare system still struggling to meet the
                growing demand for mental health care.
            </p>
        </AnimatedSection>
    );
}