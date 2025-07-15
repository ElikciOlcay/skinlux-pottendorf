import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100">
            {/* Main Footer Content */}
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    {/* Contact */}
                    <div className="text-center md:text-left">
                        <h4 className="text-xs font-light tracking-widest uppercase text-gray-500 mb-6">
                            Kontakt
                        </h4>
                        <div className="space-y-3">
                            <a
                                href="tel:+436649188632"
                                className="flex items-center justify-center md:justify-start gap-3 text-gray-600 hover:text-black transition-colors"
                            >
                                <Phone className="w-4 h-4" strokeWidth={1} />
                                <span className="font-light">+43 664 91 88 632</span>
                            </a>
                            <div className="flex items-start justify-center md:justify-start gap-3 text-gray-600">
                                <MapPin className="w-4 h-4 mt-0.5" strokeWidth={1} />
                                <div className="font-light">
                                    <p>Dr. Heinz-Fischer-Straße 3/2</p>
                                    <p>2486 Pottendorf</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="text-center">
                        <h4 className="text-xs font-light tracking-widest uppercase text-gray-500 mb-6">
                            Öffnungszeiten
                        </h4>
                        <div className="flex items-start justify-center gap-3 text-gray-600">
                            <Clock className="w-4 h-4 mt-0.5" strokeWidth={1} />
                            <div className="font-light">
                                <p>Montag - Mittwoch: 9:00 - 18:00</p>
                                <p>Donnerstag - Freitag: 9:00 - 17:00</p>
                                <p>Samstag - Sonntag: Geschlossen</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links & Reviews */}
                    <div className="text-center md:text-right">
                        <h4 className="text-xs font-light tracking-widest uppercase text-gray-500 mb-6">
                            Navigation
                        </h4>
                        <nav className="space-y-2 mb-6">
                            <Link
                                href="/behandlungen/laser-haarentfernung"
                                className="block font-light text-gray-600 hover:text-black transition-colors"
                            >
                                Laser Haarentfernung
                            </Link>
                            <Link
                                href="/behandlungen/hydra-facial"
                                className="block font-light text-gray-600 hover:text-black transition-colors"
                            >
                                HydraFacial®
                            </Link>
                            <Link
                                href="/ueber-uns"
                                className="block font-light text-gray-600 hover:text-black transition-colors"
                            >
                                Über uns
                            </Link>
                            <Link
                                href="/kontakt"
                                className="block font-light text-gray-600 hover:text-black transition-colors"
                            >
                                Kontakt
                            </Link>
                            <Link
                                href="/gutscheine"
                                className="block font-light text-gray-600 hover:text-black transition-colors"
                            >
                                Gutscheine
                            </Link>
                            <a
                                href="https://www.instagram.com/skinlux_bischofshofen/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block font-light text-gray-600 hover:text-black transition-colors"
                            >
                                Instagram
                            </a>
                        </nav>

                        {/* Google Reviews */}
                        <div className="flex items-center justify-center md:justify-end gap-2">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-3 h-3 fill-current text-yellow-400"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <a
                                href="https://g.page/r/CQg7TXOu2H5XEBM/review"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-light text-gray-600 hover:text-black transition-colors"
                            >
                                180+ Google Bewertungen
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-100">
                <div className="container py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-gray-500">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/">
                                <Image
                                    src="/images/logo/skinlux-logo.png"
                                    alt="SKINLUX"
                                    width={100}
                                    height={32}
                                    className="h-6 w-auto hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            </Link>
                        </div>

                        {/* Copyright */}
                        <p>© 2024 Skinlux. Alle Rechte vorbehalten.</p>

                        {/* Legal Links */}
                        <div className="flex gap-6">
                            <Link
                                href="/impressum"
                                className="hover:text-black transition-colors"
                            >
                                Impressum
                            </Link>
                            <Link
                                href="/datenschutz"
                                className="hover:text-black transition-colors"
                            >
                                Datenschutz
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 