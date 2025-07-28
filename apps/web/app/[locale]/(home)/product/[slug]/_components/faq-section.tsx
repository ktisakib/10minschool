"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@enterprise/ui/components/accordion";
import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}



const FaqSection = ({ faqs }: { faqs: FaqItem[] }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <Accordion type="multiple" className="w-full">
                { visibleFaqs.map((faq) => (
                    <AccordionItem key={ faq.id } value={ faq.id } className="border-b last:border-b-0">
                        <AccordionTrigger className="text-left font-medium text-gray-700 hover:text-gray-900 px-6 py-4 text-base">
                            { faq.question }
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                            <div className="text-gray-600 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={ { __html: faq.answer } } />
                        </AccordionContent>
                    </AccordionItem>
                )) }
            </Accordion>
            { faqs.length > 5 && (
                <div className="flex justify-center py-4">
                    <button
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-full flex items-center gap-2 text-base font-medium shadow-sm border border-gray-200"
                        onClick={ () => setShowAll((prev) => !prev) }
                    >
                        {showAll ? 'See less' : 'See all'}
                        <ChevronDownIcon className={ `w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}` } />
                    </button>
                </div>
            ) }
        </div>
    );
};

export default FaqSection;
