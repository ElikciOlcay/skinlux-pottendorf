import { SKINPEN_COMING_SOON_LABEL } from "@/lib/skinpen-badge";

type ComingSoonBadgeProps = {
    className?: string;
    /** sm: Navigation / kompakte Zeilen, md: Hero & Karten */
    size?: "sm" | "md";
};

export default function ComingSoonBadge({ className = "", size = "md" }: ComingSoonBadgeProps) {
    const isSm = size === "sm";
    return (
        <span
            role="status"
            aria-label={SKINPEN_COMING_SOON_LABEL}
            className={[
                "inline-flex items-center rounded-full font-medium uppercase",
                "border shadow-sm backdrop-blur-[2px]",
                "bg-gradient-to-r from-[rgba(209,250,229,0.55)] via-[rgba(167,243,208,0.4)] to-[rgba(134,239,172,0.35)]",
                "border-[rgba(52,211,153,0.55)] text-[#14532d]",
                "ring-1 ring-inset ring-white/60",
                isSm ? "gap-1 px-2.5 py-0.5 text-[9px] tracking-[0.14em]" : "gap-1.5 px-3.5 py-1.5 text-[10px] sm:text-[11px] tracking-[0.16em]",
                className,
            ].join(" ")}
        >
            <span className={`relative flex shrink-0 ${isSm ? "h-1.5 w-1.5" : "h-2 w-2"}`}>
                <span
                    className={`absolute inline-flex animate-ping rounded-full bg-emerald-400 opacity-45 ${isSm ? "h-1.5 w-1.5" : "h-2 w-2"}`}
                />
                <span
                    className={`relative inline-flex rounded-full bg-emerald-600 ${isSm ? "h-1.5 w-1.5" : "h-2 w-2"}`}
                />
            </span>
            {SKINPEN_COMING_SOON_LABEL}
        </span>
    );
}
