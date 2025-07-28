import Image from "next/image";

export interface Feature {
    icon: string;
    id: string;
    subtitle: string;
    title: string;
}


export default function FeaturesSection({
    features
}: {
    features: Feature[];
}) {
    if (features.length === 0) {
        return null;
    }

    return (


            <div className="bg-[#1f2937] rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    { features.map((feature, index) => {
                        // Define colors for each feature

                        return (
                            <div
                                key={ feature.id }
                                className="flex items-start gap-4"
                            >
                                <div className="flex-shrink-0">
                                    <div className={ `w-12 h-12  rounded-full flex items-center justify-center` }>
                                        { feature.icon ? (
                                            <Image
                                                src={ feature.icon }
                                                alt={ feature.title }
                                                width={ 36 }
                                                height={ 36 }
                                                className=""
                                            />
                                        ) : (
                                            <span className="text-white text-lg">📚</span>
                                        ) }
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        { feature.title }
                                    </h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        { feature.subtitle }
                                    </p>
                                </div>
                            </div>
                        );
                    }) }
                </div>
            </div>

    );
}
