import { getProductData, getCourseRating } from "@/lib/api/product";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Trailer from "./_components/trailer";
import { CtaButtonSkeleton } from "./_components/cta-button-skeleton";
import CtaButton from "./_components/cta-button";
import SectionsNavigation from "./_components/sections-navigation";
import FeaturesSection from "./_components/features-section";
import GroupJoinEngagementSection from "./_components/group-join-engagement-section";
import PointersSection from "./_components/pointers-section";
import CourseDetailsSection from "./_components/course-details-section";
import CourseExclusiveFeatureSection from "./_components/course-exclusive-feature-section";
import TestimonialsSection from "./_components/testimonials-section";
import FaqSection from "./_components/faq-section";
import GenericSection from "./_components/generic-section";
import RatingDisplay from "./_components/rating-display";
import ContactSection from "./_components/contact-section";
import ChecklistSection from "./_components/checklist-section";
import InstructorsSection from "./_components/instructors-section";
import HeroBackground from "./_components/hero-background";

interface ProductPageProps {
    params: Promise<{
        slug: string;
        locale: "en" | "bn";
    }>;
}

interface Section {
    type: string;
    name: string;
    values?: any[];
    bg_color?: string;
}

const SECTION_TYPES = {
    INSTRUCTORS: 'instructors',
    FEATURES: 'features',
    GROUP_JOIN_ENGAGEMENT: 'group_join_engagement',
    POINTERS: 'pointers',
    ABOUT: 'about',
    FEATURE_EXPLANATIONS: 'feature_explanations',
    TESTIMONIALS: 'testimonials',
    FAQ: 'faq',
} as const;

// Section configuration for easy management
const SECTION_CONFIGS = [
    {
        type: SECTION_TYPES.FEATURES,
        Component: FeaturesSection,
        emptyMessage: "No features available for this course."
    },
    {
        type: SECTION_TYPES.GROUP_JOIN_ENGAGEMENT,
        Component: GroupJoinEngagementSection,
        emptyMessage: "No engagement activities available."
    },
    {
        type: SECTION_TYPES.POINTERS,
        Component: PointersSection,
        emptyMessage: "No key points available."
    },
    {
        type: SECTION_TYPES.ABOUT,
        Component: CourseDetailsSection,
        emptyMessage: "No course details available."
    },
    {
        type: SECTION_TYPES.FEATURE_EXPLANATIONS,
        Component: CourseExclusiveFeatureSection,
        emptyMessage: "No exclusive features available."
    },
    {
        type: SECTION_TYPES.TESTIMONIALS,
        Component: TestimonialsSection,
        emptyMessage: "No testimonials available."
    },
    {
        type: SECTION_TYPES.FAQ,
        Component: FaqSection,
        emptyMessage: "No frequently asked questions available."
    },
] as const;

// SEO metadata for product page
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const productData = await getProductData(slug, locale);
    if (!productData) return {};
    return {
        title: productData.title,
        description: productData.description?.replace(/<[^>]+>/g, ""),
        openGraph: {
            title: productData.title,
            description: productData.description?.replace(/<[^>]+>/g, ""),
            images: productData.media[0]?.thumbnail_url ? [{ url: productData.media[0].thumbnail_url }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: productData.title,
            description: productData.description?.replace(/<[^>]+>/g, ""),
            images: productData.media[0]?.thumbnail_url ? [productData.media[0].thumbnail_url] : [],
        },
    };
}

