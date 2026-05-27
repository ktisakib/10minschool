import React from "react";

const GALLERY_IMAGES = [
    {
        url: "https://cdn.10minuteschool.com/images/banners/Thumbnail_%281%29_1763641112558.jpg",
        title: "লাইভ সেমিনার",
        className: "md:col-span-2 md:row-span-2"
    },
    {
        url: "https://cdn.10minuteschool.com/images/banners/Middle_Frame_1763649681448.jpg",
        title: "অফলাইন এক্সাম হল",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        url: "https://cdn.10minuteschool.com/images/banners/End_Frame_1763641249386.jpg",
        title: "অ্যাওয়ার্ড সিরিমনি",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        url: "https://cdn.10minuteschool.com/images/banners/Start_Frame_1763641447080.jpg",
        title: "ক্লাসরুম অ্যাক্টিভিটি",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        url: "https://cdn.10minuteschool.com/images/banners/End_Frame_%281%29_1763641651144.jpg",
        title: "টিচার্স প্যানেল মিট",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        url: "https://cdn.10minuteschool.com/images/banners/Middle_Frame_%283%29_1771221777403.jpg",
        title: "স্কুল আউটিং ক্যাম্প",
        className: "md:col-span-2 md:row-span-1"
    },
    {
        url: "https://cdn.10minuteschool.com/images/banners/End_Frame_%284%29_1771221885538.jpg",
        title: "সাফল্যের আনন্দ",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        url: "https://cdn.10minuteschool.com/images/banners/End_Frame_%282%29_1763641787732.jpg",
        title: "উজ্জ্বল ভবিষ্যৎ",
        className: "md:col-span-1 md:row-span-1"
    }
];

export default function GallerySection() {
    return (
        <section className="w-full bg-[#030303] text-white py-16 md:py-24 px-4 relative overflow-hidden">
            {/* Ambient light overlay */}
            <div className="absolute right-0 bottom-1/3 w-[300px] h-[300px] bg-red-950/10 rounded-full blur-[90px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                {/* Title */}
                <div className="text-center mb-16">
                    <span className="text-xs md:text-sm font-bold text-[#1CAB55] uppercase tracking-wider bg-[#1CAB55]/10 px-3 py-1.5 rounded-full inline-block mb-3">
                        আমাদের সাফল্য গাঁথা
                    </span>
                    <h2 className="text-2xl md:text-[40px] font-bold text-white mb-4 leading-tight">
                        আর শেখার সেই পথেই গড়ে উঠছে আত্মবিশ্বাসী সফল প্রজন্ম
                    </h2>
                    <p className="text-xs md:text-base text-white/50 max-w-[650px] mx-auto">
                        ১০ মিনিট স্কুলের হাত ধরে লক্ষাধিক ছাত্রছাত্রী তাদের কাঙ্ক্ষিত লক্ষ্যে পৌঁছেছে এবং অর্জন করেছে গৌরবময় সাফল্য।
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px] md:auto-rows-[180px]">
                    {GALLERY_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            className={`group relative rounded-[24px] overflow-hidden border border-white/5 bg-white/5 transition-all duration-500 hover:scale-[1.01] hover:border-white/15 hover:shadow-2xl hover:shadow-black ${img.className}`}
                        >
                            {/* Image */}
                            <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

                            {/* Caption info */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="font-bold text-sm md:text-base text-white/95 leading-tight">
                                    {img.title}
                                </h3>
                                <span className="text-[10px] text-white/40 hidden md:block">
                                    10MS Community
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
