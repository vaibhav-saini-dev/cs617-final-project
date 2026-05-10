"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function TitleSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-8 py-24">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('./sources-images/cover.png')" }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-black via-black/85 to-black/50" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            Massachusetts Emergency Department Data
          </motion.p>

          <motion.h1
            className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            When Healing Takes Longer
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Behavioral health patients often face longer and less predictable
            hospital stays, revealing pressure points inside emergency care.
          </motion.p>

          <motion.p
            className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            By: {" "}
            <a
              href={"https://github.com/Erikfirstofhisname"}
              target={"_blank"}
              rel="noopener noreferrer"
              className="font-semibold text-orange-400 hover:underline"
            >Erik Williamson</a>
            {" & "}
            <a
              href={"https://vsaini-portfolio.vercel.app/"}
              target={"_blank"}
              rel="noopener noreferrer"
              className="font-semibold text-purple-400 hover:underline"
            >Vaibhav Saini</a>

            {" on "}
            <a
              href={"https://github.com/vaibhav-saini-dev/cs617-final-project"}
              target={"_blank"}
              rel="noopener noreferrer"
              className="font-semibold text-blue-400 hover:underline"
            >GitHub</a>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}