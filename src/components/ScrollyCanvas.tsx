"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StorySection } from "@/components/StorySection";
import { Portfolio } from "@/components/Portfolio";
import { ServicesSection } from "@/components/ServicesSection";
import Floating, { FloatingElement } from "@/components/Floating";

const TOTAL_FRAMES = 140;

function getFrameUrl(index: number) {
    // Frames start from 1, so index 0 = frame_00001.png
    const paddedIndex = (index + 1).toString().padStart(5, "0");
    return `/frames/frame_${paddedIndex}.png`;
}

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);

    const isLoaded = loadedCount === TOTAL_FRAMES;

    // 1. Optimized Image Preloading (Parallel)
    useEffect(() => {
        let isMounted = true;

        const preloadFramesParallel = async () => {
            const temps: HTMLImageElement[] = new Array(TOTAL_FRAMES);
            let loaded = 0;

            const promises = Array.from({ length: TOTAL_FRAMES }).map((_, i) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = getFrameUrl(i);

                    const markLoaded = () => {
                        temps[i] = img;
                        loaded++;
                        if (isMounted) setLoadedCount(loaded);
                        resolve();
                    };

                    img.onload = markLoaded;
                    img.onerror = markLoaded;
                });
            });

            await Promise.all(promises);
            if (isMounted) imagesRef.current = temps;
        };

        // Fire parallel frame loader
        preloadFramesParallel();

        return () => {
            isMounted = false;
        }
    }, []);

    // 2. Optimized Canvas Render & Lenis Smoothing
    useEffect(() => {
        if (!isLoaded || !containerRef.current || !canvasRef.current) return;

        const scrollWrapper = containerRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let rafId: number;
        let targetFrame = 0;
        let currentFrame = 0;

        const render = () => {
            // Smoothly interpolate the frame index
            currentFrame += (targetFrame - currentFrame) * 0.15; // Smooth factor for buttery transition

            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.round(currentFrame))
            );

            // Draw current frame to canvas
            const img = imagesRef.current[frameIndex];
            if (img) {
                // Keep canvas resolutions crisp and strictly cover viewport
                const displayWidth = window.innerWidth;
                const displayHeight = window.innerHeight;

                if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                    canvas.width = displayWidth;
                    canvas.height = displayHeight;
                }

                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }

            rafId = requestAnimationFrame(render);
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY - scrollWrapper.offsetTop;

            // Start the camera animation during the hero section
            // Hero section scroll height is roughly 1000px
            const preScrollDistance = 1000;
            const targetPreFrame = 20;

            if (scrollTop < 0) {
                // We are before ScrollyCanvas pins (during SmoothScrollHero)
                const preFraction = Math.max(0, (scrollTop + preScrollDistance) / preScrollDistance);
                targetFrame = preFraction * targetPreFrame;
            } else {
                // We are inside ScrollyCanvas
                const maxScrollTop = scrollWrapper.scrollHeight - window.innerHeight;
                const rawFraction = scrollTop / maxScrollTop;
                const scrollFraction = Math.max(0, Math.min(1, rawFraction));

                targetFrame = targetPreFrame + scrollFraction * (TOTAL_FRAMES - 1 - targetPreFrame);
            }
        };

        // Attach scroll listener to update targetFrame
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initialize first frame position

        // Start render loop
        rafId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isLoaded]);

    // 3. (Removed localized Framer Motion beats since sections are purely static scrollables now)

    return (
        <div ref={containerRef} className="relative w-full bg-brand-bg">
            {!isLoaded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg text-brand-fg">
                    <motion.div
                        initial={{ opacity: 0.2, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1,
                            ease: "easeInOut",
                        }}
                        className="flex flex-col items-center justify-center text-center px-4"
                    >
                        <img src="/logo-new.png" alt="Gulugulu Logo" className="w-48 md:w-64 mb-4 object-contain" />
                        <span className="font-mono text-xs mt-12 tracking-widest text-[#ffffff]/30">
                            Loading {Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100))}%
                        </span>
                    </motion.div>
                </div>
            )}

            {/* Sticky Frame Container (Fixed behind scrolling content) */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center z-0">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ WebkitTransform: "translateZ(0)" }}
                />
            </div>

            {/* Scrollable Overlays Container (Dictates the actual height of the page) */}
            <div className="relative z-10 w-full -mt-[100vh]">

                {/* 1. Pre-Manifesto Camera Animation Space Removed (StorySection now begins immediately) */}

                {/* 2. Content Sections (Flanking Left & Right over the animation) */}
                <StorySection />
                <Portfolio />
                <ServicesSection />

                {/* The footer will follow natively because ScrollyCanvas sits inside the main layout */}
            </div>
        </div>
    );
}
