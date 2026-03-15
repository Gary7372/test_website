import React from 'react';
import { Home, Image as ImageIcon, Briefcase, Info, MessageSquare, Baby, Heart, Camera, PartyPopper, Gift, Users, Trees } from "lucide-react";

export const NewbornIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" /><path d="M9 21c0-3 1.5-5 3-5s3 2 3 5" /><path d="M4 21c0-4 2-7 5-8" /><path d="M20 21c0-4-2-7-5-8" /></svg>;
export const MaternityIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="6" r="3" /><path d="M9 22V12c0-1.5 1.3-3 3-5 1.7 2 3 3.5 3 5v10" /><path d="M9 17h6" /></svg>;
export const FamilyIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
export const OutdoorIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l4-8 4 5 3-3 4 6" /><path d="M3 21h18" /><circle cx="18" cy="6" r="2" /></svg>;
export const MilestoneIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a9 9 0 0 1 9 9c0 5-9 13-9 13S3 16 3 11a9 9 0 0 1 9-9z" /><circle cx="12" cy="11" r="3" /></svg>;

export const CATEGORIES = ["Newborn", "Maternity", "Family", "Outdoor", "Milestone"];

export const CATEGORY_ICONS = [
    <NewbornIcon key="newborn" />,
    <MaternityIcon key="maternity" />,
    <FamilyIcon key="family" />,
    <OutdoorIcon key="outdoor" />,
    <MilestoneIcon key="milestone" />,
];

export const NAV_ITEMS = CATEGORIES.map((cat, i) => ({
    id: cat,
    icon: CATEGORY_ICONS[i],
    label: cat,
}));

// Main site navigation (Home, Portfolio, etc.)
export const SITE_NAV_ITEMS = [
    { id: 'home', icon: <Home />, label: 'Home', href: '/' },
    { id: 'portfolio', icon: <ImageIcon />, label: 'Portfolio', href: '/portfolio' },
    { id: 'gallery', icon: <Briefcase />, label: 'Gallery', href: '/gallery' },
    { id: 'story', icon: <Info />, label: 'Story', href: '/story' },
    { id: 'contact', icon: <MessageSquare />, label: 'Contact', href: '#contact' },
];
