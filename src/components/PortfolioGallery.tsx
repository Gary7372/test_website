"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LimelightNav } from "@/components/LimelightNav";
import { ZoomParallax } from "@/components/ZoomParallax";
import BabyGallery from "@/components/BabyGallery";
import FamilyGallery from "@/components/FamilyGallery";

// --- Category Icons ---

const NewbornIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" /><path d="M9 21c0-3 1.5-5 3-5s3 2 3 5" /><path d="M4 21c0-4 2-7 5-8" /><path d="M20 21c0-4-2-7-5-8" /></svg>;
const MaternityIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="6" r="3" /><path d="M9 22V12c0-1.5 1.3-3 3-5 1.7 2 3 3.5 3 5v10" /><path d="M9 17h6" /></svg>;
const MilestoneIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a9 9 0 0 1 9 9c0 5-9 13-9 13S3 16 3 11a9 9 0 0 1 9-9z" /><circle cx="12" cy="11" r="3" /></svg>;
const CakeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" /><path d="M2 21h20" /><path d="M7 8v2" /><path d="M12 8v2" /><path d="M17 8v2" /><path d="M7 4h.01" /><path d="M12 4h.01" /><path d="M17 4h.01" /></svg>;
const BirthdayIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 4c0-1.5 2-3.5 2.5-3.5S14.5 2.5 14.5 4" /><path d="M4 13h16" /><rect x="2" y="13" width="20" height="8" rx="1" /><path d="M6 13V7" /><path d="M12 13V7" /><path d="M18 13V7" /></svg>;
const FamilyIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const OutdoorIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l4-8 4 5 3-3 4 6" /><path d="M3 21h18" /><circle cx="18" cy="6" r="2" /></svg>;

const CATEGORIES = ["Newborn", "Maternity", "Family", "Outdoor", "Milestone"];

const CATEGORY_ICONS = [
    <NewbornIcon key="newborn" />,
    <MaternityIcon key="maternity" />,
    <FamilyIcon key="family" />,
    <OutdoorIcon key="outdoor" />,
    <MilestoneIcon key="milestone" />,
];

const NAV_ITEMS = CATEGORIES.map((cat, i) => ({
    id: cat,
    icon: CATEGORY_ICONS[i],
    label: cat,
}));

const PORTFOLIO_DATA = [
    { id: 1, category: "Newborn", src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop", alt: "Newborn sleeping peacefully", span: "md:col-span-1 md:row-span-1" },
    { id: 2, category: "Maternity", src: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=800&auto=format&fit=crop", alt: "Maternity silhouette", span: "md:col-span-2 md:row-span-2" },
    { id: 3, category: "Baby Milestones", src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop", alt: "Baby crawling", span: "md:col-span-1 md:row-span-1" },
    { id: 4, category: "Cake Smash", src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop", alt: "Baby eating cake", span: "md:col-span-1 md:row-span-2" },
    { id: 5, category: "Family", src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop", alt: "Family holding hands", span: "md:col-span-2 md:row-span-1" },
    { id: 6, category: "Outdoor", src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop", alt: "Outdoor family running", span: "md:col-span-1 md:row-span-1" },
    { id: 7, category: "Birthday", src: "https://images.unsplash.com/photo-1530103862676-de88bd4faac8?q=80&w=800&auto=format&fit=crop", alt: "Birthday party decorations", span: "md:col-span-1 md:row-span-1" },
    { id: 8, category: "Newborn", src: "https://images.unsplash.com/photo-1522771930-78848d929318?q=80&w=800&auto=format&fit=crop", alt: "Newborn feet", span: "md:col-span-1 md:row-span-1" },
];
const BABY_IMAGES = [
    { src: "/baby/baby-1.jpg", alt: "Newborn sleeping peacefully" },
    { src: "/baby/baby-2.jpg", alt: "Newborn wrapped in blanket" },
    { src: "/baby/baby-3.jpg", alt: "Newborn tiny fingers" },
    { src: "/baby/baby-4.jpg", alt: "Newborn portrait" },
    { src: "/baby/baby-5.jpg", alt: "Newborn with props" },
    { src: "/baby/baby-6.jpg", alt: "Newborn in basket" },
    { src: "/baby/baby-7.jpg", alt: "Newborn close-up" },
];
export default function PortfolioGallery() {
    const [activeCategory, setActiveCategory] = useState<string | null>("Newborn");

    const filteredPortfolio = activeCategory === null
        ? PORTFOLIO_DATA
        : PORTFOLIO_DATA.filter(item => item.category === activeCategory);

    return (
        <section className="min-h-screen bg-brand-bg relative z-10 pt-24 md:pt-32 pb-40 px-4 md:px-12 lg:px-24">

            {/* Header Text */}
            <div className="mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-brand-gray tracking-widest uppercase text-sm mb-4 inline-block"
                >
                    Our Archive
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl md:text-7xl font-sans text-brand-fg mb-6"
                >
                    Moments in <span className="text-brand-accent italic font-light">focus.</span>
                </motion.h1>
            </div>

            {/* Newborn: ZoomParallax view + full gallery below */}
            {activeCategory === "Newborn" ? (
                <>
                    <div className="-mx-4 md:-mx-12 lg:-mx-24">
                        <ZoomParallax images={BABY_IMAGES} />
                    </div>
                    <BabyGallery />
                </>
            ) : activeCategory === "Family" ? (
                /* Family: Vertical image stack animation */
                <FamilyGallery />
            ) : (
                /* Masonry Grid for all other categories */
                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[300px] gap-6">
                    <AnimatePresence>
                        {filteredPortfolio.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className={`relative overflow-hidden group rounded-sm bg-brand-bg border border-white/5 ${item.span}`}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                                    <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-2 block">
                                        {item.category}
                                    </span>
                                    <h3 className="text-brand-fg font-serif text-2xl">
                                        {item.alt}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Floating Limelight Dock — fixed at bottom center */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <LimelightNav
                    items={NAV_ITEMS}
                    defaultActiveIndex={0}
                    onTabChange={(i) => {
                        window.scrollTo(0, 0);
                        setActiveCategory(CATEGORIES[i]);
                    }}
                />
            </div>
        </section>
    );
}
