"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Zap, Droplets, Sparkles, Phone, ChevronRight } from "lucide-react";

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
    const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const closeMobileMenu = () => {
        setIsOpen(false);
        setMobileActiveMenu(null);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
                ? "bg-white/95 backdrop-blur-sm clean-shadow"
                : "bg-transparent"
                }`}
        >
            <div className="container">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <Link href="/" className="relative z-[80]">
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
                        className="md:hidden relative z-[80] p-3"
                        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
                    >
                        <motion.div
                            animate={isOpen ? "open" : "closed"}
                            className="w-6 h-6 relative"
                        >
                            <motion.span
                                className="absolute left-0 w-full h-0.5 bg-current"
                                style={{ top: "25%" }}
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: 45, y: 6 }
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="absolute left-0 w-full h-0.5 bg-current"
                                style={{ top: "50%" }}
                                variants={{
                                    closed: { opacity: 1 },
                                    open: { opacity: 0 }
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="absolute left-0 w-full h-0.5 bg-current"
                                style={{ top: "75%" }}
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -6 }
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Full Screen Overlay */}
            {/* Portal the menu outside of the header */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                            onClick={closeMobileMenu}
                            style={{
                                position: 'fixed',
                                top: '0',
                                left: '0',
                                right: '0',
                                bottom: '0',
                                width: '100vw',
                                height: '100vh'
                            }}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed right-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto z-[70]"
                            style={{
                                position: 'fixed',
                                top: '0',
                                bottom: '0',
                                height: '100vh',
                                width: '100%',
                                maxWidth: '24rem'
                            }}
                        >
                            <nav className="pt-24 pb-8 h-full overflow-y-auto">
                                <ul>
                                    {navigation.map((item, index) => (
                                        <motion.li
                                            key={item.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 + 0.2 }}
                                        >
                                            {item.hasDropdown ? (
                                                <div>
                                                    <button
                                                        onClick={() => setMobileActiveMenu(
                                                            mobileActiveMenu === item.name ? null : item.name
                                                        )}
                                                        className="w-full px-8 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                                    >
                                                        <span className="text-sm font-light tracking-widest uppercase text-gray-700">
                                                            {item.name}
                                                        </span>
                                                        <ChevronRight
                                                            className={`w-4 h-4 transition-transform ${mobileActiveMenu === item.name ? 'rotate-90' : ''
                                                                }`}
                                                        />
                                                    </button>

                                                    <AnimatePresence>
                                                        {mobileActiveMenu === item.name && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="overflow-hidden bg-gray-50"
                                                            >
                                                                {item.dropdown?.map((category) => (
                                                                    <div key={category.category} className="px-8 py-4">
                                                                        <div className="flex items-center gap-2 mb-3">
                                                                            <category.icon className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                                                            <h3 className="text-xs font-light tracking-widest uppercase text-gray-500">
                                                                                {category.category}
                                                                            </h3>
                                                                        </div>
                                                                        <ul className="space-y-3 ml-6">
                                                                            {category.items.map((subItem) => (
                                                                                <li key={subItem.name}>
                                                                                    <Link
                                                                                        href={subItem.href}
                                                                                        onClick={closeMobileMenu}
                                                                                        className="block"
                                                                                    >
                                                                                        <p className={`text-sm font-light mb-1 ${subItem.highlight ? 'text-secondary' : 'text-gray-700'
                                                                                            }`}>
                                                                                            {subItem.name}
                                                                                            {subItem.highlight && (
                                                                                                <span className="ml-2 text-xs bg-secondary text-white px-2 py-0.5 rounded">
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
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    onClick={closeMobileMenu}
                                                    className="block px-8 py-4 text-sm font-light tracking-widest uppercase text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Mobile CTAs */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-8 px-8 space-y-4"
                                >
                                    <a
                                        href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={closeMobileMenu}
                                        className="block w-full btn-primary text-center"
                                    >
                                        Termin vereinbaren
                                    </a>

                                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600 pt-4">
                                        <Phone className="w-4 h-4" />
                                        <a href="tel:+4366057214003" className="font-light hover:text-black transition-colors">
                                            +43 660 57 21 403
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Footer Links */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-12 pt-8 px-8 border-t border-gray-200"
                                >
                                    <div className="flex justify-center gap-6 text-xs">
                                        <Link
                                            href="/impressum"
                                            onClick={closeMobileMenu}
                                            className="font-light text-gray-500 hover:text-black transition-colors"
                                        >
                                            Impressum
                                        </Link>
                                        <Link
                                            href="/datenschutz"
                                            onClick={closeMobileMenu}
                                            className="font-light text-gray-500 hover:text-black transition-colors"
                                        >
                                            Datenschutz
                                        </Link>
                                    </div>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
} 