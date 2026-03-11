"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href?: string; onClick?: () => void }[];
  mainText: React.ReactNode;
  readMoreLink?: string;
  onReadMore?: () => void;
  onReadLess?: () => void;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) => (
  <Link
    href={href || "#"}
    onClick={(e) => {
      if (onClick) onClick();
      if (!href || href === "#") {
        e.preventDefault();
      }
    }}
    className="text-sm font-medium tracking-widest text-brand-fg/60 transition-colors hover:text-brand-accent uppercase"
  >
    {children}
  </Link>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-fg/60 transition-colors hover:text-brand-accent">
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  onReadMore,
  onReadLess,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative flex h-auto min-h-[100dvh] w-full flex-col overflow-hidden bg-[#2D2D2D] font-sans md:h-screen md:min-h-0',
        className
      )}
    >
      {/* Header (Hidden if no logo/nav) */}
      {(logoText || imageSrc || navLinks.length > 0) && (
        <header className="z-50 absolute top-0 left-0 right-0 flex w-full items-center justify-between p-6 md:p-8 lg:p-12 pointer-events-none">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center pointer-events-auto relative z-50 cursor-pointer"
            >
              {logoText ? (
                  <span className="text-xl font-bold tracking-wider text-brand-fg uppercase font-mono">{logoText}</span>
              ) : (
                  <img src="/logo_hero.png" alt="Logo" className="h-6 md:h-8 lg:h-10 w-auto" />
              )}
            </motion.div>
          </Link>
          
          <div className="hidden items-center space-x-12 md:flex pointer-events-auto relative z-50">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href} onClick={link.onClick}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:hidden z-50 pointer-events-auto relative mt-1 overflow-hidden"
            aria-label="Open menu"
            style={{ width: "24px", height: "20px", justifyContent: "center", alignItems: "center" }}
          >
            <span className={cn("absolute block h-[2px] bg-[#E8E4D9] transition-all transform duration-300", isMenuOpen ? "w-6 rotate-45" : "w-6 -translate-y-[7px]")}></span>
            <span className={cn("absolute block h-[2px] bg-[#E8E4D9] transition-all duration-300", isMenuOpen ? "w-0 opacity-0" : "w-6")}></span>
            <span className={cn("absolute block h-[2px] bg-[#E8E4D9] transition-all transform duration-300", isMenuOpen ? "w-6 -rotate-45" : "w-5 translate-y-[7px] mt-0 mr-auto")}></span>
          </motion.button>
        </header>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 bg-[#2D2D2D]/95 backdrop-blur-lg md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href || "#"}
                onClick={(e) => {
                  setIsMenuOpen(false);
                  if (link.onClick) link.onClick();
                  if (!link.href || link.href === "#") e.preventDefault();
                }}
                className="text-2xl font-bold tracking-widest text-[#E8E4D9] uppercase"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area Container */}
      <div className="relative flex-grow flex w-full h-full pt-16 md:pt-32 pb-4 md:p-0 z-10 overflow-hidden md:overflow-visible pointer-events-none">
        
        {/* HUGE YELLOW CIRCLE (Background) */}
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 rounded-full left-1/2 top-[40%] md:top-1/2 -translate-x-1/2 -translate-y-[45%] w-[85vw] h-[85vw] max-w-[400px] max-h-[400px] md:max-w-none md:max-h-none md:w-[min(75vw,600px)] md:h-[min(75vw,600px)]"
            style={{ backgroundColor: '#DBAC34' }}
        ></motion.div>

        {/* CENTER IMAGE */}
        <div className="absolute z-10 flex justify-center items-end bottom-[30vh] md:bottom-0 left-1/2 -translate-x-1/2 w-full md:w-auto h-[48vh] md:h-auto pointer-events-none">
            <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="h-full md:h-auto w-auto object-contain object-bottom md:max-h-[115vh] opacity-95 drop-shadow-2xl"
                style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.9)" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
            />
        </div>

        {/* LEFT TEXT (Fades over image on mobile, left block on md) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className={cn(
            "absolute z-20 flex flex-col justify-end md:justify-center text-center md:text-left px-6 md:px-0 w-full md:w-auto left-0 md:left-[8%] lg:left-[10%] bottom-[30vh] md:bottom-auto md:top-1/2 md:-translate-y-[45%] pt-20 pb-4 md:pt-0 md:pb-0 pointer-events-auto",
            onReadLess ? "bg-gradient-to-t from-[#2D2D2D]/0 via-[#2D2D2D]/80 to-[#2D2D2D] bg-[length:100%_150%] bg-bottom md:bg-none" : ""
          )}
        >
          <div className="mx-auto md:mx-0 max-w-[95%] md:max-w-sm text-[12px] md:text-[16px] leading-relaxed text-[#E8E4D9] whitespace-pre-wrap font-sans opacity-[0.85] md:opacity-90 drop-shadow-md md:drop-shadow-none">
            {mainText}
          </div>
          
          <div className="mt-4 md:mt-8 flex justify-center md:justify-start drop-shadow-md md:drop-shadow-none">
            {readMoreLink && !onReadMore && !onReadLess && (
                <a href={readMoreLink} className="inline-block text-[13px] md:text-[15px] font-bold tracking-wide text-[#E8E4D9] hover:text-[#DBAC34] transition-colors">
                Read More
                <div className="h-[2px] w-full bg-[#E8E4D9] mt-1 origin-left transition-transform hover:scale-x-110"></div>
                </a>
            )}
            {onReadMore && (
                <button onClick={onReadMore} className="inline-block text-[13px] md:text-[15px] font-bold tracking-wide text-[#E8E4D9] hover:text-[#DBAC34] transition-colors text-left group">
                Read More
                <div className="h-[2px] w-6 bg-[#E8E4D9] mt-2 origin-left transition-all group-hover:bg-[#DBAC34] group-hover:w-full"></div>
                </button>
            )}
            {onReadLess && (
                <button onClick={onReadLess} className="inline-block text-[13px] md:text-[15px] font-bold tracking-wide text-[#E8E4D9] hover:text-[#DBAC34] transition-colors text-left group">
                Keep it brief
                <div className="h-[2px] w-6 bg-[#E8E4D9] mt-2 origin-left transition-all group-hover:bg-[#DBAC34] group-hover:w-full"></div>
                </button>
            )}
          </div>
        </motion.div>

        {/* RIGHT TEXT (HUGE OVERLAY) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute z-20 flex flex-col items-center md:items-end justify-start md:justify-center text-center md:text-right w-full md:w-auto pt-6 md:pt-0 top-[70vh] md:top-1/2 md:-translate-y-[45%] md:right-[5%] lg:right-[8%] pointer-events-none"
        >
          <h1 className="font-sans font-black text-[4.2rem] sm:text-[5.5rem] md:text-[8rem] lg:text-[11rem] xl:text-[180px] leading-[0.8] tracking-tighter drop-shadow-md"
              style={{
                color: '#E8E4D9',
                textShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
          >
            {overlayText.part1}
            <br />
            {overlayText.part2}<span className="text-[#DBAC34]">.</span>
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements (Stretched full width) */}
      <footer className="z-30 absolute bottom-6 md:bottom-8 left-6 right-6 md:left-12 md:right-12 flex items-center justify-between pointer-events-none w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4 md:space-x-6 pointer-events-auto"
        >
          {socialLinks.map((link, index) => (
             <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-[10px] md:text-[11px] font-sans font-medium opacity-50 text-right"
          style={{ color: '#E8E4D9' }}
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
