import { getProductData, getCourseRating } from "@/lib/api/product";
import { notFound } from "next/navigation";
import Trailer from "./_components/trailer";
import Image from "next/image";
import { CheckIcon, PhoneIcon } from "lucide-react";
import { Suspense } from "react";
import { CtaButtonSkeleton } from "./_components/cta-button-skeleton";
import CtaButton from "./_components/cta-button";
import { getTranslations } from "next-intl/server";
import SectionsNavigation from "./_components/sections-navigation";
import FeaturesSection from "./_components/features-section";
import GroupJoinEngagementSection from "./_components/group-join-engagement-section";
import PointersSection from "./_components/pointers-section";
import CourseDetailsSection from "./_components/course-details-section";
import CourseExclusiveFeatureSection from "./_components/course-exclusive-feature-section";
import TestimonialsSection from "./_components/testimonials-section";
import FaqSection from "./_components/faq-section";
import Link from "next/link";

interface ProductPageProps {
    params: Promise<{
        slug: string;
        locale: "en" | "bn";
    }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { slug, locale } = await params;
    const productData = await getProductData(slug, locale);
    const t = await getTranslations("Product");

    if (!productData) notFound();

    // Fetch rating data
    const ratingData = await getCourseRating(
        productData.id,
        productData.old_info.course_id
    );

