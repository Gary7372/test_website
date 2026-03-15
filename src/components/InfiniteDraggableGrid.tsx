"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  PanInfo,
} from "framer-motion";
import Image from "next/image";

/**
 * Aesthetic Constants
 */
const GRID_SIZE = 12; // Consolidated 12x12 space
const ITEM_COUNT = GRID_SIZE * GRID_SIZE;

interface GridItem {
  id: number;
  image: string;
  category: string;
}

// 1. IMPROVED IMAGE POOLING & DIVERSITY
const CATEGORY_PATHS = {
  Baby: Array.from({ length: 35 }, (_, i) => `/baby/baby-${i + 1}.jpg`),
  Family: Array.from({ length: 6 }, (_, i) => `/family/family-${i + 1}.jpg`),
  Maternity: [
    "/maternity/maipic.png",
    "/maternity/WhatsApp Image 2024-10-30 at 10.04.54 PM.jpeg",
    "/maternity/WhatsApp Image 2024-10-30 at 10.04.59 PM.jpeg",
    "/maternity/WhatsApp Image 2024-10-30 at 10.05.00 PM.jpeg"
  ]
};

// Flatten and shuffle all images to ensure diversity
const ALL_IMAGES = [
  ...CATEGORY_PATHS.Baby,
  ...CATEGORY_PATHS.Family,
  ...CATEGORY_PATHS.Maternity
];

// Seeded shuffle to keep layout stable but unique
const seededShuffle = (arr: string[]) => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.abs(Math.sin(i)) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// Coordinate Targets - Refined for 12x12 space (Relative to center [0,0])
export const CATEGORY_COORDINATES: Record<string, { x: number; y: number }> = {
  Newborn: { x: 0, y: 0 },
  Maternity: { x: -1800, y: -1200 }, // Top Left region
  Outdoor: { x: 1800, y: -1200 },   // Top Right region
  Family: { x: 1800, y: 1200 },     // Bottom Right region
  Milestone: { x: -1800, y: 1200 },  // Bottom Left region
};

export interface InfiniteDraggableGridHandle {
  panTo: (targetX: number, targetY: number) => void;
}

