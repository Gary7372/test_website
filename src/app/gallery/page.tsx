"use client";

import { useState, useRef } from "react";
import { InfiniteDraggableGrid, CATEGORY_COORDINATES, InfiniteDraggableGridHandle } from "@/components/InfiniteDraggableGrid";
import { LimelightNav } from "@/components/LimelightNav";
import { CATEGORIES, NAV_ITEMS } from "@/constants/navigation";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Newborn");
  const gridRef = useRef<InfiniteDraggableGridHandle>(null);

  return (
    <main className="w-full bg-[#0a0a0a] min-h-screen relative overflow-hidden">
      <InfiniteDraggableGrid ref={gridRef} activeCategory={activeCategory} />

      {/* Floating Limelight Dock — cinematic navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <LimelightNav
              items={NAV_ITEMS}
              defaultActiveIndex={CATEGORIES.indexOf(activeCategory)}
              onTabChange={(i) => {
                  const targetCategory = CATEGORIES[i];
                  setActiveCategory(targetCategory);
                  
                  // Cinematic journey to the category's region
                  const coords = CATEGORY_COORDINATES[targetCategory];
                  if (coords && gridRef.current) {
                      gridRef.current.panTo(coords.x, coords.y);
                  }
              }}
          />
      </div>
    </main>
  );
}
