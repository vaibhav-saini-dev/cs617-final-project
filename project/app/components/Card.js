import React from 'react'
import Image from 'next/image';
// Source: https://v1.tailwindcss.com/components/cards

const Card = ({selected}) => {
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white
            text-center">
                <div className="px-6 py-4">
                    <div className="font-bold text-4xl mb-2 text-gray-700">AVG STAY</div>
                    <p className="text-gray-700 text-2xl">
                        0 Days
                    </p>
                    <p className="text-gray-700 text-base">Consistency: 0%</p>
                    <p className="text-gray-700 text-base">Longest Stay: 0 Days</p>
                    <p className="text-gray-700 text-base">Shortest Stay: 0 Days</p>
                </div>
            </div>
        </>
    )
}

export default Card