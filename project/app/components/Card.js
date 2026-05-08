import React, { useEffect, useState } from 'react'
import Image from 'next/image';
// Source: https://v1.tailwindcss.com/components/cards

const Card = ({ hospital, bh, selected }) => {
    const [avg, setAvg] = useState(0);
    const [showExtra, setShowExtra] = useState(false);
    const [consistency, setConsistency] = useState(0);
    const [longestStay, setLongestStay] = useState(0);
    const [shortestStay, setShortestStay] = useState(0);
    
    useEffect(() => {
        const total = selected.reduce((sum, row) => {
            if (row["Average Length of Stay"] != "*") {
                return sum + Number(row["Average Length of Stay"]);
            } else {
                return sum;
            }
        }, 0);
        const average = total/selected.length;
        setAvg(average.toFixed(2));

        if (showExtra) {

        }
    }, [selected]);
    
    useEffect(() => {
      if (bh == "Behavioral Health Issues?") {
        setShowExtra(true);
      } else {
        setShowExtra(false);
      }
    }, [hospital, bh]);
    

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
                                <p className="text-gray-700 text-base">Consistency: {consistency}%</p>
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