"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from "lucide-react";
import Image from "next/image";

interface Testimonial {
    id: string;
    name: string;
    description: string;
    testimonial: string;
    profile_image: string;
    thumb: string;
    video_url: string;
    video_type: string;
}



const TestimonialsSection = ({
    testimonials,
}: {
    testimonials: Testimonial[];
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 2)) % Math.ceil(testimonials.length / 2));
    };

    const handleVideoPlay = (videoUrl: string) => {
        // Open video in a new tab or implement video modal
        window.open(`https://www.youtube.com/watch?v=${videoUrl}`, '_blank');
    };

    const getVisibleTestimonials = () => {
        const startIndex = currentIndex * 2;
        return testimonials.slice(startIndex, startIndex + 2);
    };

    return (


        <div className="relative">
            {/* Navigation buttons */ }
            { testimonials.length > 2 && (
                <>
                    <button
                        onClick={ prevSlide }
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                    </button>

                    <button
                        onClick={ nextSlide }
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Next testimonials"
                    >
                        <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </>
            ) }

            {/* Testimonials grid */ }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-12">
                { getVisibleTestimonials().map((testimonial) => (
                    <div
                        key={ testimonial.id }
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        {/* Quote icon */ }
                        <div className="relative">
                            <div className="absolute top-4 left-4 z-10">
                                <svg
                                    width="24"
                                    height="20"
                                    viewBox="0 0 24 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-red-500"
                                >
                                    <path
                                        d="M9.6 10.8C9.6 8.88 8.52 7.2 6.6 6.6C7.08 5.04 8.52 3.96 10.56 3.96V0C5.52 0 1.2 3.36 1.2 8.4C1.2 12.24 3.84 15.6 7.2 15.6C8.76 15.6 9.6 14.4 9.6 12.72V10.8ZM22.8 10.8C22.8 8.88 21.72 7.2 19.8 6.6C20.28 5.04 21.72 3.96 23.76 3.96V0C18.72 0 14.4 3.36 14.4 8.4C14.4 12.24 17.04 15.6 20.4 15.6C21.96 15.6 22.8 14.4 22.8 12.72V10.8Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>

                            {/* Video thumbnail with play button */ }
                            <div className="relative aspect-video cursor-pointer" onClick={ () => handleVideoPlay(testimonial.video_url) }>
                                <Image
                                    src={ testimonial.thumb }
                                    alt={ `${testimonial.name} testimonial` }
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* Play button overlay */ }
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200">
                                        <PlayIcon className="w-6 h-6 text-red-500 ml-1" fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student info */ }
                        <div className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={ testimonial.profile_image }
                                        alt={ testimonial.name }
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-base">
                                        { testimonial.name }
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        { testimonial.description }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
};

export default TestimonialsSection;
