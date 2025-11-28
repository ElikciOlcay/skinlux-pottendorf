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
  LaserPackageItem,
  getPackagesByGender,
} from "@/lib/laser-prices";

type BookingFormState = {
  name: string;
  email: string;
  phone: string;
  gender: GenderType;
  preferredDate: string; // yyyy-mm-dd
  preferredTime: string; // HH:mm
  message?: string;
  consent: boolean;
};

const DISCOUNT_PERCENT = 50;

export default function LaserAktionBuchenPage() {
  const [gender, setGender] = useState<GenderType>("damen");
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const prices = useMemo(() => getPricesByGender(gender), [gender]);
  const priceMap = useMemo<Record<string, LaserPriceItem>>(() => {
    const map: Record<string, LaserPriceItem> = {};
    prices.forEach((p) => (map[p.zone] = p));
    return map;
  }, [prices]);

  const packages = useMemo(() => getPackagesByGender(gender), [gender]);
  const packagePriceMap = useMemo<Record<string, LaserPackageItem>>(() => {
    const map: Record<string, LaserPackageItem> = {};
    packages.forEach((p) => (map[p.name] = p));
    return map;
  }, [packages]);

  const [form, setForm] = useState<BookingFormState>({
    name: "",
    email: "",
    phone: "",
    gender,
    preferredDate: "",
    preferredTime: "",
    message: "",
    consent: false,
  });

  function update<K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const totalOriginal = useMemo(() => {
    const zonesSum = selectedZones.reduce((sum, z) => sum + (priceMap[z]?.priceEuro || 0), 0);
    const packagesSum = selectedPackages.reduce((sum, p) => sum + (packagePriceMap[p]?.priceEuro || 0), 0);
    return zonesSum + packagesSum;
  }, [selectedZones, selectedPackages, priceMap, packagePriceMap]);

  const totalDiscounted = useMemo(() => {
    const zonesSum = selectedZones.reduce(
      (sum, z) => sum + discounted(priceMap[z]?.priceEuro || 0, DISCOUNT_PERCENT),
      0
    );
    const packagesSum = selectedPackages.reduce(
      (sum, p) => sum + discounted(packagePriceMap[p]?.priceEuro || 0, DISCOUNT_PERCENT),
      0
    );
    return zonesSum + packagesSum;
  }, [selectedZones, selectedPackages, priceMap, packagePriceMap]);

  function toggleZone(zone: string) {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  }
  function togglePackage(pkg: string) {
    setSelectedPackages((prev) =>
      prev.includes(pkg) ? prev.filter((z) => z !== pkg) : [...prev, pkg]
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      (selectedZones.length === 0 && selectedPackages.length === 0) ||
      !form.preferredDate ||
      !form.preferredTime
    ) {
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
          zones: selectedZones,
          packages: selectedPackages,
          // Für Loops Templates (Abwärtskompatibilität)
          zone: [...selectedZones, ...selectedPackages].join(", "),
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
      setSelectedZones([]);
      setSelectedPackages([]);
      setStep(1);
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
                setSelectedZones([]);
                setSelectedPackages([]);
                update("gender", "damen");
                setStep(1);
              }}
              className={`px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm font-light tracking-widest uppercase transition-all duration-300 ${gender === "damen" ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              Damen
            </button>
            <button
              onClick={() => {
                setGender("herren");
                setSelectedZones([]);
                setSelectedPackages([]);
                update("gender", "herren");
                setStep(1);
              }}
              className={`px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm font-light tracking-widest uppercase transition-all duration-300 ${gender === "herren" ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              Herren
            </button>
          </div>
        </motion.div>

        {step === 1 && (
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 p-4 md:p-8 lg:p-10"
            >
              <div className="mb-4 p-3 bg-white border border-gray-200 text-sm text-gray-700">
                <span className="font-medium">Hinweis:</span> Klicke auf eine Zeile, um die Leistung auszuwählen.
                Du kannst mehrere Pakete und/oder Zonen wählen.
              </div>
              {gender === "damen" && (
                <div className="mb-8">
                  <div className="grid grid-cols-3 gap-2 md:gap-4 pb-4 md:pb-6 border-b border-gray-200">
                    <div className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500">Pakete</div>
                    <div className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 text-center">
                      Regulär
                    </div>
                    <div className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 text-right">
                      Jetzt
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {packages.map((pkg, index) => {
                      const sale = discounted(pkg.priceEuro, DISCOUNT_PERCENT);
                      const active = selectedPackages.includes(pkg.name);
                      return (
                        <motion.button
                          key={pkg.name}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: index * 0.03 }}
                          type="button"
                          onClick={() => togglePackage(pkg.name)}
                          role="checkbox"
                          aria-checked={active}
                          className={`w-full grid grid-cols-3 gap-2 md:gap-4 py-3 md:py-4 text-left hover:bg-white transition cursor-pointer border ${active ? "bg-white border-secondary" : "border-transparent hover:border-secondary/30"}`}
                        >
                          <div className="font-light text-gray-800 text-sm md:text-base flex items-center gap-2">
                            {active ? (
                              <CheckCircle className="w-4 h-4 text-secondary" />
                            ) : (
                              <span className="w-4 h-4 rounded-full border border-gray-300" />
                            )}
                            {pkg.name}
                          </div>
                          <div className="font-light text-center text-gray-500 line-through text-xs md:text-sm">
                            {euro(pkg.priceEuro)}
                          </div>
                          <div
                            className="font-light text-right text-sm md:text-base"
                            style={{ color: "var(--color-secondary)" }}
                          >
                            {euro(sale)}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
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
                  const active = selectedZones.includes(item.zone);
                  return (
                    <motion.button
                      key={item.zone}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      type="button"
                      onClick={() => toggleZone(item.zone)}
                      role="checkbox"
                      aria-checked={active}
                      className={`w-full grid grid-cols-3 gap-2 md:gap-4 py-3 md:py-4 text-left hover:bg-white transition cursor-pointer border ${active ? "bg-white border-secondary" : "border-transparent hover:border-secondary/30"}`}
                    >
                      <div className="font-light text-gray-800 text-sm md:text-base flex items-center gap-2">
                        {active ? (
                          <CheckCircle className="w-4 h-4 text-secondary" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-gray-300" />
                        )}
                        {item.zone}
                      </div>
                      <div className="font-light text-center text-gray-500 line-through text-xs md:text-sm">
                        {euro(item.priceEuro)}
                      </div>
                      <div
                        className="font-light text-right text-sm md:text-base"
                        style={{ color: "var(--color-secondary)" }}
                      >
                        {euro(sale)}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Pakete sind nun oben platziert */}

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div className="text-sm text-gray-700 font-light">
                  Ausgewählt: {selectedZones.length + selectedPackages.length} –{" "}
                  <span className="line-through mr-1">{euro(totalOriginal)}</span>
                  <span style={{ color: "var(--color-secondary)" }}>{euro(totalDiscounted)}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    className="px-6 py-3 border border-gray-300 text-sm uppercase tracking-widest"
                    onClick={() => {
                      setSelectedZones([]);
                      setSelectedPackages([]);
                    }}
                    type="button"
                  >
                    Auswahl löschen
                  </button>
                  <button
                    className="px-6 py-3 bg-black text-white text-sm uppercase tracking-widest disabled:opacity-50"
                    onClick={() => setStep(2)}
                    disabled={selectedZones.length === 0 && selectedPackages.length === 0}
                    type="button"
                  >
                    Weiter zum Formular
                  </button>
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-500 mt-4">
                Der Rabatt gilt für deine ersten zwei Behandlungen. Alle Preise pro Behandlung.
              </p>
            </motion.div>
          </div>
        )}

        {step === 2 && (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
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
                  <div className="mb-4 p-3 text-sm bg-green-50 text-green-700 border border-green-200">{success}</div>
                )}
                {error && (
                  <div className="mb-4 p-3 text-sm bg-red-50 text-red-700 border border-red-200">{error}</div>
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
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
                    Nachricht (optional)
                  </label>
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

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 text-sm uppercase tracking-widest"
                  >
                    Zurück
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-black text-white text-sm uppercase tracking-widest disabled:opacity-60"
                  >
                    {submitting ? "Wird gesendet…" : "Buchung anfragen"}
                  </button>
                </div>
              </motion.form>
            </div>
            <div>
              <div className="bg-gray-50 p-4 md:p-6 lg:p-8">
                <h3 className="text-base font-light mb-4" style={{ color: "#000" }}>
                  Deine Auswahl
                </h3>
                <div className="divide-y divide-gray-200">
                  {selectedZones.map((z) => {
                    const orig = priceMap[z]?.priceEuro || 0;
                    const sale = discounted(orig, DISCOUNT_PERCENT);
                    return (
                      <div key={z} className="py-3 flex items-center justify-between">
                        <div className="text-sm text-gray-800">{z}</div>
                        <div className="text-sm">
                          <span className="line-through text-gray-400 mr-2">{euro(orig)}</span>
                          <span style={{ color: "var(--color-secondary)" }}>{euro(sale)}</span>
                        </div>
                      </div>
                    );
                  })}
                  {selectedPackages.map((p) => {
                    const orig = packagePriceMap[p]?.priceEuro || 0;
                    const sale = discounted(orig, DISCOUNT_PERCENT);
                    return (
                      <div key={p} className="py-3 flex items-center justify-between">
                        <div className="text-sm text-gray-800">{p}</div>
                        <div className="text-sm">
                          <span className="line-through text-gray-400 mr-2">{euro(orig)}</span>
                          <span style={{ color: "var(--color-secondary)" }}>{euro(sale)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-700">Summe</span>
                  <div>
                    <span className="line-through text-gray-400 mr-2">{euro(totalOriginal)}</span>
                    <span className="font-medium" style={{ color: "var(--color-secondary)" }}>
                      {euro(totalDiscounted)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
