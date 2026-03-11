import type { Metadata } from "next";
import StoryPageClient from "@/components/StoryPageClient";

export const metadata: Metadata = {
    title: "Our Story | GuluGulu Pics",
    description:
        "Learn about GuluGulu Pics — a boutique newborn and family photography studio in Ghaziabad. Explore our studio, our team, and the story behind every click.",
};

export default function StoryPage() {
    return <StoryPageClient />;
}
