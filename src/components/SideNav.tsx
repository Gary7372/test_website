"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SideNav() {
    const { scrollYProgress } = useScroll();

    // Highlight points
    const pHighlight = useTransform(scrollYProgress, [0.6, 0.7], [0.3, 1]);
    const sHighlight = useTransform(scrollYProgress, [0.1, 0.2], [0.3, 1]); // Story
    const gHighlight = useTransform(scrollYProgress, [0.3, 0.5], [0.3, 1]); // Gear
    const aHighlight = useTransform(scrollYProgress, [0.8, 0.9], [0.3, 1]); // Awards

    return (
        <>
            {/* Desktop Left Nav */}
            <div className="hidden md:flex flex-col gap-32 fixed left-6 top-1/2 -translate-y-1/2 z-40 font-mono text-xs tracking-[0.2em] font-bold">
                <motion.div style={{ opacity: pHighlight }} className="rotate-180 [writing-mode:vertical-lr] cursor-pointer hover:text-white transition-colors duration-300">
                    [ PORTFOLIO ]
                </motion.div>
                <motion.div style={{ opacity: sHighlight }} className="rotate-180 [writing-mode:vertical-lr] cursor-pointer hover:text-white transition-colors duration-300">
                    [ OUR STORY ]
                </motion.div>
            </div>

            {/* Desktop Right Nav */}
            <div className="hidden md:flex flex-col gap-32 fixed right-6 top-1/2 -translate-y-1/2 z-40 font-mono text-xs tracking-[0.2em] font-bold">
                <motion.div style={{ opacity: gHighlight }} className="[writing-mode:vertical-lr] cursor-pointer hover:text-white transition-colors duration-300">
                    [ STUDIO GEAR ]
                </motion.div>
                <motion.div style={{ opacity: aHighlight }} className="[writing-mode:vertical-lr] cursor-pointer hover:text-white transition-colors duration-300">
                    [ AWARDS ]
                </motion.div>
            </div>

            {/* Mobile Bottom Dock */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] font-mono text-[10px] tracking-widest font-bold">
                <div className="flex justify-between items-center bg-[#303030]/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 shadow-2xl">
                    <motion.div style={{ opacity: pHighlight }} className="cursor-pointer">PRTF</motion.div>
                    <motion.div style={{ opacity: sHighlight }} className="cursor-pointer">STRY</motion.div>
                    <motion.div style={{ opacity: gHighlight }} className="cursor-pointer">GEAR</motion.div>
                    <motion.div style={{ opacity: aHighlight }} className="cursor-pointer">AWRD</motion.div>
                </div>
            </div>
        </>
    );
}
