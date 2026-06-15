"use client";

import { ArrowRight, LucideIcon } from "lucide-react";

type Offer = {
    id: string;
    title: string;
    description: string;
    detail: string;
    icon: LucideIcon;
    href: string;
    color: string;
    badge: string;
};

const offers: Offer[] = [];

export default function SpecialOffers() {
    if (offers.length === 0) {
        return null;
    }

    return (
        <section id="angebote" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Aktuelle Angebote
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 text-black">
                        Spezial Angebote
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Exklusive Behandlungen für deine natürliche Schönheit
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
                    {offers.map((offer) => {
                        const IconComponent = offer.icon;
                        return (
                            <a
                                key={offer.id}
                                href={offer.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-start gap-5 border border-gray-200 bg-white p-5 md:p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
                            >
                                <div
                                    className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 flex items-center justify-center"
                                    style={{ backgroundColor: offer.color }}
                                >
                                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                                </div>

                                <div className="flex-1 min-w-0 py-0.5">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <h3 className="text-base md:text-lg font-light text-black leading-snug">
                                            {offer.title}
                                        </h3>
                                        <span
                                            className="text-[0.55rem] font-light tracking-widest uppercase px-2 py-0.5 text-white shrink-0"
                                            style={{ backgroundColor: offer.color }}
                                        >
                                            {offer.badge}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 font-light text-sm mb-2 leading-relaxed line-clamp-2">
                                        {offer.description}
                                    </p>

                                    <p className="text-xs font-light text-gray-400 mb-3">
                                        {offer.detail}
                                    </p>

                                    <span className="text-xs font-light tracking-widest uppercase inline-flex items-center gap-2 transition-colors" style={{ color: offer.color }}>
                                        Jetzt buchen
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <p className="text-xs font-light text-gray-400">
                        Angebote gültig solange der Vorrat reicht. Keine Barauszahlung möglich.
                    </p>
                </div>
            </div>
        </section>
    );
}
