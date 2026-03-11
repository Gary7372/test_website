"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import Image from "next/image";

const FAMILY_IMAGES = [
    { id: 1, src: "/family/family-1.jpg", alt: "Family portrait session" },
    { id: 2, src: "/family/family-2.jpg", alt: "Family outdoor moment" },
    { id: 3, src: "/family/family-3.jpg", alt: "Family candid laughter" },
    { id: 4, src: "/family/family-4.jpg", alt: "Family together" },
    { id: 5, src: "/family/family-5.jpg", alt: "Family warm embrace" },
    { id: 6, src: "/family/family-6.jpg", alt: "Family studio portrait" },
];

export default function FamilyGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const lastNavigationTime = useRef(0);
    const navigationCooldown = 400;
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useCallback((newDirection: number) => {
        const now = Date.now();
        if (now - lastNavigationTime.current < navigationCooldown) return;
        lastNavigationTime.current = now;

        setCurrentIndex((prev) => {
            if (newDirection > 0) {
                return prev === FAMILY_IMAGES.length - 1 ? 0 : prev + 1;
            }
            return prev === 0 ? FAMILY_IMAGES.length - 1 : prev - 1;
        });
    }, []);

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.y < -threshold) {
            navigate(1);
        } else if (info.offset.y > threshold) {
            navigate(-1);
        }
    };



    const getCardStyle = (index: number) => {
        const total = FAMILY_IMAGES.length;
        let diff = index - currentIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        if (diff === 0) {
            return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
        } else if (diff === -1) {
            return { y: -180, scale: 0.82, opacity: 0.55, zIndex: 4, rotateX: 8 };
        } else if (diff === -2) {
            return { y: -310, scale: 0.68, opacity: 0.25, zIndex: 3, rotateX: 15 };
        } else if (diff === 1) {
            return { y: 180, scale: 0.82, opacity: 0.55, zIndex: 4, rotateX: -8 };
        } else if (diff === 2) {
            return { y: 310, scale: 0.68, opacity: 0.25, zIndex: 3, rotateX: -15 };
        } else {
            return { y: diff > 0 ? 450 : -450, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 };
        }
    };

    const isVisible = (index: number) => {
        const total = FAMILY_IMAGES.length;
        let diff = index - currentIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return Math.abs(diff) <= 2;
    };

    return (
        <div
            ref={containerRef}
            className="relative flex w-full items-center justify-center overflow-hidden py-20"
            style={{ minHeight: "750px" }}
        >
            {/* Section label */}
            <div className="absolute top-0 left-0 right-0 text-center pt-4">
                <p className="font-mono text-brand-accent tracking-widest uppercase text-xs mb-2">Family Portraits</p>
                <p className="text-brand-fg/40 text-sm">Drag to explore</p>
            </div>

            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/5 blur-3xl" />
            </div>

            {/* Card Stack */}
            <div
                className="relative flex items-center justify-center"
                style={{ perspective: "1200px", width: "340px", height: "560px" }}
            >
                {FAMILY_IMAGES.map((image, index) => {
                    if (!isVisible(index)) return null;
                    const style = getCardStyle(index);
                    const isCurrent = index === currentIndex;

                    return (
                        <motion.div
                            key={image.id}
                            className="absolute cursor-grab active:cursor-grabbing"
                            animate={{
                                y: style.y,
                                scale: style.scale,
                                opacity: style.opacity,
                                rotateX: style.rotateX,
                                zIndex: style.zIndex,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                mass: 1,
                            }}
                            drag={isCurrent ? "y" : false}
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            style={{
                                transformStyle: "preserve-3d",
                                zIndex: style.zIndex,
                            }}
                        >
                            <div
                                className="relative overflow-hidden rounded-2xl"
                                style={{
                                    width: "300px",
                                    height: "420px",
                                    boxShadow: isCurrent
                                        ? "0 30px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
                                        : "0 10px 30px -10px rgba(0,0,0,0.35)",
                                }}
                            >
                                {/* Top inner glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/8 via-transparent to-transparent z-10 pointer-events-none" />

                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    draggable={false}
                                    priority={isCurrent}
                                    sizes="300px"
                                />


                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation dots — right side */}
            <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2.5">
                {FAMILY_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`rounded-full transition-all duration-300 ${index === currentIndex
                            ? "h-6 w-2 bg-brand-accent"
                            : "h-2 w-2 bg-white/20 hover:bg-white/40"
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll hint arrow */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <div className="flex flex-col items-center gap-2 text-brand-fg/30">
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </motion.div>
                    <span className="text-[10px] tracking-widest uppercase font-mono">Drag</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
