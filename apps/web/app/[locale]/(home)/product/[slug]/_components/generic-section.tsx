import ConditionalSection from "./conditional-section";

interface Section {
    type: string;
    name: string;
    values?: any[];
    bg_color?: string;
}

const findSectionByType = (sections: Section[], type: string): Section | undefined => {
    return sections.find(section => section.type === type);
};

const getComponentProps = (sectionType: string, values: any[], section: Section) => {
    const propMap: Record<string, string> = {
        features: 'features',
        group_join_engagement: 'engagements',
        pointers: 'pointers',
        about: 'details',
        feature_explanations: 'features',
        testimonials: 'testimonials',
        faq: 'faqs',
    };
    const propName = propMap[sectionType] || 'items';
    return {
        [propName]: values,
        title: section.name,
        bgColor: section.bg_color,
    };
};

const GenericSection = ({
    sections,
    sectionType,
    Component,
    className,
    emptyStateMessage
}: {
    sections: Section[];
    sectionType: string;
    Component: React.ComponentType<any>;
    className?: string;
    emptyStateMessage?: string;
}) => {
    const section = findSectionByType(sections, sectionType);
    if (!section) return null;
    return (
        <ConditionalSection
            section={ section }
            className={ className }
            emptyStateMessage={ emptyStateMessage }
            renderContent={ (values) => (
                <Component
                    { ...getComponentProps(sectionType, values, section) }
                />
            ) }
        />
    );
};

export default GenericSection;
