import React from "react";
import HeroSection from "./_components/hero-section";
import OfflineCentresSection from "./_components/offline-centres-section";
import OnlineEnglishSection from "./_components/online-english-section";
import SelfPacedSection from "./_components/self-paced-section";
import OnlineBatchesSection from "./_components/online-batches-section";
import FeaturesSection from "./_components/features-section";
import GallerySection from "./_components/gallery-section";
import TestimonialsSection from "./_components/testimonials-section";
import AppSection from "./_components/app-section";
import QuoteSection from "./_components/quote-section";

export default function Page() {
    return (
        <main className="relative bg-black text-white w-full overflow-hidden">
            {/* SEO Assistive Heading */}
            <h1 className="sr-only">10 Minute School Home - Learn with Joy</h1>
            
            {/* Section 1: Hero Area */}
            <HeroSection />

            {/* Section 5: Online Batches selector (moved up to match standard landing layout priority) */}
            <OnlineBatchesSection />

            {/* Section 6: Online Batch Features */}
            <FeaturesSection />

            {/* Section 2: Offline Centres (Locations & Courses) */}
            <OfflineCentresSection />

            {/* Section 3: Online English Courses */}
            <OnlineEnglishSection />

            {/* Section 4: Self-Paced Learning Pedagogy */}
            <SelfPacedSection />

            {/* Section 7: Event Gallery Photo Wall */}
            <GallerySection />

            {/* Section 8: Testimonials (Parents & Students review) */}
            <TestimonialsSection />

            {/* Section 9: Mobile App Showcase */}
            <AppSection />

            {/* Section 10: Bottom Quote Block */}
            <QuoteSection />
        </main>
    );
}

