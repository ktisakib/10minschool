import Image from "next/image";

interface Instructor {
    slug?: string;
    name: string;
    image?: string;
    short_description?: string;
    description?: string;
}

const InstructorCard = ({ instructor, index }: { instructor: Instructor; index: number }) => (
    <div key={ instructor.slug || index } className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
        <div className="flex-shrink-0">
            { instructor.image ? (
                <Image
                    src={ instructor.image }
                    alt={ instructor.name }
                    width={ 80 }
                    height={ 80 }
                    className="rounded-full object-cover"
                />
            ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-2xl">👨‍🏫</span>
                </div>
            ) }
        </div>

        <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{ instructor.name }</h3>
            { instructor.short_description && (
                <p className="text-sm text-gray-600 mb-2">{ instructor.short_description }</p>
            ) }
            { instructor.description && (
                <div
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={ { __html: instructor.description } }
                />
            ) }
        </div>
    </div>
);

export default InstructorCard;
