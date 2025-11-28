"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Mail, Calendar, Sparkles } from "lucide-react";

export default function LaserAktionErfolgPage() {
  return (
    <main className="min-h-screen bg-white pt-20 md:pt-24 pb-16 md:pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10 md:mb-14">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 md:w-14 md:h-14" style={{ color: "var(--color-secondary)" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-4 h-4" style={{ color: "var(--color-secondary)" }} />
              <span className="text-sm md:text-base font-light tracking-[0.3em] uppercase text-gray-500">
                50% Rabatt – Erste 2 Behandlungen
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6"
              style={{ color: "#000" }}
            >
              Terminanfrage <span style={{ color: "var(--color-secondary)" }}>erfolgreich</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto px-4 mb-8 md:mb-12"
            >
              Vielen Dank für deine Anfrage! Wir haben deine Buchung erhalten und melden uns zur Bestätigung deines Termins.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-50 p-6 md:p-8 lg:p-10 rounded-none mb-8 md:mb-12"
          >
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-light mb-2" style={{ color: "#000" }}>
                    E-Mail-Bestätigung
                  </h3>
                  <p className="text-gray-600 font-light">
                    Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details zu deiner Terminanfrage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-light mb-2" style={{ color: "#000" }}>
                    Nächste Schritte
                  </h3>
                  <p className="text-gray-600 font-light">
                    Wir prüfen deine Anfrage und melden uns innerhalb von 24 Stunden zur Terminbestätigung bei dir.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/laser-aktion"
              className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-black text-white text-sm md:text-base uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Aktion
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 border border-gray-300 text-gray-700 text-sm md:text-base uppercase tracking-widest hover:bg-gray-50 transition-colors"
            >
              Zur Startseite
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
