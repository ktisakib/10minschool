import Image from "next/image";

export interface GroupJoinEngagement {
    background: {
        image: string;
        primary_color: string;
        secondary_color: string;
    };
    cta: {
        clicked_url: string;
        color: string;
        text: string;
    };
    description: string;
    description_color: string;
    id: string;
    thumbnail: string;
    title: string;
    title_color: string;
    top_left_icon_img: string;
}

interface GroupJoinEngagementSectionProps {
    engagements: GroupJoinEngagement[];
    className?: string;
}

export default function GroupJoinEngagementSection({
    engagements,
    className = ""
}: GroupJoinEngagementSectionProps) {
    if (engagements.length === 0) {
        return null;
    }

    return (
        <section
            id="group-join-engagement"
            className={ `mt-16 px-4 ${className}` }
        >
            <div className="space-y-4">
                { engagements.map((engagement) => (
                    <div
                        key={ engagement.id }
                        className="relative rounded-xl overflow-hidden min-h-[200px]"
                        style={ {
                            background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
                        } }
                    >
                        {/* Background image overlay */ }
                        { engagement.background.image && (
                            <div
                                className="absolute inset-0 opacity-20"
                                style={ {
                                    backgroundImage: `url(${engagement.background.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                } }
                            />
                        ) }

                        <div className="relative p-6 flex items-center gap-6 min-h-[200px]">
                            {/* Left Content */ }
                            <div className="flex-1">
                                {/* Top left icon */ }
                                { engagement.top_left_icon_img && (
                                    <div className="mb-4">
                                        <Image
                                            src={ engagement.top_left_icon_img }
                                            alt="Free PDF"
                                            width={ 120 }
                                            height={ 50 }
                                            className="object-contain"
                                        />
                                    </div>
                                ) }

                                {/* Title */ }
                                <h3
                                    className="text-2xl font-bold mb-3"
                                    style={ { color: engagement.title_color } }
                                >
                                    { engagement.title }
                                </h3>

                                {/* Description */ }
                                <p
                                    className="text-base mb-6 leading-relaxed max-w-md"
                                    style={ { color: engagement.description_color } }
                                >
                                    { engagement.description }
                                </p>

                                {/* CTA Button */ }
                                <a
                                    href={ engagement.cta.clicked_url }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
                                    style={ engagement.cta.color ? { backgroundColor: engagement.cta.color } : undefined }
                                >
                                    { engagement.cta.text }
                                </a>
                            </div>

                            {/* Right Thumbnail */ }
                            <div className="flex-shrink-0 hidden md:block">
                                <div className="relative w-56 h-40 rounded-lg overflow-hidden shadow-xl">
                                    <Image
                                        src={ engagement.thumbnail }
                                        alt={ engagement.title }
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </section>
    );
}
