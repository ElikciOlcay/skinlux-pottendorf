import Image from "next/image";
import Link from "next/link";
import BookingButton from "@/components/campaign/BookingButton";
import CampaignViewTracker from "@/components/campaign/CampaignViewTracker";

const bookingButtonClass =
    "inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[var(--color-primary)] px-6 py-4 text-center text-xs font-light uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]";

const textLinkClass =
    "underline decoration-[var(--color-gray-300)] underline-offset-4 transition-colors hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]";

type CampaignChromeProps = {
    bookingUrl: string;
    contentName: string;
    children: React.ReactNode;
};

export default function CampaignChrome({
    bookingUrl,
    contentName,
    children,
}: CampaignChromeProps) {
    return (
        <div className="bg-white pb-28 text-[var(--color-text-primary)] md:pb-0">
            <CampaignViewTracker contentName={contentName} />

            <header className="border-b border-[var(--color-gray-300)]">
                <div className="container flex h-16 items-center justify-center md:h-20">
                    <Image
                        src="/images/logo/skinlux-logo.png"
                        alt="Skinlux"
                        width={800}
                        height={300}
                        className="h-8 w-auto md:h-10"
                    />
                </div>
            </header>

            {children}

            <footer className="border-t border-[var(--color-gray-300)]">
                <nav aria-label="Rechtliches" className="container flex items-center justify-center gap-8 py-6 text-sm font-light">
                    <Link href="/impressum" className={textLinkClass}>
                        Impressum
                    </Link>
                    <Link href="/datenschutz" className={textLinkClass}>
                        Datenschutz
                    </Link>
                </nav>
            </footer>

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-gray-300)] bg-white px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
                <p className="mb-2 text-center text-[11px] font-light uppercase tracking-[0.16em] text-[var(--color-gray-700)]">
                    50 % auf die ersten 2 Behandlungen
                </p>
                <BookingButton href={bookingUrl} className={bookingButtonClass}>
                    Jetzt Termin buchen
                </BookingButton>
            </div>
        </div>
    );
}
