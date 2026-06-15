import Link from "next/link";

const regionalLinks = [
  { href: "/pottendorf/laser-haarentfernung", label: "Laser Pottendorf" },
  { href: "/wien/laser-haarentfernung", label: "Laser Wien" },
  { href: "/baden-bei-wien/laser-haarentfernung", label: "Laser Baden" },
  { href: "/wiener-neustadt/laser-haarentfernung", label: "Laser Wiener Neustadt" },
  { href: "/moedling/laser-haarentfernung", label: "Laser Mödling" },
  { href: "/wien/hydra-facial", label: "HydraFacial Wien" },
  { href: "/pottendorf/hydra-facial", label: "HydraFacial Pottendorf" },
  { href: "/behandlungen/laser-haarentfernung", label: "Laser Haarentfernung" },
  { href: "/standorte", label: "Alle Standorte" },
];

export default function RegionalSeoHub() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-100">
      <div className="container max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-light text-black mb-3 text-center">
          Behandlungen in Niederösterreich & Wien-Umland
        </h2>
        <p className="text-gray-600 font-light text-center mb-8 max-w-2xl mx-auto">
          Lokale Infos und Terminbuchung für Pottendorf, Wien, Baden und Umgebung.
        </p>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {regionalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-light text-gray-600 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