const InfiniteDraggableGrid = React.forwardRef<InfiniteDraggableGridHandle, { activeCategory?: string }>((props, ref) => {
  const [isMobile, setIsMobile] = useState(false);

  // 1. ADVANCED ZERO-REPETITION SPARSE GENERATION
  const gridData = useMemo(() => {
    // Shuffled queues
    const globalQueue = [...ALL_IMAGES].sort(() => Math.random() - 0.5);
    const categoryQueues: Record<string, string[]> = {
      Baby: [...CATEGORY_PATHS.Baby].sort(() => Math.random() - 0.5),
      Family: [...CATEGORY_PATHS.Family].sort(() => Math.random() - 0.5),
      Maternity: [...CATEGORY_PATHS.Maternity].sort(() => Math.random() - 0.5),
    };

    let globalIndex = 0;
    const categoryIndices: Record<string, number> = { Baby: 0, Family: 0, Maternity: 0 };

    return Array.from({ length: ITEM_COUNT }).map((_, i) => {
      const col = i % GRID_SIZE;
      const row = Math.floor(i / GRID_SIZE);
      
      let clusterCategory = "Newborn";
      let targetPoolKey: "Baby" | "Maternity" | "Family" = "Baby";

      // Define spatial zones
      if (col < 5 && row < 5) {
        clusterCategory = "Maternity";
        targetPoolKey = "Maternity";
      } else if (col > 7 && row > 7) {
        clusterCategory = "Family";
        targetPoolKey = "Family";
      } else if (col > 7 && row < 5) {
        clusterCategory = "Outdoor";
        targetPoolKey = "Family";
      } else if (col < 5 && row > 7) {
        clusterCategory = "Milestone";
        targetPoolKey = "Baby";
      }

      // SPARSE POPULATION LOGIC:
      // To avoid any same pictures nearby, we use a low probability for the actual category 
      // when the pool is small. Most slots are filled with unique "global" archive pictures.
      const poolSize = categoryQueues[targetPoolKey].length;
      const categorySpawnRate = poolSize > 20 ? 0.7 : 0.25; // Sparse spawning for small folders
      
      const useCategoryAsset = Math.random() < categorySpawnRate;
      let image: string;

      if (useCategoryAsset) {
        image = categoryQueues[targetPoolKey][categoryIndices[targetPoolKey] % poolSize];
        categoryIndices[targetPoolKey]++;
      } else {
        // Fill the missing spaces with random unique images
        image = globalQueue[globalIndex % globalQueue.length];
        globalIndex++;
      }

      return { id: i, image, category: clusterCategory };
    });
  }, []);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Global grid logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Expose pan control to parent - Clean horizontal/vertical panning only
  React.useImperativeHandle(ref, () => ({
    panTo: (targetX: number, targetY: number) => {
      const currentX = x.get();
      const currentY = y.get();

      // Find the "nearest" target in an infinite wrap, then add a random wrap offset
      const wrapX = Math.round((currentX + targetX) / totalGridWidth) * totalGridWidth;
      const wrapY = Math.round((currentY + targetY) / totalGridHeight) * totalGridHeight;
      
      const offsets = [-1, 0, 1];
      const randX = offsets[Math.floor(Math.random() * offsets.length)] * totalGridWidth;
      const randY = offsets[Math.floor(Math.random() * offsets.length)] * totalGridHeight;

      const finalX = -targetX + wrapX + randX;
      const finalY = -targetY + wrapY + randY;

      // Nonlinear Panning Path without zoom
      animate(x, finalX, {
        duration: 1.2,
        ease: [0.65, 0, 0.35, 1],
      });
      animate(y, finalY, {
        duration: 1.2,
        ease: [0.65, 0, 0.35, 1],
      });
    },
  }));

  // 2. PROFESSIONAL GRID SETTINGS (Reference-matched) - Increased for 6-9 visible
  const baseCardWidth = isMobile ? 240 : 500;
  const baseCardHeight = isMobile ? 180 : 375;
  const gap = isMobile ? 24 : 64; // Slightly larger gap for clarity

  const totalGridWidth = (baseCardWidth + gap) * GRID_SIZE;
  const totalGridHeight = (baseCardHeight + gap) * GRID_SIZE;

  const handlePan = (_: any, info: PanInfo) => {
    x.stop();
    y.stop();
    x.set(x.get() + info.delta.x);
    y.set(y.get() + info.delta.y);
  };

  const handlePanEnd = (_: any, info: PanInfo) => {
    animate(x, x.get() + info.velocity.x * 0.12, {
      type: "inertia",
      power: 0.15,
      timeConstant: 250,
    });
    animate(y, y.get() + info.velocity.y * 0.12, {
      type: "inertia",
      power: 0.15,
      timeConstant: 250,
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Stop any ongoing animations to allow direct user control
    x.stop();
    y.stop();
    
    const newX = x.get() - e.deltaX;
    const newY = y.get() - e.deltaY;
    
    x.set(newX);
    y.set(newY);

    // Optional: Add a slight "decay" behavior for mouse wheels if needed, 
    // but React's WheelEvent + trackpads usually handle this beautifully.
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden select-none touch-none bg-[#1a1a1a]"
      style={{ cursor: "grab" }}
      onWheel={handleWheel}
    >
      <motion.div
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="absolute inset-0 flex items-center justify-center active:cursor-grabbing"
      >
        {gridData.map((item, index) => (
          <GridCard
            key={item.id}
            item={item}
            index={index}
            globalX={x}
            globalY={y}
            gridSize={GRID_SIZE}
            cardWidth={baseCardWidth}
            cardHeight={baseCardHeight}
            gap={gap}
            totalWidth={totalGridWidth}
            totalHeight={totalGridHeight}
          />
        ))}
      </motion.div>

      {/* Subtle minimalist hud */}
      <div className="absolute bottom-10 left-10 z-20 pointer-events-none opacity-20">
        <p className="text-[10px] font-mono tracking-widest uppercase text-white">
          Explore Archive / {GRID_SIZE}x{GRID_SIZE}
        </p>
      </div>
    </div>
  );
});

InfiniteDraggableGrid.displayName = "InfiniteDraggableGrid";
export { InfiniteDraggableGrid };

function GridCard({
  item,
  index,
  globalX,
  globalY,
  gridSize,
  cardWidth,
  cardHeight,
  gap,
  totalWidth,
  totalHeight,
}: {
  item: GridItem;
  index: number;
  globalX: any;
  globalY: any;
  gridSize: number;
  cardWidth: number;
  cardHeight: number;
  gap: number;
  totalWidth: number;
  totalHeight: number;
}) {
  // Grid coordinates
  const col = index % gridSize;
  const row = Math.floor(index / gridSize);

  // 3. SYMMETRICAL REFINED POSITIONING
  const startX = col * (cardWidth + gap) - totalWidth / 2 + gap/2;
  const startY = row * (cardHeight + gap) - totalHeight / 2 + gap/2;

  const x = useTransform(globalX, (val: number) => wrap(startX + val, totalWidth));
  const y = useTransform(globalY, (val: number) => wrap(startY + val, totalHeight));

  return (
    <motion.div
      style={{
        width: cardWidth,
        height: cardHeight,
        x,
        y,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        willChange: "transform",
      }}
      className="group"
    >
      <motion.div
        whileHover={{ scale: 1.05, zIndex: 100 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full h-full relative overflow-hidden bg-transparent"
      >
        <Image
          src={item.image}
          alt="Archive Image"
          fill
          // NO CROPPING + NO BOXES: Images float purely on the charcoal stage
          className="object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes={`${cardWidth}px`}
          quality={65}
          priority={index < 12}
        />
        {/* Subtle Category Label on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <p className="text-[9px] font-mono tracking-widest uppercase text-[#FFF35C] drop-shadow-md">
            Archive / {item.category}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function wrap(value: number, range: number) {
  const half = range / 2;
  return ((value + half) % range + range) % range - half;
}
