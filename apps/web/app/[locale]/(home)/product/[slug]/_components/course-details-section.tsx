"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@enterprise/ui/components/accordion";

interface CourseDetailValue {
    id: string;
    title: string;
    description: string;
    icon: string;
}

interface CourseDetailsSectionProps {
    title: string;
    details: CourseDetailValue[];
    bgColor?: string;
}

// Helper function to strip HTML tags and extract plain text
const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
};

const CourseDetailsSection = ({ title, details, bgColor }: CourseDetailsSectionProps) => {
    if (!details || details.length === 0) {
        return null;
    }

    return (
        <section
            id="about"
            className="py-8 px-6 rounded-lg"
            style={ { backgroundColor: bgColor || '#ffffff' } }
        >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                { title }
            </h2>

            <div className="bg-white border border-gray-200  rounded-lg overflow-hidden">
                <Accordion
                    type="multiple"
                    defaultValue={ ["item-0"] }
                    className="w-full"
                >
                    { details.map((detail, index) => (
                        <AccordionItem
                            key={ detail.id }
                            value={ `item-${index}` }
                            className="border-b border-dashed  last:border-b-0"
                        >
                            <AccordionTrigger className="text-left font-medium text-gray-700 hover:text-gray-900 px-6 py-4 text-base">
                                { stripHtmlTags(detail.title) }
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4">
                                <div
                                    className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={ { __html: detail.description } }
                                />
                            </AccordionContent>
                        </AccordionItem>
                    )) }
                </Accordion>
            </div>
        </section>
    );
};

export default CourseDetailsSection;
