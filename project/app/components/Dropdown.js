// Dropdown.js 
// Source: https://www.geeksforgeeks.org/nextjs/create-dropdowns-ui-with-next-js-and-tailwind-css/
'use client'
import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

export default function Dropdown({ text, options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const languages = options;

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
            <div className="relative inline-block text-left">
                {/* Dropdown button */}
                <button
                    type="button"
                    className="inline-flex justify-center w-full
                               rounded-md border border-gray-300
                               shadow-sm px-4 py-2 bg-white text-sm
                               font-medium text-black hover:bg-gray-50"
                    onClick={toggleDropdown}
                >
                    {value}
                    <FaCaretDown className="ml-2" />
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="text-center
                                    mt-2  rounded-md
                                    shadow-lg bg-white ring-1 ring-black
                                    ring-opacity-5 focus:outline-none z-10">
                        <div className="py-1">
                            {options.map((option, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    type="button"
                                    className="block px-4 py-2
                                               text-sm text-black
                                               hover:bg-gray-100"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
    );
}