"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function InteractiveContactButton() {
    const [isHovered, setIsHovered] = useState(false);

    const socials = [
        { name: "Instagram", href: "#" },
        { name: "Vimeo", href: "#" },
        { name: "Behance", href: "#" }
    ];

    return (
        <div
            className="relative flex items-center justify-center pointer-events-auto h-40"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The main expanding pill shape container */}
            <motion.div
                initial={false}
                animate={{
                    width: isHovered ? Math.max(300, socials.length * 100 + 40) : 128, // 128px = 32rem width base, expands based on content
                    height: isHovered ? 80 : 128, // height reduces to pill shape, base is 128px (w-32 h-32 circle)
                    borderRadius: isHovered ? 40 : 64, // goes from circle (w/2) to pill
                    backgroundColor: isHovered ? "#FFF35C" : "#303030", // bg to brand-accent
                    borderColor: "#FFF35C", // brand-accent border
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.8
                }}
                className={cn(
                    "absolute flex items-center justify-center border text-brand-accent overflow-hidden shadow-2xl transition-colors duration-300",
                    isHovered ? "text-[#303030]" : "hover:bg-brand-accent hover:text-[#303030]"
                )}
            >
                {/* The default "Contact Us" state */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isHovered ? 0 : 1,
                        scale: isHovered ? 0.8 : 1,
                        y: isHovered ? -20 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center font-mono uppercase tracking-widest text-xs md:text-sm font-bold w-full h-full"
                    style={{ pointerEvents: isHovered ? "none" : "auto" }}
                >
                    <span>Contact</span>
                    <span>Us</span>
                </motion.div>

                {/* The expanded Socials array */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="absolute inset-0 flex items-center justify-center gap-4 px-6 w-full h-full"
                        >
                            {socials.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, y: -10 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: isHovered ? index * 0.05 + 0.1 : 0,
                                        type: "spring", stiffness: 300, damping: 20
                                    }}
                                    className="px-4 py-2 font-mono text-xs md:text-sm uppercase tracking-widest bg-[#303030] text-[#FFF35C] rounded-full hover:bg-white transition-colors border border-transparent hover:border-[#303030]"
                                >
                                    {social.name}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}