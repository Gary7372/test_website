"use client";

import { motion } from "framer-motion";

// All 35 compressed baby images from public/baby
const ALL_BABY_IMAGES = Array.from({ length: 35 }, (_, i) => ({
    src: `/baby/baby-${i + 1}.jpg`,
    alt: `Baby photo ${i + 1}`,
}));

export default function BabyGallery() {
    return (
        <section className="w-full bg-brand-bg py-16 px-4 md:px-12 lg:px-24">
            {/* Section heading */}
            <div className="mb-12">
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-mono text-brand-gray tracking-widest uppercase text-xs mb-3 inline-block"
                >
                    Newborn Gallery
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className="text-3xl md:text-5xl font-sans text-brand-fg"
                >
                    Every tiny detail, <span className="text-brand-accent italic font-light">captured.</span>
                </motion.h2>
            </div>

            {/* Alternating large + small grid — one image reveals at a time */}
            <div className="flex flex-col gap-6 md:gap-10">
                {ALL_BABY_IMAGES.map((img, i) => {
                    // Alternate: wide full-width image, then a narrower offset one
                    const isAlternate = i % 2 === 1;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative overflow-hidden rounded-sm bg-[#1a1a1a] flex items-center justify-center ${isAlternate
                                    ? "w-full md:w-[70%] md:ml-auto h-auto min-h-[40vh]"
                                    : "w-full md:w-[80%] h-auto min-h-[45vh]"
                                }`}
                        >
                            {/* Thin yellow left accent stripe */}
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-accent z-10" />

                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.02]"
                            />

                            {/* Number badge */}
                            <span className="absolute bottom-4 right-4 font-mono text-[11px] text-white/30 tracking-widest z-10">
                                {String(i + 1).padStart(2, "0")} / {String(ALL_BABY_IMAGES.length).padStart(2, "0")}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
