"use client";
import * as React from "react";
import { motion, useMotionValueEvent, useScroll, type Variants } from "framer-motion";

const STATS = [
    { value: "500+", label: "Families Captured" },
    { value: "Safe", label: "Baby-Friendly Studio" },
    { value: "Premium", label: "Quality Guaranteed" },
];

interface iISmoothScrollHeroProps {
    desktopImage?: string;
    mobileImage?: string;
}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroProps> = ({
    desktopImage = "/hero/maipic.png",
    mobileImage = "/hero/maipic.png",
}) => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const wordVariant: Variants = {
        hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
        visible: {
            opacity: 1, y: 0, filter: "blur(0px)",
            transition: { type: "spring" as const, stiffness: 300, damping: 28 },
        },
    };

    return (
        <div className="relative h-screen w-full bg-[#303030]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${isMobile ? mobileImage : desktopImage})` }}
            />

            {/* Gradient Overlays — warmer charcoal tones */}
            <div className="absolute inset-0 z-10 bg-black/50 md:bg-black/35" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#303030] via-[#303030]/30 to-transparent" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#303030]/60 via-transparent to-transparent" />

            {/* Warm ambient glow — subtle yellow radial bloom */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 40% at 50% 65%, rgba(255,243,92,0.07) 0%, transparent 70%)"
                }}
            />

            {/* Foreground Content */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 pointer-events-none">

                {/* Premium Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 400 }}
                    className="flex items-center gap-2 mb-6 bg-[#EDE4D3]/15 backdrop-blur-sm border border-[#EDE4D3]/20 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 max-w-[95vw]"
                >
                    <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 shrink-0 rounded-full bg-[#FFF35C] inline-block"
                    />
                    <span className="font-mono text-[#FFFBEA]/80 text-[8.5px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
                        Ghaziabad&apos;s Premium Photo Studio
                    </span>
                </motion.div>

                {/* Logo */}
                <motion.img
                    src="/logo-new.png"
                    alt="Gulugulu Logo"
                    className="w-72 md:w-[28rem] mb-6 object-contain drop-shadow-2xl"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.15 }}
                />

                {/* Tagline — word-by-word staggered */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 text-center"
                >
                    {["We", "click"].map((word) => (
                        <motion.span
                            key={word}
                            variants={wordVariant}
                            className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#FFFBEA] leading-tight drop-shadow-2xl"
                        >
                            {word}
                        </motion.span>
                    ))}
                    <motion.span
                        variants={wordVariant}
                        className="text-5xl md:text-6xl lg:text-7xl font-serif italic font-light text-[#FFF35C] leading-tight drop-shadow-lg"
                    >
                        memories.
                    </motion.span>
                </motion.div>

                {/* Divider line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-6 w-16 h-[1px] bg-[#FFF35C]/50"
                />

                {/* Tagline sub text */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="mt-4 font-mono text-[#FFFBEA]/60 text-xs tracking-[0.25em] uppercase"
                >
                    Baby & Family Photography
                </motion.p>
            </div>

            {/* Floating Stats — bottom left */}
            <div className="absolute bottom-16 left-6 md:left-12 z-20 flex flex-col gap-3">
                {STATS.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.15, type: "spring", stiffness: 300, damping: 25 }}
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-8 h-[1px] bg-[#FFF35C]/60 group-hover:w-12 transition-all duration-300" />
                        <div className="flex items-baseline gap-2">
                            <span className="font-sans font-bold text-[#FFF35C] text-sm md:text-base drop-shadow-md">
                                {stat.value}
                            </span>
                            <span className="font-mono text-[#FFFBEA]/50 text-[10px] uppercase tracking-widest">
                                {stat.label}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Scroll Indicator — minimal chevron */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            >
                <motion.svg
                    width="20" height="12" viewBox="0 0 20 12" fill="none"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                    <path d="M1 1l9 9 9-9" stroke="#FFF35C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </motion.svg>
            </motion.div>
        </div>
    );
};

const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = (props) => {
    return <SmoothScrollHeroBackground {...props} />;
};
export default SmoothScrollHero;
