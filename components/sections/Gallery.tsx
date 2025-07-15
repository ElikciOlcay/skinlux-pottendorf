"use client";

import Image from "next/image";

const galleryImages = [
    {
        src: "/images/gallery/treatment-laser.jpg", // ✅ Vorhanden
        alt: "Laser Haarentfernung",
        category: "Behandlung"
    },
    {
        src: "/images/gallery/treatment-hydrafacial.jpg", // ✅ Vorhanden
        alt: "HydraFacial® Behandlung",
        category: "Behandlung"
    },
    {
        src: "/images/gallery/studio-room.jpg", // ❌ Platzhalter - bitte hochladen
        alt: "Behandlungsraum",
        category: "Studio"
    },
    {
        src: "/images/gallery/studio-reception.jpg", // ❌ Platzhalter - bitte hochladen
        alt: "Empfangsbereich",
        category: "Studio"
    },
    {
        src: "/images/gallery/treatment-analysis.jpg", // ❌ Platzhalter - bitte hochladen
        alt: "Behandlungsraum",
        category: "Behandlung"
    },
    {
        src: "/images/about-team.jpg", // ✅ Vorhanden (Alternative für Team-Bild)
        alt: "Unser Team",
        category: "Team"
    }
];

export default function Gallery() {
    return (
        <section className="section-spacing bg-white">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Einblicke
                    </span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6" style={{ color: 'var(--color-primary)' }}>
                        Unser <span style={{ color: 'var(--color-secondary)' }}>Studio</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light px-4">
                        Moderne Räumlichkeiten für Ihre Wohlfühlmomente
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
                    {galleryImages.map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-square overflow-hidden bg-gray-100 group"
                        >
                            {/* Optimized Next.js Image */}
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                                priority={index < 3} // Prioritize first 3 images
                                onError={(e) => {
                                    // Fallback für fehlende Bilder
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/images/about-team.jpg';
                                }}
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500">
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-white text-xs md:text-sm font-light tracking-widest uppercase">
                                        {image.category}
                                    </p>
                                    <p className="text-white text-sm md:text-lg font-light mt-1">
                                        {image.alt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 md:mt-20">
                    <p className="text-base md:text-lg font-light text-gray-600 mb-6 md:mb-8 px-4">
                        Überzeugen Sie sich selbst von unserer Qualität
                    </p>
                    <a
                        href="https://www.instagram.com/skinlux_pottendorf/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-light tracking-widest uppercase hover:text-secondary transition-colors"
                    >
                        Mehr auf Instagram →
                    </a>
                </div>
            </div>
        </section>
    );
} 