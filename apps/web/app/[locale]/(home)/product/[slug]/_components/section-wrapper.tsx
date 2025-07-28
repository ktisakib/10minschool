import React from "react";

interface SectionWrapperProps {
    id?: string;
    title: string;
    bgColor?: string;
    className?: string;
    children: React.ReactNode;
}

const getBgColorClass = (bgColor?: string): string => {
    if (!bgColor) return 'bg-white';
    if (bgColor.startsWith('#') || bgColor.startsWith('rgb') || bgColor.startsWith('var(')) {
        return '';
    }
    return bgColor.startsWith('bg-') ? bgColor : `bg-${bgColor}`;
};

const getBgColorStyle = (bgColor?: string): React.CSSProperties => {
    if (!bgColor) return {};
    if (bgColor.startsWith('#') || bgColor.startsWith('rgb') || bgColor.startsWith('var(')) {
        return { backgroundColor: bgColor };
    }
    return {};
};

const SectionWrapper = ({ id, title, bgColor, className = "", children }: SectionWrapperProps) => {
    const bgClass = getBgColorClass(bgColor);
    const bgStyle = getBgColorStyle(bgColor);
    return (
        <section
            id={ id }
            className={ `mt-8 scroll-mt-10 rounded-lg p-6 ${bgClass} ${className}` }
            style={ bgStyle }
        >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{ title }</h2>
            { children }
        </section>
    );
};

export default SectionWrapper;
