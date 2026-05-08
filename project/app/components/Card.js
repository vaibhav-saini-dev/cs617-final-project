import React, { useEffect, useState } from 'react'
import Image from 'next/image';
// Source: https://v1.tailwindcss.com/components/cards

const Card = ({ hospital, bh, condition, condPresent, year, selected }) => {
    const [avg, setAvg] = useState(0);
    const [showExtra, setShowExtra] = useState(false);
    const [std, setStd] = useState(0);
    const [longestStay, setLongestStay] = useState(0);
    const [shortestStay, setShortestStay] = useState(0);

    useEffect(() => {
        const values = selected
            .map(row => Number(row["Average Length of Stay"]))
            .filter(value => !isNaN(value));

        if (values.length === 0) {
            setAvg(0);
            setStd(0);
            setLongestStay(0);
            setShortestStay(0);
            return;
        }

        const total = values.reduce((sum, value) => {
            return sum + value;
        }, 0);

        const average = total / values.length;

        if (showExtra) {
            const minStay = values.reduce((min, value) => {
               return Math.min(min, value);
            }, Infinity);

            const maxStay = values.reduce((max, value) => {
                return Math.max(max, value);
            }, -Infinity);

            const standardDev = values.reduce((sum, value) => {
                return sum + Math.pow(value - average, 2);
            }, 0) / values.length;

            const stdDev = Math.sqrt(standardDev);

            setLongestStay(maxStay.toFixed(2));
            setShortestStay(minStay.toFixed(2));
            setStd(stdDev.toFixed(2));
        }
        setAvg(average.toFixed(2));
    }, [selected, showExtra]);

    useEffect(() => {
        if (hospital != "Select Hospital" && bh != "Behavioral Health Issues?" &&
            condition != "Condition" && condPresent != "Condition Present?" &&
            String(year) != "Year"
        ) {
            setShowExtra(false);
        } else {
            setShowExtra(true);
        }
    }, [hospital, bh, condition, condPresent, year]);


    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white
                text-center">
                <div className="px-6 py-4">
                    <div className="font-bold text-4xl mb-2 text-gray-700">AVG STAY</div>
                    <p className="text-gray-700 text-2xl">
                        {avg} Days
                    </p>
                    {
                        showExtra && (
                            <>
                                <p className="text-gray-700 text-base">Standard Deviation: ±{std} Days</p>
                                <p className="text-gray-700 text-base">Longest Stay: {longestStay} Days</p>
                                <p className="text-gray-700 text-base">Shortest Stay: {shortestStay} Days</p>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Card