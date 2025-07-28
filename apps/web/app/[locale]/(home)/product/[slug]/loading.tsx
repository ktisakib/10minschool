import React from "react";
import { Skeleton } from "@enterprise/ui/components/skeleton";

const LoadingProductPage = () => {
    return (
        <>
            <div className="min-h-75 max-w-screen w-full flex items-center isolate absolute bg-black">
                <div
                    className="absolute inset-0 z-0"
                    style={ {
                        backgroundImage: `
              radial-gradient(circle at 90% 100%, rgba(19, 47, 105, 0.5) 0%, transparent 60%),
              radial-gradient(circle at 90% 100%, rgba(19, 47, 105, 0.4) 0%, transparent 30%),
              radial-gradient(circle at 90% 100%, rgba(19, 47, 105, 0.3) 0%, transparent 10%)
            `,
                    } }
                />
            </div>

            <main className="max-w-[1200px] lg:flex lg:gap-8 mx-auto px-4 py-8">
                <div className="lg:flex-1 lg:max-w-[calc(100%_-_400px)] relative z-10">
                    <div className="px-4 py-8">
                        <Skeleton className="h-10 w-2/3 mb-4" />
                        <div className="flex items-center gap-2 my-4">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-20 w-full mb-4" />
                    </div>
                    <div className="mt-10">
                        {/* Sections Navigation Skeleton */ }
                        <Skeleton className="h-8 w-1/2 mb-6" />

                        {/* Instructor Section Skeleton */ }
                        <section className="mt-8 scroll-mt-10 bg-white rounded-lg p-6">
                            <Skeleton className="h-8 w-1/3 mb-6" />
                            <div className="space-y-4">
                                { [...Array(2)].map((_, i) => (
                                    <div key={ i } className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                                        <Skeleton className="w-20 h-20 rounded-full" />
                                        <div className="flex-1">
                                            <Skeleton className="h-6 w-1/2 mb-2" />
                                            <Skeleton className="h-4 w-2/3 mb-2" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    </div>
                                )) }
                            </div>
                        </section>

                        {/* Features Section Skeleton */ }
                        <Skeleton className="h-8 w-1/4 mt-8 mb-4" />
                        <div className="space-y-2 mb-8">
                            { [...Array(3)].map((_, i) => (
                                <Skeleton key={ i } className="h-6 w-2/3" />
                            )) }
                        </div>

                        {/* Other Sections Skeletons */ }
                        { [...Array(4)].map((_, i) => (
                            <div key={ i } className="mb-8">
                                <Skeleton className="h-8 w-1/4 mb-4" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        )) }
                    </div>
                </div>
                {/* CTA Section - right side */ }
                <aside className="lg:w-96 lg:flex-shrink-0">
                    <div className="lg:sticky lg:top-28">
                        <div className="border bg-background p-1">
                            {/* Trailer Skeleton */ }
                            <Skeleton className="h-56 w-full mb-4" />
                            {/* CTA Button Skeleton */ }
                            <Skeleton className="h-12 w-full mb-4" />
                            {/* Checklist Skeleton */ }
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-8 w-1/2 mb-2" />
                                { [...Array(3)].map((_, i) => (
                                    <div key={ i } className="flex items-center gap-3">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                )) }
                            </div>
                        </div>
                        <div className="pt-2 flex justify-between items-center">
                            <Skeleton className="h-4 w-1/3 mb-2" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </div>
                </aside>
            </main>
        </>
    );
};

export default LoadingProductPage;
