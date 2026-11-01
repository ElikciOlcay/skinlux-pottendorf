import { ArrowRight } from "lucide-react";

type BookingButtonProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    conversionSource?: string;
};

export default function BookingButton({
    href,
    children,
    className,
    conversionSource = "laser-oktober",
}: BookingButtonProps) {
    return (
        <a
            href={href}
            className={className}
            data-conversion-source={conversionSource}
        >
            {children}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
    );
}
