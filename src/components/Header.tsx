"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 60);
    });

    useEffect(() => {
        const handleToggle = (e: CustomEvent<{ hidden: boolean }>) => {
            setIsHidden(e.detail.hidden);
        };
        window.addEventListener("toggle-header", handleToggle as EventListener);
        return () => window.removeEventListener("toggle-header", handleToggle as EventListener);
    }, []);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{
                opacity: isHidden ? 0 : 1,
                y: isHidden ? -100 : 0
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ pointerEvents: isHidden ? "none" : "auto" }}
            className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 py-3 transition-colors duration-500 ${scrolled
                ? "bg-[#303030]/80 backdrop-blur-md border-b border-[#EDE4D3]/10 shadow-lg shadow-black/20"
                : "bg-transparent"
                }`}
        >
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/">
                    <img
                        src="/logo-header-new.png"
                        alt="GuluGulu Pics"
                        className="h-9 md:h-11 w-auto object-contain drop-shadow-md"
                        style={{ filter: "brightness(1.12) saturate(0.82) hue-rotate(-7deg)" }}
                    />
                </Link>
            </div>



            {/* Book CTA */}
            <a
                href="https://wa.me/917303768157?text=Hi%2C%20I%27d%20like%20to%20book%20a%20photography%20session%20with%20GuluGulu%20Pics!"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#FFF35C] text-[#303030] font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-full font-bold hover:bg-[#FFFBEA] transition-colors duration-300 shadow-md shadow-[#FFF35C]/30"
            >
                Book a Session
                <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
        </motion.header>
    );
}
