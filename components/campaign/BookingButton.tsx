import { ArrowRight } from "lucide-react";

type BookingButtonProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export default function BookingButton({
    href,
    children,
    className,
}: BookingButtonProps) {
    return (
        <a
            href={href}
            className={className}
            data-conversion-source="laser-oktober"
        >
            {children}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
    );
}