// Main component
const ProductPage = async ({ params }: ProductPageProps) => {
    const { slug, locale } = await params;

    // Fetch data in parallel
    const [productData, t] = await Promise.all([
        getProductData(slug, locale),
        getTranslations("Product")
    ]);

    if (!productData) {
        notFound();
    }

    // Fetch rating data after product data is confirmed
    const ratingData = await getCourseRating(
        productData.id,
        productData.old_info.course_id
    );

    return (
        <>
            {/* Full-width hero background for desktop */ }
            <div className="hidden lg:block  absolute inset-x-0 top-16 h-[320px] lg:h-[360px] xl:h-[400px] -z-10">
                <HeroBackground />
            </div>

            <main className="max-w-[1200px] lg:flex lg:gap-8 mx-auto px-4 py-8">
                {/* Main content */ }
                <div className="lg:flex-1 lg:max-w-[calc(100%_-_400px)] relative z-10">
                    {/* Mobile: trailer, then hero/title/rating, then CTA, then navigation/sections */ }
                    <div className="block lg:hidden">
                        <div className="relative">
                            {/* Mobile hero background - positioned to cover trailer and header area */ }
                            <div className="absolute inset-0 w-full h-full z-0">
                                <HeroBackground />
                            </div>
                            <div className="relative z-10">
                                <Trailer media={ productData.media } />
                                <header className="px-2 py-4">
                                    <h1 className="text-gray-100 text-2xl font-bold">{ productData.title }</h1>
                                    <RatingDisplay ratingData={ ratingData } />
                                    <div
                                        className="text-muted/70 prose prose-sm max-w-none mt-4"
                                        dangerouslySetInnerHTML={ { __html: productData.description } }
                                    />
                                </header>
                            </div>
                            {/* Mobile CTA outside the background */ }
                            <div className="w-full px-2 py-4 bg-white flex flex-col gap-4 mt-2 mb-2 relative z-10">
                                <Suspense fallback={ <CtaButtonSkeleton /> }>
                                    <CtaButton slug={ slug } ctaText={ productData.cta_text } />
                                </Suspense>
                            </div>
                            <ChecklistSection checklist={ productData.checklist } t={ t } />
                            <ContactSection t={ t } />
                            <div className="mt-6">
                                <SectionsNavigation sections={ productData.sections } />
                                <InstructorsSection sections={ productData.sections } />
                                { SECTION_CONFIGS.map(({ type, Component, emptyMessage }) => (
                                    <GenericSection
                                        key={ type }
                                        sections={ productData.sections }
                                        sectionType={ type }
                                        Component={ Component }
                                        emptyStateMessage={ emptyMessage }
                                    />
                                )) }
                            </div>
                        </div>
                    </div>

                    {/* Desktop: hero/title/rating with full-width background, navigation/sections; trailer/cta in sidebar */ }
                    <div className="hidden -mt-20 lg:block relative">
                        {/* Desktop hero section with proper spacing from top */ }
                        <header className="px-4  relative z-10 flex flex-col items-start justify-center h-[320px] lg:h-[360px] xl:h-[400px] mt-0">
                            <h1 className="text-gray-100 text-4xl font-bold mb-2">{ productData.title }</h1>
                            <RatingDisplay ratingData={ ratingData } />
                            <div
                                className="text-muted/70 prose prose-sm max-w-none mt-4"
                                dangerouslySetInnerHTML={ { __html: productData.description } }
                            />
                        </header>

                        {/* Content sections below hero */ }
                        <div className="">
                            <SectionsNavigation sections={ productData.sections } />
                            <InstructorsSection sections={ productData.sections } />
                            { SECTION_CONFIGS.map(({ type, Component, emptyMessage }) => (
                                <GenericSection
                                    key={ type }
                                    sections={ productData.sections }
                                    sectionType={ type }
                                    Component={ Component }
                                    emptyStateMessage={ emptyMessage }
                                />
                            )) }
                        </div>
                    </div>
                </div>

                {/* Sidebar CTA for desktop */ }
                <aside className="lg:w-96 order-1 lg:order-2 lg:flex-shrink-0 hidden lg:block">
                    <div className="lg:sticky lg:top-28">
                        <div className="border lg:bg-background p-1">
                            <Trailer media={ productData.media } />
                            <div className="w-full px-2 py-4 rounded-lg bg-white flex flex-col gap-4 mt-2 mb-2">
                                <Suspense fallback={ <CtaButtonSkeleton /> }>
                                    <CtaButton slug={ slug } ctaText={ productData.cta_text } />
                                </Suspense>
                            </div>
                            <ChecklistSection checklist={ productData.checklist } t={ t } />
                        </div>
                        <ContactSection t={ t } />
                    </div>
                </aside>
            </main>
        </>
    );
};

export default ProductPage;
