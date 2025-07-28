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
            <HeroBackground />

            <main className="max-w-[1200px] lg:flex lg:gap-8 mx-auto px-4 py-8">
                {/* Main content */ }
                <div className="lg:flex-1 lg:max-w-[calc(100%_-_400px)] relative z-10">
                    {/* Header section */ }
                    <header className="px-4 py-8">
                        <h1 className="text-gray-100 text-4xl">{ productData.title }</h1>
                        <RatingDisplay ratingData={ ratingData } />
                        <div
                            className="text-muted/70 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={ { __html: productData.description } }
                        />
                    </header>

                    {/* Navigation and sections */ }
                    <div className="mt-10">
                        <SectionsNavigation sections={ productData.sections } />

                        <InstructorsSection sections={ productData.sections } />

                        {/* Dynamic sections using composable components */ }
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

                {/* Sidebar CTA */ }
                <aside className="lg:w-96 lg:flex-shrink-0">
                    <div className="lg:sticky lg:top-28">
                        <div className="border bg-background p-1">
                            <Trailer media={ productData.media } />

                            <Suspense fallback={ <CtaButtonSkeleton /> }>
                                <CtaButton slug={ slug } ctaText={ productData.cta_text } />
                            </Suspense>

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
