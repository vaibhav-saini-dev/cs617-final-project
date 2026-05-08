import React, { useEffect, useState } from 'react'
import Image from 'next/image';
// Source: https://v1.tailwindcss.com/components/cards

const Card = ({ hospital, bh, selected }) => {
    const [avg, setAvg] = useState(0);
    const [showExtra, setShowExtra] = useState(false);

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

    }, [selected]);
    
    useEffect(() => {
      if (hospital != "Select Hospital" && bh != "Behavioral Health Issues?") {
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
                                <p className="text-gray-700 text-base">Consistency: 0%</p>
                                <p className="text-gray-700 text-base">Longest Stay: 0 Days</p>
                                <p className="text-gray-700 text-base">Shortest Stay: 0 Days</p>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Card