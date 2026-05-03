"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap, Droplets, Sparkles, Phone, ChevronRight } from "lucide-react";
import { FEATURES } from "@/lib/features";
import { usePathname } from "next/navigation";

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
                    { name: "Laser Haarentfernung", href: "/behandlungen/laser-haarentfernung", description: "Dauerhafte Haarentfernung für alle Hauttypen" },
                    { name: "Kostenlose Probebehandlung", href: "/beratung", description: "Laser-Haarentfernung kostenlos testen", highlight: true }
                ]
            },
            {
                category: "Facials",
                icon: Droplets,
                items: [
                    { name: "HydraFacial®", href: "/behandlungen/hydra-facial", description: "3-in-1 Premium Behandlung", highlight: true },
                    {
                        name: "SkinPen® Precision Elite",
                        href: "/behandlungen/skinpen-precision",
                        description: "Medizinisches Microneedling, FDA-zertifiziert",
                        highlight: true,
                    },
                    { name: "Premium Facials", href: "/behandlungen/signature-facials", description: "Exklusive Circadia Professional Treatments" }
                ]
            },
            ...(FEATURES.HAUTANALYSE_ENABLED ? [{
                category: "Analyse",
                icon: Sparkles,
                items: [
                    { name: "Hautanalyse", href: "/behandlungen/hautanalyse", description: "Professionelle Diagnose" }
                ]
            }] : [])
        ]
    },
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Gutscheine", href: "/gutscheine" },
    { name: "Kontakt", href: "/kontakt" },
];

const EASTER_END = new Date("2026-04-07T00:00:00+02:00");

function useIsEasterActive() {
    const [active, setActive] = useState(false);
    useEffect(() => {
        setActive(new Date() < EASTER_END);
    }, []);
    return active;
}

const EASTER_EGGS_POSITIONS = [
    { left: "8%", delay: 0, duration: 6, color: "#f8bbd0" },
    { left: "22%", delay: 1.2, duration: 7, color: "#fff176" },
    { left: "38%", delay: 0.5, duration: 5.5, color: "#ce93d8" },
    { left: "55%", delay: 2, duration: 6.5, color: "#80cbc4" },
    { left: "72%", delay: 0.8, duration: 7.5, color: "#ffab91" },
    { left: "88%", delay: 1.5, duration: 5, color: "#90caf9" },
];

