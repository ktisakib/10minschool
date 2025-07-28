import { CheckIcon } from "lucide-react";

export interface Pointer {
    color: string;
    icon: string;
    id: string;
    text: string;
}

interface PointersSectionProps {
    title: string;
    pointers: Pointer[];
    bgColor?: string;
    className?: string;
}

export default function PointersSection({
    title,
    pointers,
    bgColor,
    className = ""
}: PointersSectionProps) {
    if (pointers.length === 0) {
        return null;
    }

    return (
        <section
            id="pointers"
            className={ `mt-16 px-4 ${className}` }
            style={ bgColor ? { backgroundColor: bgColor } : undefined }
        >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{ title }</h2>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    { pointers.map((pointer) => (
                        <div
                            key={ pointer.id }
                            className="flex items-start gap-3"
                        >
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <CheckIcon className="w-3 h-3 text-white" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <p
                                    className="text-sm leading-relaxed text-gray-700"
                                    style={ pointer.color !== 'black' ? { color: pointer.color } : undefined }
                                >
                                    { pointer.text }
                                </p>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </section>
    );
}
