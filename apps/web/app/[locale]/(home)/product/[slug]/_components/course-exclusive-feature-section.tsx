"use client";

import { CheckIcon } from "lucide-react";
import Image from "next/image";

interface ExclusiveFeature {
    id: string;
    title: string;
    checklist: string[];
    file_url: string;
    file_type: string;
    video_thumbnail?: string;
}

interface CourseExclusiveFeatureSectionProps {
    title: string;
    features: ExclusiveFeature[];
    bgColor?: string;
}

const CourseExclusiveFeatureSection = ({
    title,
    features,
    bgColor
}: CourseExclusiveFeatureSectionProps) => {
    if (!features || features.length === 0) {
        return null;
    }

    return (
        <section
            className="py-8 px-6 rounded-lg"
            style={ { backgroundColor: bgColor || '#ffffff' } }
        >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                { title }
            </h2>

            <div className="space-y-6">
                { features.map((feature) => (
                    <div
                        key={ feature.id }
                        className="bg-white rounded-lg border border-gray-200 p-6"
                    >
                        <div className="flex flex-col lg:flex-row gap-6 items-start">
                            {/* Left side - Title and Checklist */ }
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    { feature.title }
                                </h3>
                                <div className="space-y-3">
                                    { feature.checklist.map((item, index) => (
                                        <div key={ index } className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-0.5">
                                                <CheckIcon className="w-4 h-4 text-blue-500" />
                                            </div>
                                            <span className="text-gray-700 text-sm leading-relaxed">
                                                { item }
                                            </span>
                                        </div>
                                    )) }
                                </div>
                            </div>

                            {/* Right side - Image */ }
                            <div className="flex-shrink-0">
                                <div className="w-48 h-full min-h-58 relative  overflow-hidden">
                                    <Image
                                        src={ feature.file_url }
                                        alt={ feature.title }
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 192px"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </section>
    );
};

export default CourseExclusiveFeatureSection;
