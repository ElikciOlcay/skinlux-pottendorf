import Image from "next/image";
import { Check } from "lucide-react";
import { PREMIUM_FACIALS } from "@/lib/premium-facials";

/** Die Facials mit Preis und Beschreibung plus Entscheidungshilfe nach Hautbedürfnis. */
export default function FacialsOverview({ bookingUrl }: { bookingUrl: string }) {
    return (
        <>
            <div className="max-w-5xl mx-auto space-y-8">
                {PREMIUM_FACIALS.map((facial) => (
                    <article
                        key={facial.id}
                        id={facial.id}
                        className="scroll-mt-28 p-6 md:p-10 border border-gray-200 bg-white hover:border-secondary/30 transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                            <div>
                                <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-500 mb-3">
                                    {facial.tags.join(" · ")}
                                </p>
                                <h3 className="text-2xl md:text-3xl font-light text-black">{facial.name}</h3>
                                <p className="text-gray-600 font-light mt-1">{facial.claim}</p>
                            </div>
                            <div className="sm:text-right flex-shrink-0">
                                <div className="text-3xl font-light whitespace-nowrap" style={{ color: "var(--color-secondary)" }}>
                                    € {facial.price}
                                </div>
                                {facial.priceNote && (
                                    <div className="text-sm text-gray-500 font-light">{facial.priceNote}</div>
                                )}
                            </div>
                        </div>

                        {facial.images && (
                            <div className="grid grid-cols-2 gap-4 mb-8 max-w-xl">
                                {facial.images.map((image) => (
                                    <figure key={image.src}>
                                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                fill
                                                sizes="(min-width: 640px) 280px, 45vw"
                                                className="object-cover"
                                            />
                                        </div>
                                        <figcaption className="text-xs text-gray-500 font-light mt-2">{image.caption}</figcaption>
                                    </figure>
                                ))}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-base font-normal text-black mb-2">Für wen ist die Behandlung geeignet?</h4>
                                <p className="text-gray-600 font-light mb-3">{facial.suitableIntro}</p>
                                <ul className="space-y-2">
                                    {facial.suitableFor.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-gray-600 font-light">
                                            <Check className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "var(--color-secondary)" }} aria-hidden />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-base font-normal text-black mb-2">Was bewirkt die Behandlung?</h4>
                                    <p className="text-gray-600 font-light">{facial.effect}</p>
                                </div>
                                <div>
                                    <h4 className="text-base font-normal text-black mb-2">Was ist das {facial.name}?</h4>
                                    <p className="text-gray-600 font-light">{facial.about}</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary inline-flex items-center justify-center mt-8"
                        >
                            Jetzt buchen
                        </a>
                    </article>
                ))}
            </div>

            <div className="max-w-4xl mx-auto mt-20">
                <h3 className="text-2xl md:text-3xl font-light text-black text-center mb-8">
                    Welche Behandlung passt zu welchem Hautbedürfnis?
                </h3>
                <table className="w-full text-left border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4 font-normal text-black">Hautbedürfnis</th>
                            <th scope="col" className="p-4 font-normal text-black">Empfehlung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PREMIUM_FACIALS.map((facial) => (
                            <tr key={facial.id} className="border-t border-gray-200">
                                <td className="p-4 text-gray-600 font-light">{facial.need}</td>
                                <td className="p-4 font-light text-black">
                                    <a href={`#${facial.id}`} className="underline underline-offset-4 hover:text-gray-600">
                                        {facial.name.replace(/ (Facial|Treatment)$/, "")}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-center text-gray-600 font-light mt-8">
                    Sie wissen nicht, welche Behandlung zu Ihrer Haut passt? Wir finden gemeinsam das passende Facial für Sie.
                </p>
            </div>
        </>
    );
}
