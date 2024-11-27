import React from 'react';
import {Grid, Power, Smartphone, Wifi} from "lucide-react";
interface SectionListProps {
    sections: any[];
}
const SectionList = ({sections}:SectionListProps) => {
    return (
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            {sections.map((item, index) => (
                <div
                    key={index}
                    className="bg-white p-4 sm:p-6  rounded-lg shadow flex flex-col justify-between"
                >
                    <h2 className="text-lg font-semibold text-green-950 flex items-center">
                        {item.icon}
                        <span className="ml-2 text-emerald-800">
                                    <h2 className="text-black">{item.title}</h2>
                                    </span>
                    </h2>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-2xl font-bold text-green-950">{item.value}</p>
                        <p className="text-green-500 text-sm sm:text-base">{item.perc}</p>
                    </div>
                </div>
            ))}
        </section>

    );
};

export default SectionList;