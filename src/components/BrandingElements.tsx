"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function BrandingElements() {
    const { scrollYProgress } = useScroll();
    // Animates the lens flare vertically in opposition to the scroll direction
    const flareY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <>
            {/* Film Grain Overlay */}
            <div
                className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Anamorphic Lens Flare */}
            <motion.div
                className="fixed top-0 left-0 w-full h-[1px] z-40 shadow-[0_0_100px_4px_rgba(226,31,38,0.3)] bg-brand-accent/20 pointer-events-none"
                style={{ y: flareY, scaleX: 1.5 }}
            />
        </>
    );
}
