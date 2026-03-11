"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function StorySection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 85%", "center 40%"]
    });

    // Staggered scrub ranges strictly tied to scroll
    const y1 = useTransform(scrollYProgress, [0, 0.4], [50, 0]);
    const op1 = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    const y2 = useTransform(scrollYProgress, [0.1, 0.5], [50, 0]);
    const op2 = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

    const y3 = useTransform(scrollYProgress, [0.2, 0.7], [50, 0]);
    const op3 = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

    const y4 = useTransform(scrollYProgress, [0.4, 0.9], [50, 0]);
    const op4 = useTransform(scrollYProgress, [0.4, 0.9], [0, 1]);

    const y5 = useTransform(scrollYProgress, [0.6, 1.0], [50, 0]);
    const op5 = useTransform(scrollYProgress, [0.6, 1.0], [0, 1]);

    return (
        <section ref={ref} className="relative w-full min-h-screen px-6 py-32 flex items-center justify-start pointer-events-none z-10">
            <div className="w-full md:w-[45%] pl-0 md:pl-16 flex flex-col gap-12 pointer-events-auto mt-24">
                <div className="flex flex-col items-start w-full">
                    <motion.span
                        style={{ y: y1, opacity: op1 }}
                        className="font-mono text-brand-accent tracking-widest uppercase text-sm mb-6 inline-block drop-shadow-md font-bold"
                    >
                        About Us
                    </motion.span>

                    <motion.h2
                        style={{ y: y2, opacity: op2 }}
                        className="text-4xl md:text-5xl text-brand-fg font-medium leading-[1.2] mb-8 block drop-shadow-lg"
                    >
                        Capturing the <br />
                        <span className="text-brand-accent italic font-light drop-shadow-md">purest moments.</span>
                    </motion.h2>

                    <div className="space-y-6 text-brand-fg font-sans text-base tracking-wide leading-relaxed max-w-md drop-shadow-md font-medium">
                        <motion.p style={{ y: y3, opacity: op3 }}>
                            Gulugulu Pics is a baby and family photography studio based in Ghaziabad, dedicated to capturing the purest moments of childhood and parenthood.
                        </motion.p>
                        <motion.p style={{ y: y4, opacity: op4 }}>
                            We specialize in creating warm, timeless portraits in a baby-safe and hygienic studio environment. Our goal is to turn fleeting milestones into lifelong memories.
                        </motion.p>

                        <motion.div style={{ y: y5, opacity: op5 }} className="pt-8 block">
                            <Link href="/story" className="inline-block border-b-2 border-brand-accent text-brand-fg font-bold tracking-widest hover:text-brand-accent transition-colors duration-300 pb-1 uppercase text-sm drop-shadow-md">
                                OUR STORY
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
