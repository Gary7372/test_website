"use client";

import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

type NavItem = {
    id: string | number;
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    label?: string;
    onClick?: () => void;
};

type LimelightNavProps = {
    items: NavItem[];
    defaultActiveIndex?: number;
    onTabChange?: (index: number) => void;
    className?: string;
};

export const LimelightNav = ({
    items,
    defaultActiveIndex = 0,
    onTabChange,
    className,
}: LimelightNavProps) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [isReady, setIsReady] = useState(false);
    const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const limelightRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (items.length === 0) return;
        if (activeIndex < 0) return; // no selection

        const limelight = limelightRef.current;
        const activeItem = navItemRefs.current[activeIndex];

        if (limelight && activeItem) {
            const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
            limelight.style.left = `${newLeft}px`;

            // Auto-scroll the dock so the active item stays in view on mobile
            if (scrollRef.current) {
                const containerWidth = scrollRef.current.offsetWidth;
                const itemLeft = activeItem.offsetLeft;
                const itemWidth = activeItem.offsetWidth;
                scrollRef.current.scrollTo({
                    left: itemLeft - containerWidth / 2 + itemWidth / 2,
                    behavior: 'smooth',
                });
            }

            if (!isReady) {
                setTimeout(() => setIsReady(true), 50);
            }
        }
    }, [activeIndex, isReady, items]);

    if (items.length === 0) return null;

    const handleItemClick = (index: number, itemOnClick?: () => void) => {
        setActiveIndex(index);
        onTabChange?.(index);
        itemOnClick?.();
    };

    return (
        // Outer wrapper: constrains width on mobile and enables horizontal scroll
        <div
            ref={scrollRef}
            className={`relative max-w-[92vw] md:max-w-none overflow-x-auto no-scrollbar rounded-2xl ${className ?? ''}`}
        >
            <nav className="relative inline-flex items-center h-14 md:h-16 rounded-2xl bg-[#1e1e1e] border border-white/10 px-1 md:px-2 shadow-2xl">
                {items.map(({ id, icon, label, onClick }, index) => (
                    <button
                        key={id}
                        ref={el => { navItemRefs.current[index] = el; }}
                        className="relative z-20 flex h-full cursor-pointer flex-col items-center justify-center gap-0.5 px-3 md:px-5 focus:outline-none group flex-shrink-0"
                        onClick={() => handleItemClick(index, onClick)}
                        aria-label={label}
                        title={label}
                    >
                        {cloneElement(icon, {
                            className: `w-4 h-4 md:w-5 md:h-5 transition-all duration-200 ease-in-out ${activeIndex === index
                                ? 'opacity-100 text-brand-accent scale-110'
                                : 'opacity-40 text-brand-beige group-hover:opacity-70'
                                } ${icon.props.className ?? ''}`,
                        })}
                        {label && (
                            <span
                                className={`text-[8px] md:text-[9px] font-mono uppercase tracking-wider transition-all duration-200 leading-none whitespace-nowrap ${activeIndex === index ? 'opacity-100 text-brand-accent' : 'opacity-30 text-brand-beige'
                                    }`}
                            >
                                {label}
                            </span>
                        )}
                    </button>
                ))}

                {/* Limelight bar */}
                <div
                    ref={limelightRef}
                    className={`absolute top-0 z-10 w-10 md:w-12 h-[3px] rounded-full bg-brand-accent shadow-[0_0_18px_3px_#FFF35C] ${isReady ? 'transition-[left] duration-300 ease-in-out' : ''
                        }`}
                    style={{ left: '-999px' }}
                >
                    {/* Cone glow */}
                    <div className="absolute left-[-30%] top-[3px] w-[160%] h-12 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-brand-accent/20 to-transparent pointer-events-none" />
                </div>
            </nav>
        </div>
    );
};
