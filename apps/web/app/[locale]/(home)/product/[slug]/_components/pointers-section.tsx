import { CheckIcon } from "lucide-react";

export interface Pointer {
    color: string;
    icon: string;
    id: string;
    text: string;
}


export default function PointersSection({
    pointers,

}: {

    pointers: Pointer[];

}) {
    if (pointers.length === 0) {
        return null;
    }

    return (

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

    );
}
