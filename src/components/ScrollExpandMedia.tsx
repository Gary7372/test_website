'use client';

import {
    useEffect,
    useRef,
    useState,
    ReactNode,
} from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

interface ScrollExpandMediaProps {
    mediaType?: 'video' | 'image';
    mediaSrc: string;
    posterSrc?: string;
    bgImageSrc: string;
    title?: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: ReactNode;
}

const ScrollExpandMedia = ({
    mediaType = 'video',
    mediaSrc,
    posterSrc,
    bgImageSrc,
    title,
    date,
    scrollToExpand,
    textBlend,
    children,
}: ScrollExpandMediaProps) => {
    // Use Framer Motion values instead of React state for continuous progress
    // This completely eliminates React re-renders during the high-frequency scroll wheel ticks
    const progressRaw = useMotionValue(0);
    const scrollProgress = useSpring(progressRaw, { damping: 40, stiffness: 300, mass: 0.8 });

    const [showContent, setShowContent] = useState<boolean>(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
    const [isMobileState, setIsMobileState] = useState<boolean>(false);

    // We use refs for state inside the event listeners to avoid stale closures
    // and prevent needing to put them in the dependency array (which causes re-binds)
    const expandedRef = useRef(false);
    const touchStartYRef = useRef(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoInViewRef = useRef(false);

    // Track if the video is actually in the viewport to pause it when scrolled out of view
    useEffect(() => {
        if (mediaType !== 'video' || !videoRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                videoInViewRef.current = entry.isIntersecting;
                if (videoInViewRef.current && progressRaw.get() >= 0.6) {
                    videoRef.current?.play().catch(() => { });
                } else {
                    videoRef.current?.pause();
                }
            },
            { threshold: 0.1 } // Trigger when at least 10% of the video is visible
        );

        observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, [mediaType, progressRaw]);

    // Play the video only when expansion progress passes 60% (0.6) AND it is in view
    useMotionValueEvent(progressRaw, "change", (latest) => {
        if (mediaType === 'video' && videoRef.current) {
            if (latest >= 0.6 && videoInViewRef.current) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    });

    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        progressRaw.set(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
        expandedRef.current = false;
    }, [mediaType, progressRaw]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 100) {
                expandedRef.current = false;
                setMediaFullyExpanded(false);
                e.preventDefault();
                e.stopPropagation(); // Prevent Lenis from hearing the wheel
            } else if (!expandedRef.current) {
                e.preventDefault();
                e.stopPropagation(); // Prevent Lenis from hearing the wheel
                // Increased scroll multiplier for much faster expansion
                const scrollDelta = e.deltaY * 0.003;
                const nextVal = Math.min(Math.max(progressRaw.get() + scrollDelta, 0), 1);
                progressRaw.set(nextVal);

                if (nextVal >= 1) {
                    expandedRef.current = true;
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                } else if (nextVal < 0.75) {
                    setShowContent(false);
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartYRef.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!touchStartYRef.current) return;

            const touchY = e.touches[0].clientY;
            const deltaY = touchStartYRef.current - touchY;

            if (expandedRef.current && deltaY < -20 && window.scrollY <= 100) {
                expandedRef.current = false;
                setMediaFullyExpanded(false);
                e.preventDefault();
                e.stopPropagation(); // Prevent Lenis from hearing the touch
            } else if (!expandedRef.current) {
                e.preventDefault();
                e.stopPropagation(); // Prevent Lenis from hearing the touch
                // Increased touch speed modifier
                const scrollFactor = deltaY < 0 ? 0.015 : 0.01;
                const scrollDelta = deltaY * scrollFactor;
                const nextVal = Math.min(Math.max(progressRaw.get() + scrollDelta, 0), 1);
                progressRaw.set(nextVal);

                if (nextVal >= 1) {
                    expandedRef.current = true;
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                } else if (nextVal < 0.75) {
                    setShowContent(false);
                }

                touchStartYRef.current = touchY;
            }
        };

        const handleTouchEnd = (): void => {
            touchStartYRef.current = 0;
        };

        // Rigorously enforce scroll lock by scrolling back to 0 if not expanded
        const handleScroll = (): void => {
            if (!expandedRef.current) {
                window.scrollTo(0, 0);
            }
        };

        const el = sectionRef.current;
        if (!el) return;

        // Attach to the element itself to stop bubbling to window where Lenis lives
        el.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll);
        el.addEventListener('touchstart', handleTouchStart, { passive: false });
        el.addEventListener('touchmove', handleTouchMove, { passive: false });
        el.addEventListener('touchend', handleTouchEnd);

        return () => {
            el.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            el.removeEventListener('touchstart', handleTouchStart);
            el.removeEventListener('touchmove', handleTouchMove);
            el.removeEventListener('touchend', handleTouchEnd);
        };
    }, [progressRaw]);

    // Lock page scroll while not fully expanded
    useEffect(() => {
        if (!mediaFullyExpanded) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [mediaFullyExpanded]);

    useEffect(() => {
        const checkIfMobile = (): void => {
            setIsMobileState(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Use framer-motion useTransform with CSS calc() to directly map progress to CSS values seamlessly
    const mediaWidth = useTransform(scrollProgress, v => `calc(300px + ${v} * (95vw - 300px))`);
    const mediaHeight = useTransform(scrollProgress, v => `calc(400px + ${v} * (85vh - 400px))`);

    const textTranslateX = useTransform(scrollProgress, [0, 1], [0, isMobileState ? 180 : 150]);
    const textTranslateXStr = useTransform(textTranslateX, v => `${v}vw`);
    const negTextTranslateXStr = useTransform(textTranslateX, v => `-${v}vw`);

    const bgOpacity = useTransform(scrollProgress, [0, 1], [1, 0]);
    const innerOpacity = useTransform(scrollProgress, [0, 1], [0.6, 0.2]);
    const arrowOpacity = useTransform(scrollProgress, [0, 0.7], [1, 0]);

    const firstWord = title ? title.split(' ')[0] : '';
    const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

    return (
        <div
            ref={sectionRef}
            className="transition-colors duration-700 ease-in-out overflow-x-hidden"
        >
            <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
                <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

                    {/* Background image — fades out as media expands */}
                    <motion.div
                        className="absolute inset-0 z-0 h-full"
                        style={{ opacity: bgOpacity }}
                    >
                        <Image
                            src={bgImageSrc}
                            alt="Background"
                            width={1920}
                            height={1080}
                            className="w-screen h-screen object-cover"
                            priority
                            quality={60} // Reduced quality for better performance
                        />
                        {/* Brand-consistent warm dark overlay */}
                        <div className="absolute inset-0 bg-brand-bg/50" />
                    </motion.div>

                    <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
                        <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

                            {/* ——— Expanding Media Card ——— */}
                            {/* Uses motion.div mapped directly to the spring, 0 React re-renders! */}
                            <motion.div
                                className="absolute z-0 top-1/2 left-1/2 rounded-2xl overflow-hidden"
                                style={{
                                    width: mediaWidth,
                                    height: mediaHeight,
                                    x: '-50%',
                                    y: '-50%',
                                    boxShadow: '0px 0px 60px rgba(0,0,0,0.5)',
                                }}
                            >
                                {mediaType === 'video' ? (
                                    mediaSrc.includes('youtube.com') ? (
                                        <div className="relative w-full h-full pointer-events-none">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={
                                                    mediaSrc.includes('embed')
                                                        ? mediaSrc +
                                                        (mediaSrc.includes('?') ? '&' : '?') +
                                                        'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                                                        : mediaSrc.replace('watch?v=', 'embed/') +
                                                        '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                                                        mediaSrc.split('v=')[1]
                                                }
                                                className="w-full h-full rounded-2xl"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                            <motion.div
                                                className="absolute inset-0 bg-brand-bg/40 rounded-2xl"
                                                style={{ opacity: innerOpacity }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <video
                                                ref={videoRef}
                                                src={mediaSrc}
                                                poster={posterSrc}
                                                loop
                                                playsInline
                                                preload="auto"
                                                className="w-full h-full object-cover rounded-2xl pointer-events-none"
                                                controls={false}
                                                disablePictureInPicture
                                                disableRemotePlayback
                                            />
                                            <motion.div
                                                className="absolute inset-0 bg-brand-bg/30 rounded-2xl pointer-events-none"
                                                style={{ opacity: innerOpacity }}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={mediaSrc}
                                            alt={title || 'Media content'}
                                            width={1280}
                                            height={720}
                                            className="w-full h-full object-cover rounded-2xl"
                                            quality={60} // Lower quality for performance
                                        />
                                        {/* Warm gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent rounded-2xl" />
                                        <motion.div
                                            className="absolute inset-0 bg-brand-bg/40 rounded-2xl"
                                            style={{ opacity: innerOpacity }}
                                        />
                                    </div>
                                )}

                                {/* Date & scroll hint — slide apart */}
                                <div className="flex flex-col items-center text-center absolute bottom-6 left-0 right-0 z-10">
                                    {date && (
                                        <motion.p
                                            className="font-mono text-brand-accent text-xs uppercase tracking-widest"
                                            style={{ x: negTextTranslateXStr }}
                                        >
                                            {date}
                                        </motion.p>
                                    )}
                                    {scrollToExpand && (
                                        <motion.p
                                            className="font-mono text-brand-beige/60 text-xs uppercase tracking-widest mt-1"
                                            style={{ x: textTranslateXStr }}
                                        >
                                            {scrollToExpand}
                                        </motion.p>
                                    )}
                                </div>
                            </motion.div>

                            {/* ——— Title Words — slide apart as media expands ——— */}
                            <div
                                className={`flex items-center justify-center text-center gap-6 w-full relative z-10 pointer-events-none ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                                    }`}
                            >
                                <motion.h2
                                    className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-brand-fg drop-shadow-2xl"
                                    style={{ x: negTextTranslateXStr }}
                                >
                                    {firstWord}
                                </motion.h2>
                                <motion.h2
                                    className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium italic text-brand-accent drop-shadow-2xl"
                                    style={{ x: textTranslateXStr }}
                                >
                                    {restOfTitle}
                                </motion.h2>
                            </div>

                            {/* Scroll hint arrow — fades as progress increases */}
                            <motion.div
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                                style={{ opacity: arrowOpacity }}
                                animate={{ y: [0, 6, 0] }}
                                transition={{ y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } }}
                            >
                                <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                                    <path d="M1 1l9 9 9-9" stroke="#FFF35C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* ——— Revealed content after full expansion ——— */}
                        <motion.section
                            className="flex flex-col w-full"
                            style={{ display: mediaFullyExpanded ? 'flex' : 'none' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showContent ? 1 : 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {children}
                        </motion.section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ScrollExpandMedia;
