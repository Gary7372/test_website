"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { MessageCircle, Camera, Heart, Star, Users, Award, Home, Instagram, Facebook, Mail } from "lucide-react";
import ScrollExpandMedia from "@/components/ScrollExpandMedia";
import { MinimalistHero } from "@/components/MinimalistHero";

/* ─────────────────────────────────────────────
   TAB DEFINITIONS
───────────────────────────────────────────── */
const TABS = [
    { id: "studio", label: "About Studio" },
    { id: "story", label: "Our Story" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ─────────────────────────────────────────────
   ABOUT STUDIO – STATS
───────────────────────────────────────────── */
const STATS = [
    { icon: Camera, value: "500+", label: "Sessions Shot" },
    { icon: Heart, value: "300+", label: "Happy Families" },
    { icon: Star, value: "4.9★", label: "Avg Rating" },
    { icon: Users, value: "3", label: "Locations Served" },
];

/* ─────────────────────────────────────────────
   OUR STORY – TIMELINE (shown after media expands)
───────────────────────────────────────────── */
const TIMELINE = [
    {
        year: "2020",
        title: "The First Click",
        body: "GuluGulu Pics was born in a small rented room in Ghaziabad — just one camera, two softboxes, and an unshakeable belief that every baby deserves to have their first moments preserved forever.",
        image: "/baby/baby-3.jpg",
    },
    {
        year: "2021",
        title: "Newborn Magic",
        body: "We photographed our very first newborn session and fell head-over-heels in love. The tiny fingers, the milk-drunk smiles — we knew this was our calling. Word spread fast through new-parent WhatsApp groups.",
        image: "/baby/baby-7.jpg",
    },
    {
        year: "2022",
        title: "Family Stories",
        body: "Families started asking for more — milestone sessions, first birthdays, siblings meeting for the first time. We expanded our studio and built our signature warm-grain editing style.",
        image: "/family/family-2.jpg",
    },
    {
        year: "2023",
        title: "Maternity & Beyond",
        body: "We began celebrating the journey before the baby arrives. Our maternity sessions quickly became our most-booked service, blending soft light, flowing fabrics, and the quiet strength of expecting mothers.",
        image: "/baby/baby-14.jpg",
    },
    {
        year: "2024",
        title: "The Community Grows",
        body: "10,000 Instagram followers. Hundreds of five-star reviews. Parents recommending us to relatives across Delhi NCR, Noida, and beyond. A studio turned into a family tradition.",
        image: "/family/family-4.jpg",
    },
    {
        year: "2025 →",
        title: "Your Turn",
        body: "Today we shoot for one reason: to give every family a photograph so good it makes you cry happy tears. If you're reading this, your story is next.",
        image: "/baby/baby-22.jpg",
    },
];

/* ─────────────────────────────────────────────
   MAIN PAGE CLIENT
───────────────────────────────────────────── */
export default function StoryPageClient() {
    const [activeTab, setActiveTab] = useState<TabId>("studio");
    const [isHeroExpanded, setIsHeroExpanded] = useState(false);

    // Hide global header when in "story" cinematic mode to prevent overlap
    useEffect(() => {
        const isHidden = activeTab === "story";
        window.dispatchEvent(
            new CustomEvent("toggle-header", { detail: { hidden: isHidden } })
        );

        // Ensure header is restored if component unmounts completely
        return () => {
            window.dispatchEvent(
                new CustomEvent("toggle-header", { detail: { hidden: false } })
            );
        };
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-brand-bg text-brand-fg font-sans">
            <AnimatePresence mode="wait">
                {activeTab === "studio" && (
                    <motion.div
                        key="studio"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* ── HERO BANNER ── */}
                        <section className="relative w-full h-[70vh] flex items-end overflow-hidden">
                            <div className="absolute inset-0">
                                <Image
                                    src="/baby/baby-20.jpg"
                                    alt="GuluGulu Pics studio"
                                    fill
                                    priority
                                    className="object-cover object-center"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
                            </div>
                            <div className="relative z-10 w-full px-6 sm:px-12 pb-14 md:pb-20 max-w-5xl mx-auto">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="font-mono text-xs uppercase tracking-[0.25em] text-brand-accent mb-4"
                                >
                                    GuluGulu Pics · Ghaziabad
                                </motion.p>
                                <motion.h1
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 120 }}
                                    className="font-serif text-[11vw] sm:text-[8vw] md:text-[6vw] leading-none tracking-tight text-brand-fg"
                                >
                                    Where memories{" "}
                                    <em className="text-brand-accent not-italic">live.</em>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.7 }}
                                    className="mt-4 text-brand-beige/70 text-base md:text-lg font-light max-w-xl"
                                >
                                    Newborn · Maternity · Family · Milestones
                                </motion.p>
                            </div>
                        </section>

                        {/* ── STICKY TAB BAR ── */}
                        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

                        {/* ── ABOUT STUDIO PANEL ── */}
                        <AboutStudioPanel />

                        {/* ── FOOTER ── */}
                        <Footer hideCallToAction={false} />
                    </motion.div>
                )}

                {activeTab === "story" && (
                    <motion.div
                        key="story"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative min-h-screen bg-brand-bg"
                    >
                        {/* Minimalist Hero Section */}
                        <div className="pt-0 z-10 relative">
                            <MinimalistHero
                                logoText=""
                                navLinks={[
                                    { label: "About Studio", href: "#", onClick: () => setActiveTab("studio") },
                                    { label: "Archive", href: "/portfolio" },
                                    { label: "Bookings", href: "https://wa.me/917303768157" },
                                ]}
                                mainText={
                                  isHeroExpanded ? (
                                    <>
                                      2019 – 2023{"\n"}
                                      • Completed my MBA and worked as a Product Manager in the corporate world.{"\n"}
                                      • Photography always remained a strong passion alongside my career.{"\n"}
                                      2023{"\n"}
                                      • Took a leap of faith and started Gulugulu Pics.{"\n"}
                                      • Began our journey in Indore, MP, learning and experimenting with photography as a business.{"\n"}
                                      2024{"\n"}
                                      • Moved to Ghaziabad (Delhi NCR) to build and grow the brand further.{"\n"}
                                      • Started serving families and building trust within the community.{"\n"}
                                      2025 – Present{"\n"}
                                      • Opened our own studio in Nilaya Greens, Rajnagar Ext., Ghaziabad.{"\n"}
                                      • Today, we continue capturing memories that families will cherish forever.
                                    </>
                                  ) : (
                                    <>
                                      2019 – 2023{"\n"}
                                      • Completed my MBA and worked as a Product Manager in the corporate world.{"\n"}
                                      • Photography always remained a strong passion alongside my career.
                                    </>
                                  )
                                }
                                onReadMore={!isHeroExpanded ? () => setIsHeroExpanded(true) : undefined}
                                onReadLess={isHeroExpanded ? () => setIsHeroExpanded(false) : undefined}
                                imageSrc="/nanda_varshney.png"
                                imageAlt="Nanda Varshney"
                                overlayText={{ part1: "nanda", part2: "varshney" }}
                                socialLinks={[
                                  { icon: Instagram, href: "https://www.instagram.com/gulugulu_pics/" },
                                  { icon: Facebook, href: "https://www.facebook.com/p/Gulu-Gulu-Pics-100086396952297/" },
                                  { icon: Mail, href: "mailto:hello@gulugulupics.com" },
                                  { icon: MessageCircle, href: "https://wa.me/917303768157" }
                                ]}
                                locationText="Ghaziabad, IN"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─────────────────────────────────────────────
   SHARED TAB BAR
───────────────────────────────────────────── */
function TabBar({ activeTab, onTabChange }: { activeTab: TabId; onTabChange: (t: TabId) => void }) {
    return (
        <div className="bg-brand-bg/90 backdrop-blur-md border-b border-brand-fg/10">
            <div className="max-w-5xl mx-auto px-6 sm:px-12 flex items-center">
                {/* Left side: Home Button (Conditional) */}
                <AnimatePresence>
                    {activeTab === "story" && (
                        <motion.div
                            initial={{ opacity: 0, width: 0, x: -10 }}
                            animate={{ opacity: 1, width: "auto", x: 0 }}
                            exit={{ opacity: 0, width: 0, x: -10 }}
                            className="overflow-hidden"
                        >
                            <Link
                                href="/"
                                className="p-2 mr-4 rounded-full text-brand-fg/60 hover:text-brand-accent hover:bg-brand-fg/5 transition-colors group flex items-center justify-center -ml-2"
                                aria-label="Back to Home"
                            >
                                <Home className="w-5 h-5 pointer-events-none transition-transform group-hover:scale-110" />
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-0">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className="relative py-5 px-6 md:px-10 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 focus:outline-none"
                            style={{
                                color: activeTab === tab.id
                                    ? "var(--color-brand-accent)"
                                    : "var(--color-brand-fg)",
                                opacity: activeTab === tab.id ? 1 : 0.45,
                            }}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-brand-accent shadow-[0_0_12px_2px_#FFF35C]"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   ABOUT STUDIO PANEL
───────────────────────────────────────────── */
function AboutStudioPanel() {
    return (
        <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                {/* LEFT */}
                <div className="flex flex-col gap-10">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-accent">
                        About the Studio
                    </p>
                    <h2 className="font-serif text-5xl md:text-6xl leading-tight tracking-tight text-brand-fg">
                        Where<br />
                        <span className="text-brand-accent italic">memories</span><br />
                        are made.
                    </h2>
                    <p className="text-brand-beige/80 text-lg leading-relaxed max-w-md">
                        GuluGulu Pics is a boutique photography studio based in Ghaziabad,
                        dedicated to preserving the milestones that go by too fast — first
                        breaths, first smiles, growing bumps, and family moments that feel
                        like home.
                    </p>
                    <p className="text-brand-beige/60 text-base leading-relaxed max-w-md">
                        Every session is designed to feel natural, unhurried, and warm. We
                        don&apos;t just take photos — we create heirlooms that hang on walls
                        and live in hearts for generations.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6 pt-2">
                        {STATS.map(({ icon: Icon, value, label }) => (
                            <div
                                key={label}
                                className="flex items-start gap-4 p-5 rounded-2xl border border-brand-fg/10 bg-brand-fg/[0.03] hover:border-brand-accent/40 transition-colors duration-300"
                            >
                                <div className="p-2 rounded-xl bg-brand-accent/10">
                                    <Icon className="w-5 h-5 text-brand-accent" />
                                </div>
                                <div>
                                    <p className="font-serif text-2xl font-medium text-brand-fg">{value}</p>
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-fg/50 mt-0.5">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <a
                        href="https://wa.me/917303768157?text=Hi%2C%20I%27d%20like%20to%20book%20a%20session%20with%20GuluGulu%20Pics!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex w-fit items-center gap-3 bg-brand-accent text-brand-bg px-8 py-4 rounded-full font-mono font-bold text-xs uppercase tracking-widest hover:bg-brand-beige transition-colors shadow-lg shadow-brand-accent/20"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Book a Session
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>

                {/* RIGHT — photo mosaic */}
                <div className="grid grid-cols-2 grid-rows-3 gap-3 h-[540px] md:h-[640px]">
                    <div className="row-span-2 relative rounded-2xl overflow-hidden">
                        <Image src="/baby/baby-1.jpg" alt="Newborn session" fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width:768px) 50vw, 300px" />
                    </div>
                    <div className="relative rounded-2xl overflow-hidden">
                        <Image src="/family/family-1.jpg" alt="Family session" fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width:768px) 50vw, 300px" />
                    </div>
                    <div className="relative rounded-2xl overflow-hidden">
                        <Image src="/baby/baby-18.jpg" alt="Tiny hands" fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width:768px) 50vw, 300px" />
                    </div>
                    <div className="col-span-2 relative rounded-2xl overflow-hidden">
                        <Image src="/baby/baby-26.jpg" alt="Baby close-up" fill className="object-cover object-top transition-transform duration-700 hover:scale-105" sizes="(max-width:768px) 100vw, 600px" />
                        <div className="absolute bottom-4 right-4 bg-brand-bg/80 backdrop-blur-sm border border-brand-fg/10 rounded-xl px-4 py-2">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-accent">Ghaziabad · Delhi NCR · Noida</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SERVICES STRIP ── */}
            <div className="mt-24 pt-16 border-t border-brand-fg/10">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-fg/40 mb-10">What we shoot</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { title: "Newborn", desc: "7–14 days old. Posed & lifestyle.", img: "/baby/baby-5.jpg" },
                        { title: "Maternity", desc: "28–36 weeks. Soft & elegant.", img: "/baby/baby-12.jpg" },
                        { title: "Family", desc: "All ages, all stories.", img: "/family/family-3.jpg" },
                        { title: "Milestone", desc: "Sitter, cake smash, birthdays.", img: "/baby/baby-30.jpg" },
                    ].map((svc) => (
                        <motion.div
                            key={svc.title}
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="group rounded-2xl overflow-hidden border border-brand-fg/10 bg-brand-fg/[0.02] hover:border-brand-accent/30 transition-colors"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image src={svc.img} alt={svc.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 50vw, 200px" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-serif text-xl text-brand-fg">{svc.title}</h3>
                                <p className="font-mono text-[10px] uppercase tracking-wider text-brand-fg/40 mt-1">{svc.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   OUR STORY CONTENT  (children of ScrollExpandMedia)
───────────────────────────────────────────── */
function OurStoryContent() {
    return (
        <div className="bg-brand-bg">
            {/* Section header */}
            <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-20 pb-16">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-accent mb-4">
                    How it all began
                </p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-brand-fg">
                    Five years. Thousands of tiny fingers.{" "}
                    <em className="text-brand-accent">One obsession.</em>
                </h2>
                <p className="mt-6 text-brand-beige/60 text-base max-w-lg leading-relaxed">
                    A studio built on love, light, and a stubborn obsession with getting
                    the perfect shot — even if a baby yawns through every single one.
                </p>
            </div>

            {/* Timeline */}
            <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">
                <div className="relative">
                    {/* Central vertical line (desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-accent/60 via-brand-fg/10 to-transparent -translate-x-1/2" />

                    <div className="flex flex-col gap-16 md:gap-24">
                        {TIMELINE.map((item, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                                    className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isLeft ? "" : "md:[&>*:first-child]:order-2"}`}
                                >
                                    {/* Content side */}
                                    <div className={`flex flex-col gap-4 ${isLeft ? "md:text-right md:items-end" : "md:text-left md:items-start"}`}>
                                        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-accent bg-brand-accent/10 border border-brand-accent/20 rounded-full px-4 py-1.5 w-fit">
                                            {item.year}
                                        </span>
                                        <h3 className="font-serif text-3xl md:text-4xl text-brand-fg">{item.title}</h3>
                                        <p className="text-brand-beige/65 text-base leading-relaxed max-w-sm">{item.body}</p>
                                    </div>

                                    {/* Center dot (desktop) */}
                                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                        <div className="w-4 h-4 rounded-full bg-brand-accent shadow-[0_0_16px_4px_rgba(255,243,92,0.5)] border-2 border-brand-bg" />
                                    </div>

                                    {/* Photo side */}
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-fg/10">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                            sizes="(max-width:768px) 100vw, 42vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-bg/30 to-transparent" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── CLOSING CTA ── */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center flex flex-col items-center gap-8 py-24 px-6 border-t border-brand-fg/10"
            >
                <Award className="w-10 h-10 text-brand-accent opacity-60" />
                <h3 className="font-serif text-4xl md:text-5xl text-brand-fg">
                    Ready to be part of the story?
                </h3>
                <p className="text-brand-beige/60 text-base max-w-md">
                    Drop us a message on WhatsApp and let&apos;s plan your perfect session.
                </p>
                <a
                    href="https://wa.me/917303768157"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-brand-accent text-brand-bg px-10 py-4 rounded-full font-mono font-bold text-xs uppercase tracking-widest hover:bg-brand-beige transition-colors shadow-lg shadow-brand-accent/20"
                >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
            </motion.div>

            {/* Footer */}
            <Footer hideCallToAction={true} />
        </div>
    );
}
