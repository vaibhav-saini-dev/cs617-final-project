// Source: https://www.geeksforgeeks.org/nextjs/create-dropdowns-ui-with-next-js-and-tailwind-css/
"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export default function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${isOpen ? "z-50" : "z-10"}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex w-full items-center justify-between rounded-2xl
          border border-white/10 bg-white/8
          px-5 py-4 text-left text-sm font-semibold text-white
          shadow-lg shadow-black/30 backdrop-blur-md
          transition duration-300
          hover:border-blue-400/60 hover:bg-white/12
          focus:outline-none focus:ring-2 focus:ring-blue-400/60
        "
      >
        <span className="truncate">{value}</span>

        <FaCaretDown
          className={`ml-3 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-400" : "text-zinc-300"
          }`}
        />
      </button>

      <div
        className={`
          absolute left-0 top-full z-50 mt-3 w-full overflow-hidden rounded-2xl
          border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/50
          backdrop-blur-xl transition-all duration-300 ease-out
          ${
            isOpen
              ? "max-h-72 translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
          }
        `}
      >
        <div className="max-h-72 overflow-y-auto p-2">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className={`
                w-full rounded-xl px-4 py-3 text-left text-sm transition
                ${
                  option === value
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-zinc-200 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}