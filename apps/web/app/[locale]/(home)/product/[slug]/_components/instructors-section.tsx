import InstructorCard from "./instructor-card";
import DefaultInstructorCard from "./default-instructor-card";

interface Instructor {
    slug?: string;
    name: string;
    image?: string;
    short_description?: string;
    description?: string;
}

interface Section {
    type: string;
    name: string;
    values?: any[];
    bg_color?: string;
}

const SECTION_TYPES = {
    INSTRUCTORS: 'instructors',
} as const;

const InstructorsSection = ({ sections }: { sections: Section[] }) => {
    const instructorsSection = sections.find(section => section.type === SECTION_TYPES.INSTRUCTORS);
    const sectionTitle = instructorsSection?.name || 'কোর্স ইন্সট্রাক্টার';
    const instructors = instructorsSection?.values || [];

    return (
        <section id="instructors" className="mt-8 scroll-mt-10 bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{ sectionTitle }</h2>

            { instructors.length > 0 ? (
                <div className="space-y-4">
                    { instructors.map((instructor: Instructor, index: number) => (
                        <InstructorCard key={ instructor.slug || index } instructor={ instructor } index={ index } />
                    )) }
                </div>
            ) : (
                <DefaultInstructorCard />
            ) }
        </section>
    );
};

export default InstructorsSection;
