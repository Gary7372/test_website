"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PORTFOLIO_ITEMS = [
    { id: 1, title: "Luminescent", subtitle: "F/1.4" },
    { id: 2, title: "After Hours", subtitle: "ISO 800" },
    { id: 3, title: "The Void", subtitle: "F/2.8" },
    { id: 4, title: "Refractions", subtitle: "ISO 100" },
    { id: 5, title: "Silver Lining", subtitle: "F/4.0" },
];

export default function HorizontalPortfolio() {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Maps vertical scroll to horizontal x-translation string
    // Subtracting total width out of view
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-brand-bg relative z-20">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                <div className="absolute top-10 left-10 md:left-32 z-10 pointer-events-none">
                    <h2 className="font-syncopate text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-fg">
                        Features
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-16 px-32 h-[60vh] md:h-[70vh]">
                    {PORTFOLIO_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="relative w-[80vw] md:w-[40vw] h-full flex-shrink-0 bg-white/5 border border-white/10 flex flex-col items-center justify-center overflow-hidden group hover:bg-white/10 transition-colors duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-bg to-transparent opacity-80" />
                            <div className="z-10 text-center font-syncopate flex flex-col items-center gap-4">
                                <span className="text-white/30 text-8xl font-black absolute top-10 right-10 leading-none">
                                    0{item.id}
                                </span>
                                <h3 className="text-3xl md:text-5xl uppercase font-bold text-white tracking-widest px-8">
                                    {item.title}
                                </h3>
                                <p className="font-mono text-sm tracking-[0.3em] text-white/50 bg-[#303030]/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
