"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingButton from "@/components/campaign/BookingButton";
import {
    LASER_OKTOBER_DAMEN_ZONES,
    LASER_OKTOBER_HERREN_ZONES,
    formatLaserOktoberEuro,
    laserOktoberOfferEuro,
    type LaserOktoberZone,
} from "@/lib/campaigns/laser-oktober-prices";

const bookingButtonClass =
    "inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[var(--color-primary)] px-6 py-4 text-center text-xs font-light uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] md:w-auto md:px-8 md:text-sm md:tracking-[0.2em]";

const textLinkClass =
    "inline-flex items-center gap-2 text-sm font-light text-[var(--color-gray-700)] underline decoration-[var(--color-gray-300)] underline-offset-4 transition-colors hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]";

type Audience = "damen" | "herren";

type LaserOktoberPriceListProps = {
    bookingUrl: string;
    backHref: string;
};

function ZoneRow({ zone }: { zone: LaserOktoberZone }) {
    const offer = formatLaserOktoberEuro(laserOktoberOfferEuro(zone.regularEuro));
    const regular = formatLaserOktoberEuro(zone.regularEuro);

    return (
        <li className="flex items-center justify-between gap-4 border-b border-[var(--color-gray-300)] bg-white px-4 py-4 last:border-b-0 md:px-5">
            <p className="text-base font-light text-black">{zone.name}</p>
            <div className="text-right">
                <p className="text-sm font-light text-[var(--color-gray-700)]">
                    <span className="sr-only">Statt </span>
                    <span className="line-through">{regular}</span>
                </p>
                <p className="text-xl font-medium leading-none text-[var(--color-primary)]">
                    <span className="sr-only">Jetzt </span>
                    {offer}
                </p>
            </div>
        </li>
    );
}

export default function LaserOktoberPriceList({
    bookingUrl,
    backHref,
}: LaserOktoberPriceListProps) {
    const [audience, setAudience] = useState<Audience>("damen");
    const zones = audience === "damen" ? LASER_OKTOBER_DAMEN_ZONES : LASER_OKTOBER_HERREN_ZONES;

    return (
        <main className="py-8 md:py-14">
            <div className="container">
                <div className="mx-auto max-w-3xl">
                    <Link href={backHref} className={`${textLinkClass} mb-8`}>
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Zurück zur Aktion
                    </Link>

                    <p className="mb-3 text-xs font-light uppercase tracking-[0.25em] text-[var(--color-primary)]">
                        Herbstaktion
                    </p>
                    <h1 className="mb-4 text-3xl font-light leading-tight text-black md:text-4xl">
                        50 % auf die ersten 2 Behandlungen
                    </h1>
                    <p className="mb-8 text-base font-light leading-relaxed text-[var(--color-gray-700)]">
                        Der angezeigte Preis gilt für die ersten zwei Behandlungen.
                        Danach gilt wieder der durchgestrichene Preis.
                    </p>

                    <div className="mb-6 flex border border-[var(--color-gray-300)]" role="group" aria-label="Preisliste filtern">
                        {(
                            [
                                ["damen", "Damen"],
                                ["herren", "Herren"],
                            ] as const
                        ).map(([value, label]) => {
                            const selected = audience === value;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => setAudience(value)}
                                    className={`min-h-12 flex-1 px-4 text-xs font-light uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-primary)] ${
                                        selected
                                            ? "bg-[var(--color-primary)] text-white"
                                            : "bg-white text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]"
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <ul aria-label={audience === "damen" ? "Damen Einzelzonen" : "Herren Einzelzonen"}>
                        {zones.map((zone) => (
                            <ZoneRow key={zone.name} zone={zone} />
                        ))}
                    </ul>

                    <p className="mt-6 text-sm font-light leading-relaxed text-[var(--color-gray-700)]">
                        Aktion gültig bis 31.10.2026, nur für Einzelzonen – Pakete ausgenommen.
                        Der Rabatt wird vor Ort abgezogen.
                    </p>

                    <div className="mt-8">
                        <BookingButton href={bookingUrl} className={bookingButtonClass}>
                            Jetzt Termin buchen
                        </BookingButton>
                    </div>
                </div>
            </div>
        </main>
    );
}
