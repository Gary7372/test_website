import ScrollyCanvas from "@/components/ScrollyCanvas";
import { Footer } from "@/components/Footer";
import SmoothScrollHero from "@/components/SmoothScrollHero";

export default function Home() {
  return (
    <main className="w-full bg-brand-bg text-brand-fg">
      <SmoothScrollHero />
      <ScrollyCanvas />
      <Footer />
    </main>
  );
}
