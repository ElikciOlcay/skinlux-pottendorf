"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
    frage: string;
    antwort: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
}

/**
 * Die Antworten stehen immer im HTML und werden nur optisch eingeklappt –
 * so können auch Crawler ohne JavaScript (z. B. von ChatGPT und Claude) sie lesen.
 */
export default function FaqAccordion({ items }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const baseId = useId();

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto divide-y divide-gray-200">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                const panelId = `${baseId}-faq-${index}`;
                return (
                    <div key={index} className="group">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                        >
                            <h3 className="text-lg font-light text-black pr-8">
                                {item.frage}
                            </h3>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        <div
                            id={panelId}
                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="overflow-hidden" inert={!isOpen}>
                                <p className="pb-6 text-gray-600 font-light leading-relaxed">
                                    {item.antwort}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
