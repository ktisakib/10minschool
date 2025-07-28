import { getProductData, getCourseRating } from "@/lib/api/product";
import { notFound } from "next/navigation";
import Trailer from "./_components/trailer";
import Image from "next/image";
import { CheckIcon } from "lucide-react";
import { Suspense } from "react";
import { CtaButtonSkeleton } from "./_components/cta-button-skeleton";
import CtaButton from "./_components/cta-button";
import { getTranslations } from "next-intl/server";

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

    console.log(productData?.description);

    if (!productData) notFound();

    // Fetch rating data
    const ratingData = await getCourseRating(
        productData.id,
        productData.old_info.course_id
    );

    return (
        <>
            <div className='min-h-75 max-w-screen w-full flex items-center   isolate  absolute bg-black'>
                <div className='max-w-[1200px] h-full  mx-auto px-4 py-8 relative z-10'>
                    <div className='md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]'>
                        <h1 className='text-gray-100 text-4xl'>{ productData.title }</h1>
                        { ratingData && (
                            <div className='flex items-center gap-2 my-4'>
                                <div className='flex text-yellow-400 text-lg'>
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <span className='text-gray-50 text-sm'>
                                    ({ ratingData.course_rating }% { ratingData.rating_text.replace(/[()]/g, '').replace(/\d+\.\d+%\s*/, '') })
                                </span>
                            </div>
                        ) }
                        <div
                            className='text-muted/70 prose  prose-sm max-w-none'
                            dangerouslySetInnerHTML={ { __html: productData.description } }
                        />
                    </div>
                </div>
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
            <main className='max-w-[1200px] mx-auto px-4 py-8'>
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Main content area - left side */ }
                    <div className='flex-1 min-h-[200vh]'>
                        {/* This will contain the main content like course details, instructor info, etc. */ }
                        <div className='space-y-8'>
                            <div className='bg-card p-6 rounded-lg'>
                                <h2 className='text-2xl font-bold mb-4'>Course Content</h2>
                                <p className='text-muted-foreground'>Course details and modules will go here...</p>
                            </div>
                            <div className='bg-card p-6 rounded-lg'>
                                <h2 className='text-2xl font-bold mb-4'>Instructor Information</h2>
                                <p className='text-muted-foreground'>Instructor details will go here...</p>
                            </div>
                            <div className='bg-card p-6 rounded-lg'>
                                <h2 className='text-2xl font-bold mb-4'>Reviews</h2>
                                <p className='text-muted-foreground'>Student reviews will go here...</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section - right side */ }
                    <div className='lg:w-96 w-full'>
                        <aside className='lg:sticky lg:top-32 bg-background p-1'>
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
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProductPage;
