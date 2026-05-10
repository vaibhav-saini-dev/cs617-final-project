// Dropdown.js 
// Source: https://www.geeksforgeeks.org/nextjs/create-dropdowns-ui-with-next-js-and-tailwind-css/
'use client'
import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

export default function Dropdown({ text, options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
            <div className="relative inline-block w-full text-left">
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
                    <div className="absolute left-0 top-full w-full text-center
                                    mt-2 rounded-md shadow-lg bg-white ring-1 
                                    ring-black/10 focus:outline-none z-50">
                        <div className="max-h-80 overflow-y-auto py-1">
                            {options.map((option, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    type="button"
                                    className="block w-full px-4 py-2
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