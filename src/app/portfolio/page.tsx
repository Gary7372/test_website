import PortfolioGallery from "@/components/PortfolioGallery";
import { Footer } from "@/components/Footer";

export default function PortfolioPage() {
    return (
        <main className="w-full bg-brand-bg text-brand-fg min-h-screen flex flex-col">
            <div className="flex-grow">
                <PortfolioGallery />
            </div>
            <Footer hideCallToAction={true} />
        </main>
    );
}
