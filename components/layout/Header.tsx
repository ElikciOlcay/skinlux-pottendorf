"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Zap, Droplets, Sparkles, Phone } from "lucide-react";

const navigation = [
    {
        name: "Behandlungen",
        href: "#treatments",
        hasDropdown: true,
        dropdown: [
            {
                category: "Laser",
                icon: Zap,
                items: [
                    { name: "Laser Haarentfernung", href: "/behandlungen/laser-haarentfernung", description: "Dauerhafte Haarentfernung für alle Hauttypen" }
                ]
            },
            {
                category: "Facials",
                icon: Droplets,
                items: [
                    { name: "HydraFacial®", href: "/behandlungen/hydra-facial", description: "3-in-1 Premium Behandlung", highlight: true },
                    { name: "Signature Facials", href: "/behandlungen/signature-facials", description: "Exklusive Circadia Professional Treatments" },
                    { name: "Microneedling", href: "/behandlungen/microneedling", description: "Kollagen-Induktions-Therapie", highlight: true }
                ]
            },
            {
                category: "Analyse",
                icon: Sparkles,
                items: [
                    { name: "Hautanalyse", href: "/behandlungen/hautanalyse", description: "Professionelle Diagnose" },
                    { name: "Beratung", href: "/#consultation", description: "Kostenlose Erstberatung" }
                ]
            }
        ]
    },
    { name: "Über uns", href: "#about" },
    { name: "Kontakt", href: "#contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-white/95 backdrop-blur-sm clean-shadow"
                : "bg-transparent"
                }`}
        >
            <div className="container">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <Link href="/" className="relative">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center"
                        >
                            <Image
                                src="/images/logo/skinlux-logo.png"
                                alt="SKINLUX"
                                width={140}
                                height={48}
                                className="h-10 md:h-12 w-auto"
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-12">
                        {navigation.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="relative text-sm font-light tracking-widest uppercase text-gray-700 hover:text-gray-900 transition-colors group flex items-center gap-1"
                                >
                                    {item.name}
                                    {item.hasDropdown && (
                                        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                                    )}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-500"></span>
                                </Link>

                                {/* Mega Menu Dropdown */}
                                <AnimatePresence>
                                    {item.hasDropdown && activeDropdown === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white shadow-xl"
                                        >
                                            <div className="p-8">
                                                <div className="grid grid-cols-3 gap-8">
                                                    {item.dropdown?.map((category) => (
                                                        <div key={category.category}>
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <category.icon className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                                                <h3 className="text-sm font-light tracking-widest uppercase text-gray-500">
                                                                    {category.category}
                                                                </h3>
                                                            </div>
                                                            <ul className="space-y-3">
                                                                {category.items.map((subItem) => (
                                                                    <li key={subItem.name}>
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className="group block"
                                                                            onClick={() => setActiveDropdown(null)}
                                                                        >
                                                                            <p className={`text-sm font-light mb-1 transition-colors ${subItem.highlight
                                                                                ? 'text-secondary hover:text-secondary-dark'
                                                                                : 'text-gray-800 hover:text-black'
                                                                                }`}>
                                                                                {subItem.name}
                                                                                {subItem.highlight && (
                                                                                    <span className="ml-2 text-xs bg-secondary text-white px-2 py-0.5">
                                                                                        NEU
                                                                                    </span>
                                                                                )}
                                                                            </p>
                                                                            <p className="text-xs text-gray-500 font-light">
                                                                                {subItem.description}
                                                                            </p>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Bottom CTA */}
                                                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <Phone className="w-4 h-4" />
                                                        <span className="font-light">+43 660 57 21 403</span>
                                                    </div>
                                                    <a
                                                        href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-light text-secondary hover:text-secondary-dark transition-colors"
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        Online Termin buchen →
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <a
                            href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary hidden md:inline-flex items-center justify-center"
                        >
                            Termin vereinbaren
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2"
                    >
                        {isOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100"
                    >
                        <nav className="container py-8">
                            <ul className="space-y-6">
                                {navigation.map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-sm font-light tracking-widest uppercase text-gray-700"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navigation.length * 0.1 }}
                                >
                                    <a
                                        href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsOpen(false)}
                                        className="inline-block text-xs font-light tracking-widest uppercase mt-8 text-secondary"
                                    >
                                        Termin vereinbaren
                                    </a>
                                </motion.li>
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
} 