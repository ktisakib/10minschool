import SectionWrapper from "./section-wrapper";

interface Section {
    type: string;
    name: string;
    values?: any[];
    bg_color?: string;
}

interface DynamicSectionProps {
    section: Section;
    renderContent: (values: any[]) => React.ReactNode;
    className?: string;
    emptyStateMessage?: string;
}

const hasSectionContent = (section: Section | undefined): boolean => {
    return !!(section?.values?.length);
};

const ConditionalSection = ({
    section,
    renderContent,
    className,
    emptyStateMessage
}: DynamicSectionProps) => {
    if (!hasSectionContent(section)) {
        return emptyStateMessage ? (
            <SectionWrapper title={ section.name } bgColor={ section.bg_color } className={ className }>
                <p className="text-gray-500 text-center py-8">{ emptyStateMessage }</p>
            </SectionWrapper>
        ) : null;
    }
    return (
        <SectionWrapper
            id={ section.type }
            title={ section.name }
            bgColor={ section.bg_color }
            className={ className }
        >
            { renderContent(section.values!) }
        </SectionWrapper>
    );
};

export default ConditionalSection;