    return (
        <>
            <div className='min-h-75 max-w-screen w-full flex items-center   isolate  absolute bg-black'>
                <div
                    className='absolute inset-0 z-0'
                    style={ {
                        backgroundImage: `
          radial-gradient(circle at 90% 100%, rgba(19, 47, 105, 0.5) 0%, transparent 60%),
          radial-gradient(circle at 90% 100%, rgba(19, 47, 105, 0.4) 0%, transparent 30%),
          radial-gradient(circle at 90% 100%, rgba(19, 47, 105, 0.3) 0%, transparent 10%)
        `,
                    } }
                />
            </div>

            <main className='max-w-[1200px] lg:flex lg:gap-8 mx-auto px-4 py-8'>
                <div className='lg:flex-1 lg:max-w-[calc(100%_-_400px)] relative z-10'>
                    <div className='px-4 py-8'>
                        <h1 className='text-gray-100 text-4xl'>{ productData.title }</h1>
                        { ratingData && (
                            <div className='flex items-center gap-2 my-4'>
                                <div className='flex text-yellow-400 text-lg'>⭐⭐⭐⭐⭐</div>
                                <span className='text-gray-50 text-sm'>
                                    ({ ratingData.course_rating }%{ " " }
                                    { ratingData.rating_text }
                                    )
                                </span>
                            </div>
                        ) }
                        <div
                            className='text-muted/70 prose  prose-sm max-w-none'
                            dangerouslySetInnerHTML={ { __html: productData.description } }
                        />
                    </div>
                    <div className='mt-10   '>
                        <SectionsNavigation sections={ productData.sections } />
                        {/* instructor section */ }
                        <section id='instructors' className='mt-8  scroll-mt-10 bg-white rounded-lg p-6'>
                            { (() => {
                                // Find the instructors section from the sections array
                                const instructorsSection = productData.sections.find(section => section.type === 'instructors');
                                const sectionTitle = instructorsSection?.name || 'কোর্স ইন্সট্রাক্টার';
                                const instructors = instructorsSection?.values || [];

                                return (
                                    <>
                                        <h2 className='text-2xl font-bold text-gray-900 mb-6'>{ sectionTitle }</h2>

                                        { instructors.length > 0 ? (
                                            <div className='space-y-4'>
                                                { instructors.map((instructor, index) => (
                                                    <div key={ instructor.slug || index } className='flex items-start gap-4 p-4 border border-gray-200 rounded-lg'>
                                                        <div className='flex-shrink-0'>
                                                            { instructor.image ? (
                                                                <Image
                                                                    src={ instructor.image }
                                                                    alt={ instructor.name }
                                                                    width={ 80 }
                                                                    height={ 80 }
                                                                    className='rounded-full object-cover'
                                                                />
                                                            ) : (
                                                                <div className='w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center'>
                                                                    <span className='text-gray-600 text-2xl'>👨‍🏫</span>
                                                                </div>
                                                            ) }
                                                        </div>

                                                        <div className='flex-1'>
                                                            <h3 className='text-lg font-semibold text-gray-900 mb-2'>{ instructor.name }</h3>
                                                            { instructor.short_description && (
                                                                <p className='text-sm text-gray-600 mb-2'>{ instructor.short_description }</p>
                                                            ) }
                                                            { instructor.description && (
                                                                <div
                                                                    className='text-sm text-gray-600'
                                                                    dangerouslySetInnerHTML={ { __html: instructor.description } }
                                                                />
                                                            ) }
                                                        </div>
                                                    </div>
                                                )) }
                                            </div>
                                        ) : (
                                            /* Placeholder instructor when no data is available */
                                            <div className='flex items-start gap-4 p-4 border border-gray-200 rounded-lg'>
                                                <div className='flex-shrink-0'>
                                                    <div className='w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center'>
                                                        <span className='text-gray-600 text-2xl'>👨‍🏫</span>
                                                    </div>
                                                </div>

                                                <div className='flex-1'>
                                                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>Munzereen Shahid</h3>
                                                    <div className='space-y-1 text-sm text-gray-600'>
                                                        <p>MSc (English), University of Oxford (UK);</p>
                                                        <p>BA, MA (English), University of Dhaka;</p>
                                                        <p className='font-medium'>IELTS: 8.5</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) }
                                    </>
                                );
                            })() }
                        </section>

                        {/* features section */ }
                        { (() => {
                            // Find the features section from the sections array
                            const featuresSection = productData.sections.find(section => section.type === 'features');

                            if (!featuresSection || !featuresSection.values || featuresSection.values.length === 0) {
                                return null;
                            }

                            return (
                                <FeaturesSection
                                    title={ featuresSection.name }
                                    features={ featuresSection.values }
                                    bgColor={ featuresSection.bg_color }
                                />
                            );
                        })() }

                        {/* group join engagement section */ }
                        { (() => {
                            // Find the group_join_engagement section from the sections array
                            const engagementSection = productData.sections.find(section => section.type === 'group_join_engagement');

                            if (!engagementSection || !engagementSection.values || engagementSection.values.length === 0) {
                                return null;
                            }

                            return (
                                <GroupJoinEngagementSection
                                    engagements={ engagementSection.values }
                                />
                            );
                        })() }

                        {/* pointers section */ }
                        { (() => {
                            // Find the pointers section from the sections array
                            const pointersSection = productData.sections.find(section => section.type === 'pointers');

                            if (!pointersSection || !pointersSection.values || pointersSection.values.length === 0) {
                                return null;
                            }

                            return (
                                <PointersSection
                                    title={ pointersSection.name }
                                    pointers={ pointersSection.values }
                                    bgColor={ pointersSection.bg_color }
                                />
                            );
                        })() }

                        {/* course details section */ }
                        { (() => {
                            // Find the about section from the sections array
                            const aboutSection = productData.sections.find(section => section.type === 'about');

                            if (!aboutSection || !aboutSection.values || aboutSection.values.length === 0) {
                                return null;
                            }

                            return (
                                <CourseDetailsSection
                                    title={ aboutSection.name }
                                    details={ aboutSection.values }
                                    bgColor={ aboutSection.bg_color }
                                />
                            );
                        })() }

                        {/* course exclusive features section */ }
                        { (() => {
                            // Find the feature_explanations section from the sections array
                            const exclusiveFeaturesSection = productData.sections.find(section => section.type === 'feature_explanations');

                            if (!exclusiveFeaturesSection || !exclusiveFeaturesSection.values || exclusiveFeaturesSection.values.length === 0) {
                                return null;
                            }

                            return (
                                <CourseExclusiveFeatureSection
                                    title={ exclusiveFeaturesSection.name }
                                    features={ exclusiveFeaturesSection.values }
                                    bgColor={ exclusiveFeaturesSection.bg_color }
                                />
                            );
                        })() }

                        {/* testimonials section */ }
                        { (() => {
                            // Find the testimonials section from the sections array
                            const testimonialsSection = productData.sections.find(section => section.type === 'testimonials');

                            if (!testimonialsSection || !testimonialsSection.values || testimonialsSection.values.length === 0) {
                                return null;
                            }

                            return (
                                <TestimonialsSection
                                    title={ testimonialsSection.name }
                                    testimonials={ testimonialsSection.values }
                                    bgColor={ testimonialsSection.bg_color }
                                />
                            );
                        })() }

                        {/* FAQ section */ }
                        { (() => {
                            // Find the FAQ section from the sections array
                            const faqSection = productData.sections.find(section => section.type === 'faq');

                            if (!faqSection || !faqSection.values || faqSection.values.length === 0) {
                                return null;
                            }

                            return (
                                <FaqSection
                                    title={ faqSection.name }
                                    faqs={ faqSection.values }
                                    bgColor={ faqSection.bg_color }
                                />
                            );
                        })() }
                    </div>
                </div>
                {/* CTA Section - right side */ }
                <aside className='lg:w-96 lg:flex-shrink-0'>
                    <div className='lg:sticky lg:top-28'>
                        <div className='border bg-background p-1'>
                            <Trailer media={ productData.media } />

                            <Suspense fallback={ <CtaButtonSkeleton /> }>
                                <CtaButton
                                    slug={ slug }
                                    ctaText={ productData.cta_text }
                                />
                            </Suspense>

                            {/* Checklist Section */ }
                            { productData.checklist && productData.checklist.length > 0 && (
                                <div className='p-4 space-y-3'>
                                    <h2 className='text-2xl font-bold text-foreground'>
                                        { t("checklist_title") }
                                    </h2>
                                    { productData.checklist.map((item) => (
                                        <div
                                            key={ item.id }
                                            className='flex items-center gap-3'>
                                            <div className='flex items-center justify-center rounded-full flex-shrink-0'>
                                                { item.icon ? (
                                                    <Image
                                                        src={ item.icon }
                                                        alt={ item.text }
                                                        width={ 20 }
                                                        height={ 20 }
                                                        className='size-5'
                                                    />
                                                ) : (
                                                    <CheckIcon className='w-3 h-3 text-white' />
                                                ) }
                                            </div>
                                            <span className='text-sm text-muted-foreground leading-relaxed'>
                                                { item.text }
                                            </span>
                                        </div>
                                    )) }
                                </div>
                            ) }
                            {/* Info and phone call section */ }

                        </div>
                        <div className=" pt-2 flex justify-between items-center">
                            <div className="text-gray-400 text-sm mb-2">
                                { t("cta_info") }
                            </div>
                            <Link
                                href="tel:16910"
                                className="flex items-center gap-2 text-green-600 font-semibold text-base hover:underline"
                            >
                                <PhoneIcon className="w-4 h-4 fill-primary stroke-0" />

                                { t("cta_call") }
                            </Link>
                        </div>
                    </div>
                </aside>
            </main>
        </>
    );
};

export default ProductPage;
