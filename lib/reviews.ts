export interface GoogleReview {
    author: string;
    text: string;
    service: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
    {
        author: "Anna-Sophie Handler",
        text: "Ich bin schon länger bei Skinlux zur Laser-Haarentfernung und total zufrieden. Bereits beim Erstgespräch mit Ebru wurde ich super beraten und habe mich sofort wohlgefühlt. Mittlerweile werde ich von Viki behandelt – authentisch, professionell und sehr hygienisch. Man merkt nach jeder Sitzung, dass die Haare feiner und weniger werden.",
        service: "Laser-Haarentfernung",
    },
    {
        author: "Tina Tinhof",
        text: "Ich bin schon seit einiger Zeit bei Ebru und Team in Behandlung und bin rundum zufrieden. Die Preise sind gerechtfertigt, die Räumlichkeiten gemütlich und alles läuft sehr hygienisch ab. Man fühlt sich einfach wohl – 100%ige Weiterempfehlung.",
        service: "Laser-Haarentfernung",
    },
    {
        author: "Lisa Kolowratek",
        text: "Empfehlenswertes Laser Studio – die Kommunikation funktioniert sehr gut, aufgrund der guten Öffnungszeiten ist die Vereinbarkeit mit der Arbeit sehr gut gegeben. Alle Fragen werden ausführlich beantwortet und man merkt schnell Erfolge.",
        service: "Laser-Haarentfernung",
    },
];

export const GOOGLE_REVIEWS_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": "https://pottendorf.skinlux.at/#business",
    name: "Skinlux Pottendorf",
    review: GOOGLE_REVIEWS.map((review) => ({
        "@type": "Review",
        author: {
            "@type": "Person",
            name: review.author,
        },
        reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
        },
        reviewBody: review.text,
    })),
};
