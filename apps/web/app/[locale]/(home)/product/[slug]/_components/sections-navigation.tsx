'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Section } from '@/lib/types/product';

interface SectionsNavigationProps {
    sections: Section[];
}

const SectionsNavigation = ({ sections }: SectionsNavigationProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<string>('');
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Filter sections that have names (visible sections)
    const visibleSections = sections.filter(section => section.name && section.name.trim() !== '');

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = visibleSections.map(section => ({
                id: section.type,
                element: document.getElementById(section.type)
            }));

            const currentSection = sections.find(section => {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    return rect.top <= 200 && rect.bottom >= 200;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };

        const handleScrollButtonCheck = () => {
            checkScrollButtons();
        };

        window.addEventListener('scroll', handleScroll);
        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScrollButtonCheck);
        }

        // Initial check
        checkScrollButtons();
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScrollButtonCheck);
            }
        };
    }, [visibleSections]);

    if (visibleSections.length === 0) {
        return null;
    }

    return (
        <nav className="sticky top-16 w-full z-40 bg-background/95 backdrop-blur-sm border-b border-border py-2">
            <div className="max-w-3xl  mx-auto px-4 relative">
                <div className="flex items-center gap-2">
                    {/* Left scroll button */ }
                    <button
                        onClick={ scrollLeft }
                        disabled={ !canScrollLeft }
                        className={ `flex-shrink-0 p-2 rounded-full border transition-colors ${canScrollLeft
                                ? 'bg-background hover:bg-muted border-border'
                                : 'bg-muted border-muted text-muted-foreground cursor-not-allowed'
                            }` }
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Scrollable navigation */ }
                    <div
                        ref={ scrollRef }
                        className="flex-1 overflow-x-auto scrollbar-hide"
                        style={ { scrollbarWidth: 'none', msOverflowStyle: 'none' } }
                    >
                        <div className="flex gap-1 min-w-max">
                            { visibleSections.map((section) => (
                                <Link
                                    key={ section.type }
                                    href={ `#${section.type}` }
                                    className={ `px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeSection === section.type
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                                        }` }
                                >
                                    { section.name }
                                </Link>
                            )) }
                        </div>
                    </div>

                    {/* Right scroll button */ }
                    <button
                        onClick={ scrollRight }
                        disabled={ !canScrollRight }
                        className={ `flex-shrink-0 p-2 rounded-full border transition-colors ${canScrollRight
                                ? 'bg-background hover:bg-muted border-border'
                                : 'bg-muted border-muted text-muted-foreground cursor-not-allowed'
                            }` }
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default SectionsNavigation;
