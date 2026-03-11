"use client";

import { motion } from "framer-motion";

interface MarqueeTextProps {
    items: string[];
}

export function MarqueeText({ items }: MarqueeTextProps) {
    // We duplicate the items several times so the loop is seamless even on ultrawide screens
    const content = [...items, ...items, ...items, ...items, ...items, ...items];

    return (
        <div className="w-full overflow-hidden bg-[#FFF35C] py-2 border-t border-t-white/5 relative z-30">
            <div className="flex w-fit">
                <motion.div
                    animate={{
                        x: ["0%", "-50%"] // Move left exactly by half its width, then reset instantly since items are highly duplicated
                    }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30 // adjust this for speed (lower is faster)
                    }}
                    className="flex whitespace-nowrap min-w-full"
                >
                    {content.map((item, index) => (
                        <div key={index} className="flex items-center mx-4 md:mx-8">
                            <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-[#303030]">
                                {item}
                            </span>
                            {/* The divider dot */}
                            <span className="mx-4 md:mx-8 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#303030]/50" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
