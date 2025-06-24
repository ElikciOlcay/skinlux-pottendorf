"use client";

import { motion } from "framer-motion";

const galleryImages = [
    {
        src: "/images/gallery/treatment-1.jpg", // BILD 1
        alt: "Laser Behandlung",
        category: "Behandlung"
    },
    {
        src: "/images/gallery/studio-1.jpg", // BILD 2
        alt: "Studio Ambiente",
        category: "Studio"
    },
    {
        src: "/images/gallery/treatment-2.jpg", // BILD 3
        alt: "HydraFacial®",
        category: "Behandlung"
    },
    {
        src: "/images/gallery/studio-2.jpg", // BILD 4
        alt: "Empfangsbereich",
        category: "Studio"
    },
    {
        src: "/images/gallery/treatment-3.jpg", // BILD 5
        alt: "Hautanalyse",
        category: "Behandlung"
    },
    {
        src: "/images/gallery/team-1.jpg", // BILD 6
        alt: "Unser Team",
        category: "Team"
    }
];

export default function Gallery() {
    return (
        <section className="section-spacing bg-white">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Einblicke
                    </span>

                    <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                        Unser <span style={{ color: 'var(--color-secondary)' }}>Studio</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                        Moderne Räumlichkeiten für Ihre Wohlfühlmomente
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="relative aspect-square overflow-hidden bg-gray-100 group"
                        >
                            {/* GALLERY IMAGES - Füge hier deine Bilder ein */}
                            <div
                                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: `url('${image.src}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundColor: '#f5f5f5' // Fallback
                                }}
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700">
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                                    <p className="text-white text-sm font-light tracking-widest uppercase">
                                        {image.category}
                                    </p>
                                    <p className="text-white text-lg font-light mt-1">
                                        {image.alt}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-20"
                >
                    <p className="text-lg font-light text-gray-600 mb-8">
                        Überzeugen Sie sich selbst von unserer Qualität
                    </p>
                    <a
                        href="https://instagram.com/skinlux"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-light tracking-widest uppercase hover:text-secondary transition-colors"
                    >
                        Mehr auf Instagram →
                    </a>
                </motion.div>
            </div>
        </section>
    );
} 