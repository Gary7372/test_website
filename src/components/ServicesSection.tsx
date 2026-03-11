"use client";

import { motion } from "framer-motion";
import { GooeyText } from "./GooeyText";

const TESTIMONIALS = [
    {
        id: "01",
        quote: "The patience and love with which they handled our baby was incredible.",
        author: "Priya S.",
        type: "Newborn Shoot"
    },
    {
        id: "02",
        quote: "Our cake smash shoot was stress-free and beautifully organized.",
        author: "Rahul M.",
        type: "Cake Smash"
    },
    {
        id: "03",
        quote: "They captured emotions, not just photos.",
        author: "Anjali K.",
        type: "Maternity Session"
    }
];

export function ServicesSection() {
    return (
        <section className="relative w-full px-6 py-20 md:py-32 flex items-center justify-start pointer-events-none z-10 overflow-hidden">
            <div className="w-full md:w-[80%] pl-0 md:pl-16 pointer-events-auto">

                <div className="flex flex-col mb-10 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-brand-gray tracking-widest uppercase text-sm mb-2 md:mb-4 inline-block"
                    >
                        Kind Words
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl text-brand-fg mb-4 md:mb-6"
                    >
                        Client <span className="text-brand-accent italic font-light drop-shadow-sm">Love.</span>
                    </motion.h2>
                </div>

                <div className="w-full relative min-h-[150px] md:min-h-[200px] flex items-center">
                    <span className="text-brand-accent text-3xl md:text-5xl font-serif leading-none mr-2 md:mr-4 drop-shadow-md self-start -mt-2">"</span>
                    <GooeyText
                        texts={TESTIMONIALS.map(t => t.quote)}
                        morphTime={0.8}
                        cooldownTime={2.5}
                        className="flex-1"
                        textClassName="font-sans text-brand-fg text-2xl md:text-4xl lg:text-5xl font-semibold italic leading-relaxed drop-shadow-md text-left justify-start"
                    />
                    <span className="text-brand-accent text-3xl md:text-5xl font-serif leading-none ml-2 md:ml-4 drop-shadow-md self-end mb-4">"</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-8 border-t border-brand-fg/30 flex justify-start"
                >
                    <a href="#reviews" className="inline-block border-b-2 border-brand-accent text-brand-fg tracking-widest hover:text-brand-accent transition-colors duration-300 pb-1 uppercase font-bold text-sm drop-shadow-md">
                        READ MORE REVIEWS
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