function EasterEggIcon({ color, size = 14 }: { color: string; size?: number }) {
    return (
        <svg width={size} height={size * 1.3} viewBox="0 0 20 26" fill="none">
            <ellipse cx="10" cy="14" rx="9" ry="12" fill={color} />
            <ellipse cx="10" cy="14" rx="9" ry="12" fill="white" opacity="0.2" />
            <path d="M4 10 Q10 7 16 10" stroke="white" strokeWidth="1.2" opacity="0.5" fill="none" />
            <path d="M3 16 L17 16" stroke="white" strokeWidth="0.8" opacity="0.3" fill="none" />
            <circle cx="7" cy="11" r="1.2" fill="white" opacity="0.4" />
        </svg>
    );
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
    const pathname = usePathname();
    const isEaster = useIsEasterActive();

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
        <>
            {/* Fixed Header Container */}
            <div
                className="!fixed !left-0 !right-0 !z-40"
                style={{
                    position: 'fixed' as const,
                    top: 'var(--promo-banner-height, 0px)',
                    left: 0,
                    right: 0,
                    zIndex: 40,
                    transform: 'none',
                    backfaceVisibility: 'hidden',
                    willChange: 'auto',
                    transition: 'top 0.3s ease'
                }}
            >
                <header
                    className={`w-full transition-all duration-500 relative ${isScrolled
                        ? "bg-white/95 backdrop-blur-sm shadow-sm"
                        : "bg-transparent"
                        }`}
                    style={{
                        paddingTop: 'max(0.5rem, env(safe-area-inset-top))'
                    }}
                >
                    {isEaster && !isScrolled && pathname === "/" && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {EASTER_EGGS_POSITIONS.map((egg, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute"
                                    style={{ left: egg.left, top: -20 }}
                                    animate={{
                                        y: [0, 120],
                                        opacity: [0.7, 0],
                                        rotate: [0, 15, -10, 5],
                                    }}
                                    transition={{
                                        duration: egg.duration,
                                        delay: egg.delay,
                                        repeat: Infinity,
                                        ease: "easeIn",
                                    }}
                                >
                                    <EasterEggIcon color={egg.color} size={12} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16 md:h-20">
                            {/* Logo */}
                            <Link href="/" className="relative z-50 flex-shrink-0">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center"
                                >
                                    <Image
                                        src={
                                            isScrolled
                                                ? "/images/logo/skinlux-logo.png"
                                                : pathname === "/"
                                                    ? "/images/logo/skinlux-logo-white.png"
                                                    : "/images/logo/skinlux-logo.png"
                                        }
                                        alt="SKINLUX"
                                        width={140}
                                        height={48}
                                        className="h-8 md:h-10 w-auto"
                                        priority
                                    />
                                </motion.div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                                {navigation.map((item) => (
                                    <div
                                        key={item.name}
                                        className="relative"
                                        onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`relative text-sm font-light tracking-widest uppercase transition-colors group flex items-center gap-1 ${pathname === '/' && !isScrolled
                                                ? 'text-white hover:text-pink-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]'
                                                : 'text-gray-700 hover:text-gray-900'
                                                }`}
                                        >
                                            {item.name}
                                            {item.hasDropdown && (
                                                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                                            )}
                                            <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-500"></span>
                                        </Link>

                                        {/* Desktop Dropdown */}
                                        <AnimatePresence>
                                            {item.hasDropdown && activeDropdown === item.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-white/[0.98] backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100/80 overflow-hidden"
                                                >
                                                    <div className="p-2">
                                                        <div className="grid grid-cols-2 gap-1">
                                                            {item.dropdown?.map((category) => (
                                                                <div key={category.category} className="space-y-1">
                                                                    <div className="flex items-center gap-2 px-4 pt-4 pb-2">
                                                                        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gray-50">
                                                                            <category.icon className="w-3.5 h-3.5 text-gray-400" />
                                                                        </div>
                                                                        <h3 className="text-[11px] font-medium tracking-widest uppercase text-gray-400">
                                                                            {category.category}
                                                                        </h3>
                                                                    </div>
                                                                    {category.items.map((subItem) => (
                                                                        <Link
                                                                            key={subItem.name}
                                                                            href={subItem.href}
                                                                            className="group flex items-start gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50/80 transition-colors"
                                                                            onClick={() => setActiveDropdown(null)}
                                                                        >
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="text-[13px] font-normal text-gray-800 group-hover:text-black transition-colors flex items-center gap-2">
                                                                                    {subItem.name}
                                                                                </p>
                                                                                <p className="text-[11px] text-gray-400 font-light mt-0.5 leading-relaxed">
                                                                                    {subItem.description}
                                                                                </p>
                                                                            </div>
                                                                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0" />
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-100/80 flex items-center justify-between">
                                                        <a
                                                            href="tel:+4366491886320"
                                                            className="flex items-center gap-2.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                                                        >
                                                            <Phone className="w-3.5 h-3.5" />
                                                            <span className="font-light">+43 664 91 88 632</span>
                                                        </a>
                                                        <a
                                                            href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-full transition-colors"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            Termin buchen
                                                            <ChevronRight className="w-3 h-3" />
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </nav>

                            {/* Desktop CTA Button */}
                            <div className="hidden md:block">
                                <a
                                    href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center justify-center"
                                >
                                    Termin vereinbaren
                                </a>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden relative z-50 p-2"
                                aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
                            >
                                <motion.div
                                    animate={isOpen ? "open" : "closed"}
                                    className="w-6 h-6 relative"
                                >
                                    <motion.span
                                        className={`absolute left-0 w-full h-0.5 origin-center transition-colors duration-300 ${isScrolled || isOpen
                                            ? "bg-gray-700"
                                            : "bg-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                                            }`}
                                        style={{ top: "25%" }}
                                        variants={{
                                            closed: { rotate: 0, y: 0 },
                                            open: { rotate: 45, y: 6 }
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <motion.span
                                        className={`absolute left-0 w-full h-0.5 origin-center transition-colors duration-300 ${isScrolled || isOpen
                                            ? "bg-gray-700"
                                            : "bg-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                                            }`}
                                        style={{ top: "50%" }}
                                        variants={{
                                            closed: { opacity: 1 },
                                            open: { opacity: 0 }
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <motion.span
                                        className={`absolute left-0 w-full h-0.5 origin-center transition-colors duration-300 ${isScrolled || isOpen
                                            ? "bg-gray-700"
                                            : "bg-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                                            }`}
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
                </header>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div
                        className="md:hidden"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 30
                        }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                            onClick={closeMobileMenu}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
                        >
                            <nav
                                className="h-full overflow-y-auto"
                                style={{
                                    paddingTop: 'calc(var(--promo-banner-height, 0px) + 4rem + max(0.5rem, env(safe-area-inset-top)))',
                                    paddingBottom: 'max(2rem, env(safe-area-inset-bottom))'
                                }}
                            >
                                <div className="pb-8">
                                    {navigation.map((item, index) => (
                                        <motion.div
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
                                                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
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
                                                                    <div key={category.category} className="px-6 py-4">
                                                                        <div className="flex items-center gap-2 mb-3">
                                                                            <category.icon className="w-4 h-4 text-secondary" />
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
                                                    className="block px-6 py-4 text-sm font-light tracking-widest uppercase text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                        </motion.div>
                                    ))}

                                    {/* Mobile CTAs */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="mt-8 px-6 space-y-4"
                                    >
                                        <a
                                            href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={closeMobileMenu}
                                            className="block w-full btn-primary text-center"
                                        >
                                            Termin vereinbaren
                                        </a>

                                        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 pt-4">
                                            <Phone className="w-4 h-4" />
                                            <a href="tel:+436649188632" className="font-light hover:text-black transition-colors">
                                                +43 664 91 88 632
                                            </a>
                                        </div>
                                    </motion.div>

                                    {/* Oster-Hase im Mobile Nav */}
                                    {isEaster && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                                            className="flex justify-center mt-8"
                                        >
                                            <motion.div
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <Image
                                                    src="/images/easter-bunny.png"
                                                    alt="Frohe Ostern!"
                                                    width={100}
                                                    height={100}
                                                    className="w-20 h-20 opacity-80"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {/* Footer Links */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-8 pt-8 px-6 border-t border-gray-200"
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
                                </div>
                            </nav>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Oster-Hase - Peek von unten rechts */}
            <AnimatePresence>
                {isEaster && !isOpen && (
                    <motion.div
                        className="fixed bottom-0 right-2 sm:right-4 md:right-8 z-30 pointer-events-none"
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 60, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 1.5 }}
                    >
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Image
                                src="/images/easter-bunny.png"
                                alt="Frohe Ostern!"
                                width={90}
                                height={90}
                                className="w-14 h-14 sm:w-16 sm:h-16 md:w-[90px] md:h-[90px] translate-y-2 md:translate-y-3"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 