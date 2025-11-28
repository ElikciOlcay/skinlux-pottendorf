"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Calendar, Sparkles } from "lucide-react";
import {
  GenderType,
  getPricesByGender,
  discounted,
  euro,
  LaserPriceItem,
} from "@/lib/laser-prices";

type BookingFormState = {
  name: string;
  email: string;
  phone: string;
  gender: GenderType;
  zone: string;
  preferredDate: string; // yyyy-mm-dd
  preferredTime: string; // HH:mm
  message?: string;
  consent: boolean;
};

const DISCOUNT_PERCENT = 50;

export default function LaserAktionBuchenPage() {
  const [gender, setGender] = useState<GenderType>("damen");
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const prices = useMemo(() => getPricesByGender(gender), [gender]);
  const zones = useMemo(() => prices.map((p) => p.zone), [prices]);

  const priceMap = useMemo<Record<string, LaserPriceItem>>(() => {
    const map: Record<string, LaserPriceItem> = {};
    prices.forEach((p) => (map[p.zone] = p));
    return map;
  }, [prices]);

  const [form, setForm] = useState<BookingFormState>({
    name: "",
    email: "",
    phone: "",
    gender,
    zone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    consent: false,
  });

  function update<K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name || !form.email || !form.phone || !form.zone || !form.preferredDate || !form.preferredTime) {
      setError("Bitte alle Pflichtfelder ausfüllen.");
      return;
    }
    if (!form.consent) {
      setError("Bitte bestätigen Sie die Datenschutzerklärung.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/laser-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          gender,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Anfrage fehlgeschlagen");
      }
      setSuccess("Vielen Dank! Wir bestätigen Ihren Wunschtermin per E-Mail.");
      // Reset nur teilweise, damit der User Zone/Geschlecht nicht verliert
      setForm((prev) => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
        consent: false,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white pt-20 md:pt-24 pb-16 md:pb-20">
      <div className="container">
        <Link
          href="/laser-aktion"
          className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Aktion
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" style={{ color: "var(--color-secondary)" }} />
            <span className="text-xs md:text-sm font-light tracking-[0.3em] uppercase text-gray-500">
              50% Rabatt – Erste 2 Behandlungen
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-3 md:mb-4" style={{ color: "#000" }}>
            Termin buchen
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto px-4">
            Wähle deinen Bereich und buche deinen Wunschtermin. Die Preise unten sind bereits um {DISCOUNT_PERCENT}% reduziert.
          </p>
        </motion.div>

        {/* Gender Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex justify-center mb-8 md:mb-10"
        >
          <div className="inline-flex border border-gray-200">
            <button
              onClick={() => {
                setGender("damen");
                setSelectedZone("");
                update("gender", "damen");
                update("zone", "");
              }}
              className={`px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm font-light tracking-widest uppercase transition-all duration-300 ${
                gender === "damen" ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Damen
            </button>
            <button
              onClick={() => {
                setGender("herren");
                setSelectedZone("");
                update("gender", "herren");
                update("zone", "");
              }}
              className={`px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm font-light tracking-widest uppercase transition-all duration-300 ${
                gender === "herren" ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Herren
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Preise */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-50 p-4 md:p-8 lg:p-10"
          >
            <div className="grid grid-cols-3 gap-2 md:gap-4 pb-4 md:pb-6 border-b border-gray-200">
              <div className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500">Zone</div>
              <div className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 text-center">
                Regulär
              </div>
              <div className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 text-right">
                Jetzt
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {prices.map((item, index) => {
                const sale = discounted(item.priceEuro, DISCOUNT_PERCENT);
                return (
                  <motion.button
                    key={item.zone}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.03 }}
                    type="button"
                    onClick={() => {
                      setSelectedZone(item.zone);
                      update("zone", item.zone);
                    }}
                    className={`w-full grid grid-cols-3 gap-2 md:gap-4 py-3 md:py-4 text-left hover:bg-white transition ${
                      selectedZone === item.zone ? "bg-white" : ""
                    }`}
                  >
                    <div className="font-light text-gray-800 text-sm md:text-base flex items-center gap-2">
                      {selectedZone === item.zone ? (
                        <CheckCircle className="w-4 h-4 text-secondary" />
                      ) : (
                        <span className="w-4 h-4" />
                      )}
                      {item.zone}
                    </div>
                    <div className="font-light text-center text-gray-500 line-through text-xs md:text-sm">
                      {euro(item.priceEuro)}
                    </div>
                    <div className="font-light text-right text-sm md:text-base" style={{ color: "var(--color-secondary)" }}>
                      {euro(sale)}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <p className="text-xs md:text-sm text-gray-500 mt-4">
              Der Rabatt gilt für deine ersten zwei Behandlungen. Alle Preise pro Behandlung.
            </p>
          </motion.div>

          {/* Formular */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white border border-gray-200 p-4 md:p-8 lg:p-10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-light" style={{ color: "#000" }}>
                Wunschtermin anfragen
              </h2>
            </div>

            {success && (
              <div className="mb-4 p-3 text-sm bg-green-50 text-green-700 border border-green-200">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 text-sm bg-red-50 text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">E-Mail</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Telefon</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Zone</label>
                <select
                  required
                  value={form.zone}
                  onChange={(e) => {
                    setSelectedZone(e.target.value);
                    update("zone", e.target.value);
                  }}
                  className="w-full border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  <option value="" disabled>
                    Bitte wählen
                  </option>
                  {zones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
                {form.zone && (
                  <p className="text-xs text-gray-600 mt-1">
                    Preis:{" "}
                    <span className="line-through mr-1">{euro(priceMap[form.zone]?.priceEuro || 0)}</span>
                    <span style={{ color: "var(--color-secondary)" }}>
                      {euro(discounted(priceMap[form.zone]?.priceEuro || 0, DISCOUNT_PERCENT))}
                    </span>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Datum</label>
                <input
                  type="date"
                  required
                  value={form.preferredDate}
                  onChange={(e) => update("preferredDate", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Uhrzeit</label>
                <input
                  type="time"
                  required
                  value={form.preferredTime}
                  onChange={(e) => update("preferredTime", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Nachricht (optional)</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>

            <div className="mt-4 flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-xs text-gray-600">
                Ich stimme der{" "}
                <Link href="/stornobedingungen" className="underline">
                  Datenschutzerklärung und Stornobedingungen
                </Link>{" "}
                zu.
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-6 inline-flex items-center justify-center px-8 py-3 bg-black text-white text-sm tracking-widest uppercase hover:bg-gray-800 transition disabled:opacity-60"
            >
              {submitting ? "Wird gesendet…" : "Buchung anfragen"}
            </button>
          </motion.form>
        </div>
      </div>
    </main>
  );
}
