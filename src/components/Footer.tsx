"use client";

import { motion } from "framer-motion";
import { AnimatedLetterText } from "@/components/AnimatedLetterText";
import { MarqueeText } from "@/components/MarqueeText";
import { Instagram, Facebook, MessageCircle, Mail, HelpCircle } from "lucide-react";
import Link from "next/link";

// Removed InteractiveContactButton as we'll build a simpler, warmer WhatsApp button inline

interface FooterProps {
    hideCallToAction?: boolean;
}

export function Footer({ hideCallToAction = false }: FooterProps) {
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="relative w-full bg-brand-bg text-brand-fg overflow-hidden flex flex-col z-[60]">

            {/* Huge Title Zone */}
            {!hideCallToAction && (
                <div
                    className="w-full flex items-center justify-center py-20 md:py-40 relative z-10 flex-col gap-12 md:gap-20 border-t border-b border-brand-fg/10 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/lets_shoot_bg.png')" }}
                >
                    {/* Optional dark overlay so the text is still readable if the background is bright */}
                    <div className="absolute inset-0 bg-brand-bg/40 z-0"></div>

                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="text-[18vw] md:text-[10vw] font-medium leading-none tracking-tighter text-center font-serif text-brand-fg relative z-10"
                    >
                        <span className="block drop-shadow-sm">Let&apos;s</span>
                        <AnimatedLetterText
                            text="&hoot."
                            letterToReplace="o"
                            className="text-brand-accent italic font-light drop-shadow-xl font-bold"
                        />
                    </motion.h1>

                    {/* Aesthetic WhatsApp Button + Secondary CTA */}
                    <div className="z-20 flex flex-col sm:flex-row items-center gap-4">
                        <a
                            href="https://wa.me/917303768157"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 bg-brand-fg text-brand-bg px-8 py-4 rounded-full font-sans font-medium uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-brand-fg transition-colors shadow-lg"
                        >
                            <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                            <span>Chat on WhatsApp</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </a>

                        <Link
                            href="/faq"
                            className="group flex items-center gap-3 bg-brand-bg/5 border border-brand-fg/20 text-brand-fg px-8 py-4 rounded-full font-sans font-medium uppercase tracking-widest text-sm hover:border-brand-accent hover:text-brand-accent transition-colors backdrop-blur-md"
                        >
                            <HelpCircle className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span>Still confused?</span>
                        </Link>
                    </div>
                </div>
            )}

            {/* Grid Section */}
            <div className="w-full flex flex-col md:flex-row relative z-20 bg-brand-bg">

                {/* Left Side: Branding */}
                <div className="flex-1 p-8 md:p-16 border-b md:border-b-0 md:border-r border-brand-fg/10 flex flex-col justify-end text-brand-fg relative overflow-hidden group">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-serif text-brand-fg mb-4 drop-shadow-md">Gulugulu<br />Pics.</h2>
                        <p className="font-sans text-brand-fg text-base font-medium max-w-sm leading-relaxed border-l-2 border-brand-accent pl-4 drop-shadow-sm">We click memories. Turning your fleeting milestones into lifelong treasures.</p>
                    </div>
                </div>

                {/* Right Side: Links & Copyright */}
                <div className="flex-1 flex flex-col">
                    {/* Social Links Block */}
                    <div className="flex-1 p-8 md:p-16 border-b border-brand-fg/10 bg-brand-bg text-brand-fg flex flex-col justify-center relative">
                        <div className="absolute top-6 right-6 text-xs font-mono uppercase tracking-widest opacity-40 hidden md:block">Connect</div>
                        <ul className="flex flex-col space-y-4 md:space-y-6 font-serif text-3xl md:text-5xl w-full">
                            <li className="group pointer-events-auto">
                                <a href="https://www.instagram.com/gulugulu_pics/" target="_blank" rel="noopener noreferrer" className="hover:pl-4 transition-all duration-300 flex items-center gap-4 md:gap-6 w-full border-b border-brand-fg/10 pb-4 group-hover:border-brand-accent group-hover:text-brand-accent">
                                    <Instagram className="w-8 h-8 md:w-10 md:h-10 drop-shadow-md transition-transform group-hover:scale-110" />
                                    Instagram <span className="ml-auto opacity-0 group-hover:opacity-100 font-sans text-xl transition-opacity">↗</span>
                                </a>
                            </li>
                            <li className="group pointer-events-auto">
                                <a href="https://www.facebook.com/p/Gulu-Gulu-Pics-100086396952297/" target="_blank" rel="noopener noreferrer" className="hover:pl-4 transition-all duration-300 flex items-center gap-4 md:gap-6 w-full border-b border-brand-fg/10 pb-4 group-hover:text-brand-accent">
                                    <Facebook className="w-8 h-8 md:w-10 md:h-10 drop-shadow-md transition-transform group-hover:scale-110" />
                                    Facebook <span className="ml-auto opacity-0 group-hover:opacity-100 font-sans text-xl transition-opacity">↗</span>
                                </a>
                            </li>
                            <li className="group pointer-events-auto">
                                <a href="mailto:gulugulupics2000@gmail.com" className="hover:pl-4 transition-all duration-300 flex items-center gap-4 md:gap-6 w-full pb-4 group-hover:text-brand-accent">
                                    <Mail className="w-8 h-8 md:w-10 md:h-10 drop-shadow-md transition-transform group-hover:scale-110" />
                                    Email Us
                                    <span className="ml-4 font-sans text-sm tracking-widest opacity-50 group-hover:opacity-100 transition-opacity hidden sm:inline-block">gulugulupics2000@gmail.com</span>
                                    <span className="ml-auto opacity-0 group-hover:opacity-100 font-sans text-xl transition-opacity">↗</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Bottom Utility Bar */}
                    <div className="p-6 md:p-8 flex justify-between items-center bg-brand-bg text-brand-fg/50">
                        <p className="font-sans text-xs md:text-sm tracking-[0.1em] uppercase">© 2026. Gulugulu Pics.</p>

                        <button onClick={scrollToTop} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-fg/20 flex items-center justify-center hover:bg-brand-accent hover:text-brand-fg hover:border-brand-accent transition-colors group">
                            <span className="font-sans text-xl group-hover:-translate-y-1 transition-transform">↑</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Edge-to-edge scrolling location marquee */}
            <div className="w-full overflow-hidden border-t border-brand-fg/10 bg-brand-beige py-3 text-brand-fg/80">
                <MarqueeText items={["Serving Ghaziabad", "Serving Delhi NCR", "Serving Noida", "Premium Maternity", "Newborn Photography"]} />
            </div>

        </footer>
    );
}
