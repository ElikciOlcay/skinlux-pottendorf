"use client";

import { openCookieSettings } from "@/lib/cookie-consent";

export default function CookieSettingsButton() {
    return (
        <button
            type="button"
            onClick={openCookieSettings}
            className="hover:text-black transition-colors"
        >
            Cookie-Einstellungen
        </button>
    );
}
