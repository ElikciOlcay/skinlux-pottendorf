"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
    frage: string;
    antwort: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto divide-y divide-gray-200">
            {items.map((item, index) => (
                <div key={index} className="group">
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
                        aria-expanded={openIndex === index}
                    >
                        <h3 className="text-lg font-light text-black pr-8">
                            {item.frage}
                        </h3>
                        <ChevronDown
                            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                                openIndex === index ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    <AnimatePresence initial={false}>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <p className="pb-6 text-gray-600 font-light leading-relaxed">
                                    {item.antwort}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
