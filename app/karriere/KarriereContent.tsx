'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Briefcase,
    CalendarClock,
    CheckCircle,
    Clock,
    Gem,
    GraduationCap,
    Handshake,
    Mail,
    MapPin,
    MessageCircle,
    Sparkles,
    Wallet,
    Zap,
    type LucideIcon,
} from 'lucide-react';
import { jobs, mailLink, whatsappLink, CAREER_EMAIL, type BenefitIcon, type Job } from './data';

const benefitIcons: Record<BenefitIcon, LucideIcon> = {
    laser: Zap,
    training: GraduationCap,
    studio: Gem,
    salary: Wallet,
    flexible: CalendarClock,
    perspective: Handshake,
};

const highlightIcons: LucideIcon[] = [Clock, MapPin, Sparkles];

function CheckList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: 'var(--color-secondary)' }}
                        aria-hidden
                    />
                    <span className="text-gray-600 font-light">{item}</span>
                </li>
            ))}
        </ul>
    );
}

function JobOverviewCard({ job, index }: { job: Job; index: number }) {
    return (
        <motion.a
            href={`#${job.slug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            className="group flex flex-col bg-white border border-gray-100 shadow-sm p-6 md:p-8 text-left hover:border-gray-300 hover:shadow-md transition-all"
        >
            <span
                className="self-start text-[0.6rem] font-light tracking-widest uppercase px-2 py-0.5 text-white mb-4"
                style={{ backgroundColor: 'var(--color-secondary)' }}
            >
                {job.type}
            </span>
            <h2 className="text-xl md:text-2xl font-light text-black mb-3 leading-snug">{job.title}</h2>
            <p className="text-sm text-gray-500 font-light mb-6">{job.highlights.slice(1).join(' · ')}</p>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-light text-gray-600 group-hover:text-black transition-colors">
                Details & Bewerbung
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
        </motion.a>
    );
}

function JobSection({ job, index }: { job: Job; index: number }) {
    const benefitCols = job.benefits.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

    return (
        <section
            id={job.slug}
            className={`scroll-mt-24 py-20 md:py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Kopf */}
                    <div className="max-w-3xl mb-12">
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Stelle {index + 1} von {jobs.length}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-light text-black mb-6 leading-tight">{job.title}</h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {job.highlights.map((highlight, i) => {
                                const Icon = highlightIcons[i] ?? Sparkles;
                                return (
                                    <span
                                        key={highlight}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-light text-gray-700 bg-white border border-gray-200"
                                    >
                                        <Icon className="w-3.5 h-3.5" style={{ color: 'var(--color-secondary)' }} aria-hidden />
                                        {highlight}
                                    </span>
                                );
                            })}
                        </div>
                        <p className="text-lg text-gray-600 font-light leading-relaxed">{job.teaser}</p>
                    </div>

                    {/* Aufgaben & Profil */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="p-6 md:p-8 bg-white border border-gray-100">
                            <h3 className="text-xl font-light text-black mb-5">{job.tasksTitle}</h3>
                            <CheckList items={job.tasks} />
                        </div>
                        <div className="p-6 md:p-8 bg-white border border-gray-100">
                            <h3 className="text-xl font-light text-black mb-5">Das bringst du mit</h3>
                            <CheckList items={job.profile} />
                        </div>
                    </div>

                    {/* Benefits */}
                    <h3 className="text-xl font-light text-black mt-12 mb-5">Das erwartet dich</h3>
                    <div className={`grid sm:grid-cols-2 ${benefitCols} gap-4 mb-12`}>
                        {job.benefits.map((benefit) => {
                            const Icon = benefitIcons[benefit.icon];
                            return (
                                <div key={benefit.title} className="p-5 bg-white border border-gray-100">
                                    <Icon className="w-5 h-5 mb-3" style={{ color: 'var(--color-secondary)' }} aria-hidden />
                                    <h4 className="text-black font-light mb-2">{benefit.title}</h4>
                                    <p className="text-sm text-gray-600 font-light leading-relaxed">{benefit.text}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bewerbung */}
                    <div
                        className="p-8 md:p-10 text-center text-white"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                        <h3 className="text-2xl md:text-3xl font-light mb-3 text-white">{job.ctaTitle}</h3>
                        <p className="font-light text-white/90 max-w-xl mx-auto mb-8">{job.ctaText}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href={whatsappLink(job)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white font-light tracking-wide hover:bg-gray-100 transition-colors"
                                style={{ color: 'var(--color-primary)' }}
                            >
                                <MessageCircle className="w-4 h-4" />
                                Bewerbung per WhatsApp
                            </a>
                            <a
                                href={mailLink(job)}
                                className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-white/60 text-white font-light tracking-wide hover:bg-white/10 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                {CAREER_EMAIL}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default function KarriereContent() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="pt-24 pb-20 md:pb-24 bg-gradient-to-br from-white to-gray-50">
                <div className="container">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück zur Startseite
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-6">
                            <Briefcase className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                Karriere bei skinlux
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-light mb-6 text-black">Werde Teil unseres Teams</h1>
                        <p className="text-lg text-gray-600 font-light leading-relaxed">
                            skinlux MEDICAL BEAUTY in Pottendorf steht für moderne Ästhetik, hochwertige Behandlungen
                            und ein professionelles Team. Aktuell haben wir {jobs.length} offene Stellen.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {jobs.map((job, index) => (
                            <JobOverviewCard key={job.slug} job={job} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {jobs.map((job, index) => (
                <JobSection key={job.slug} job={job} index={index} />
            ))}

            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container text-center">
                    <p className="text-sm text-gray-500 font-light">
                        skinlux MEDICAL BEAUTY · Marktplatz 14, 2486 Pottendorf
                    </p>
                </div>
            </section>
        </main>
    );
}
