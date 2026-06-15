"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/lib/business-info";
import { GOOGLE_REVIEWS } from "@/lib/reviews";

export default function Testimonials() {
    return (
        <section id="bewertungen" className="section-spacing bg-gray-50">
            <div className="container">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Kundenstimmen
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 text-black">
                        Was unsere Kunden{" "}
                        <span style={{ color: "var(--color-secondary)" }}>sagen</span>
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                    strokeWidth={1}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-light text-gray-600">
                            {GOOGLE_RATING.value} · {GOOGLE_RATING.reviewCount} Google Bewertungen
                        </span>
                    </div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Echte Erfahrungsberichte aus unserem Studio in Pottendorf
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {GOOGLE_REVIEWS.map((review, index) => (
                        <motion.article
                            key={review.author}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="flex flex-col bg-white border border-gray-200 p-6 md:p-8 h-full"
                        >
                            <div className="flex items-center gap-0.5 mb-5">
                                {[...Array(5)].map((_, starIndex) => (
                                    <Star
                                        key={starIndex}
                                        className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                                        strokeWidth={1}
                                    />
                                ))}
                            </div>

                            <blockquote className="flex-1 text-gray-600 font-light leading-relaxed text-sm md:text-base mb-6">
                                &quot;{review.text}&quot;
                            </blockquote>

                            <div className="pt-5 border-t border-gray-100">
                                <p className="text-sm font-light text-black mb-1">
                                    {review.author}
                                </p>
                                <p className="text-xs font-light tracking-widest uppercase text-gray-400">
                                    {review.service} · Google
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-10 md:mt-12 text-center">
                    <a
                        href={GOOGLE_REVIEWS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-light tracking-widest uppercase text-xs transition-colors hover:border-gray-400 hover:text-gray-900"
                    >
                        Alle Google Bewertungen ansehen
                    </a>
                </div>
            </div>
        </section>
    );
}
