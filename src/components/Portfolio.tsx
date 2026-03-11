"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Baby, Heart, Camera, PartyPopper, Gift, Users, Trees, Home } from "lucide-react";

// Sample luxury photography placeholders
const PORTFOLIO_ITEMS = [
    { id: 1, title: "Editorial", span: "md:col-span-2 md:row-span-2", img: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1200&auto=format&fit=crop" },
    { id: 2, title: "Portrait", span: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Commercial", span: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Fine Art", span: "md:col-span-2 md:row-span-1", img: "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=1200&auto=format&fit=crop" },
];

export function Portfolio() {
    return (
        <section className="relative w-full min-h-screen px-6 py-32 flex items-center justify-end pointer-events-none z-10">
            <div className="w-full md:w-[45%] pr-0 md:pr-16 pointer-events-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.1
                            }
                        }
                    }}
                    className="mb-16 md:mb-24 flex flex-col items-start w-full"
                >
                    <motion.p variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 30 } } }} className="font-mono text-brand-accent tracking-widest uppercase text-sm mb-4 font-bold drop-shadow-md">Our Services</motion.p>
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 30 } } }} className="text-4xl md:text-6xl text-brand-fg mb-6 drop-shadow-lg font-medium">
                        Memories in <span className="text-brand-accent italic font-light drop-shadow-md">focus.</span>
                    </motion.h2>

                    <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 30 } } }} className="w-full">
                        <ul className="space-y-4 font-sans text-brand-fg text-lg md:text-xl font-semibold drop-shadow-md">
                            <li className="flex items-center gap-3"><Baby className="text-brand-accent w-6 h-6 drop-shadow-md" /> Newborn Photography</li>
                            <li className="flex items-center gap-3"><Heart className="text-brand-accent w-6 h-6 drop-shadow-md" /> Maternity Photography</li>
                            <li className="flex items-center gap-3"><Camera className="text-brand-accent w-6 h-6 drop-shadow-md" /> Baby Milestone Sessions</li>
                            <li className="flex items-center gap-3"><PartyPopper className="text-brand-accent w-6 h-6 drop-shadow-md" /> Cake Smash Shoots</li>
                            <li className="flex items-center gap-3"><Gift className="text-brand-accent w-6 h-6 drop-shadow-md" /> Birthday Shoots</li>
                            <li className="flex items-center gap-3"><Users className="text-brand-accent w-6 h-6 drop-shadow-md" /> Family Portraits</li>
                            <li className="flex items-center gap-3"><Trees className="text-brand-accent w-6 h-6 drop-shadow-md" /> Outdoor Family Sessions</li>
                            <li className="flex items-center gap-3"><Home className="text-brand-accent w-6 h-6 drop-shadow-md" /> Studio Rental</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 30 } } }}
                        className="mt-12 w-full pt-8 border-t border-brand-fg/30"
                    >
                        <Link href="/portfolio" className="inline-block self-start border-b-2 border-brand-accent text-brand-fg tracking-widest hover:text-brand-accent transition-colors duration-300 pb-1 uppercase font-bold text-sm drop-shadow-md">
                            EXPLORE THE ARCHIVE
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
