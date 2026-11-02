import FaqAccordion from "@/components/ui/FaqAccordion";
import { HOME_FAQ, HOME_FAQ_SCHEMA } from "@/lib/seo/homeFaq";

export default function HomeFaq() {
    return (
        <section id="faq" className="py-16 md:py-20 bg-white" aria-labelledby="home-faq-heading">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_SCHEMA) }}
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-12">
                    <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Häufige Fragen
                    </span>
                    <h2 id="home-faq-heading" className="text-3xl md:text-4xl lg:text-5xl font-light text-black">
                        Gut zu wissen
                    </h2>
                </div>
                <FaqAccordion items={HOME_FAQ} />
            </div>
        </section>
    );
}
