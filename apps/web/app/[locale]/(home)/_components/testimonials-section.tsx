"use client";

import React, { useState } from "react";
import { Star, Play, X, Quote } from "lucide-react";

interface VideoTestimonial {
    name: string;
    location: string;
    image: string;
    gradient: string;
    videoId: string;
}

interface TextTestimonial {
    testimonial: string;
    name: string;
    location: string;
    image: string;
    gradient: string;
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
    {
        name: "মেহজাবিন",
        location: "শিক্ষার্থী, ১০ম শ্রেণি",
        image: "https://cdn.10minuteschool.com/images/banners/Thumbnail_%281%29_1763641112558.jpg",
        gradient: "linear-gradient(321.9deg, #09090C 1.98%, #2A2B4A 96.78%)",
        videoId: "xPgIpyx04bE"
    },
    {
        name: "সাবিহা এবং হাবিবা",
        location: "ঝাটিবেলাই সাদেক আলী উচ্চ বিদ্যালয়, সিরাজগঞ্জ",
        image: "https://cdn.10minuteschool.com/images/banners/Middle_Frame_1763649681448.jpg",
        gradient: "linear-gradient(321.9deg, #09090C 1.98%, #2A2B4A 96.78%)",
        videoId: "L9NFfsYHpJU"
    },
    {
        name: "আতকিয়া এবং তাসফিয়া",
        location: "বি এ এফ শাহীন কলেজ",
        image: "https://cdn.10minuteschool.com/images/banners/End_Frame_1763641249386.jpg",
        gradient: "linear-gradient(321.9deg, #09090C 1.98%, #2A2B4A 96.78%)",
        videoId: "owAIxAdc3oA"
    },
    {
        name: "জিসান",
        location: "গাজীপুর ক্যান্টমেন্ট পাবলিক স্কুল এন্ড কলেজ",
        image: "https://cdn.10minuteschool.com/images/banners/Start_Frame_1763641447080.jpg",
        gradient: "linear-gradient(321.9deg, #09090C 1.98%, #2A2B4A 96.78%)",
        videoId: "qiWVZ6uAxnU"
    }
];

const TEXT_TESTIMONIALS: TextTestimonial[] = [
    {
        testimonial: "টেন মিনিট স্কুলকে আমি অসংখ্য ধন্যবাদ জানাচ্ছি৷ আমি যখন ২০২৪ সালে ৮ম শ্রেনীতে উঠি তখন ছিলো নতুন কারিকুলাম৷ প্রায় অর্ধেক মাস এরকম অগোছালো কেটে গেছে৷৷ যখন পরীক্ষার সিদ্ধান্ত নেওয়া হয় এবং এতো বড় একটা সিলেবাস আমাদের ধরিয়ে দেওয়া হয় তখন আমার মতো প্রায় সবার অবস্হা একদম নাজেহাল৷ ঠিক ঐরকম মুহূর্তে 10 minute school নিয়ে আসে তাদের ফ্রি সাজেশন৷ যা আমাদের পরীক্ষার টেনশন একেবারেই দূর করে দেয়৷ এবং আপনাদের ফ্রি সাজেশন আমার পরীক্ষায় রেজাল্টে খুবই ইতিবাচক প্রভাব রেখেছে৷",
        name: "রেদোয়ান আহমেদ",
        location: "বীরশ্রেষ্ঠ নূর মোহাম্মদ পাবলিক কলেজ",
        image: "https://cdn.10minuteschool.com/images/banners/Boy_icon_1764599473176.png",
        gradient: "linear-gradient(321.9deg, #13060B 1.98%, #832F4D 96.78%)"
    },
    {
        testimonial: "আমি গত 4 বছর ধরে প্রথম স্থান অর্জন করে আসছি। এইবছরও আমি 9 থেকে 10এ উত্তীর্ণ হয়েছি প্রথম স্থান অর্জন করে। এর পেছনে টেন মিনিট স্কুলের অবদান অনেক ছিল। তাই আমি টেন মিনিট স্কুলকে অনেক অনেক ধন‍্যবাদ জানাচ্ছি। আসলে আমি 10 ms এর ফ্রি ক্লাস গুলো করে আসছি। আর এই ক্লাস গুলোই আমাকে inspire করেছে ভালো একটা স্থান অর্জন করার। এবং আমি এই বছর class 10 এর বিজ্ঞান বিভাগের কোর্স টিতে ভর্তি হয়েছি। and I hope কোর্সটি complete করে এসএসসি তে একটি ভালো রেজাল্ট অর্জন করতে পারব। আর আমি টেন মিনিট স্কুলকে আবারো ধন‍্যবাদ জানাচ্ছি। অসংখ‍্য ধন‍্যবাদ।",
        name: "পূজা রানী দাস",
        location: "The Roses Collectorate School, Habiganj",
        image: "https://cdn.10minuteschool.com/images/banners/Girl_icon_1764599503645.png",
        gradient: "linear-gradient(321.9deg, #061308 1.98%, #3D492A 96.78%)"
    },
    {
        testimonial: "টেন মিনিট স্কুল আমার পড়াশোনায় অনেক হেল্প করেছে। অনেক অভিজ্ঞ টিচারদের স্টাডি টিপস, আর তাদের ভালো করে পড়ানোর কারণে আমার বার্ষিক পরীক্ষার রেজাল্ট অনেক ভালো হয়েছে। থ্যাংক ইউ, টেন মিনিট স্কুল।",
        name: "জাহিদ আলম",
        location: "কমর আলী হাই স্কুল, নারায়ণগঞ্জ",
        image: "https://cdn.10minuteschool.com/images/banners/Boy_icon_1764599473176.png",
        gradient: "linear-gradient(321.9deg, #09090C 1.98%, #2A2B4A 96.78%)"
    },
    {
        testimonial: "আমি এবার স্কুলে ৫ সেকশন মিলিয়ে ফার্স্ট হয়েছি। বার্ষিক পরীক্ষার আগের মডেল টেস্টগুলো আর ফাইনাল রিভিশন ক্লাসগুলো আমার অনেক কাজে লেগেছে। থ্যাংক ইউ টেন মিনিট স্কুল।",
        name: "অমৃত সাহা",
        location: "ক্যান্টনমেন্ট পাবলিক স্কুল & কলেজ",
        image: "https://cdn.10minuteschool.com/images/banners/Boy_icon_1764599473176.png",
        gradient: "linear-gradient(321.9deg, #080B0A 1.98%, #2A4A3F 96.78%)"
    }
];

export default function TestimonialsSection() {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    return (
        <section className="w-full bg-[#030303] text-white py-16 md:py-24 px-4 relative overflow-hidden">
            {/* Ambient light effects */}
            <div className="absolute left-1/4 top-1/4 w-[400px] h-[400px] bg-green-950/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 md:w-6 h-5 md:h-6 fill-amber-400 text-amber-400 stroke-none" />
                        ))}
                    </div>
                    
                    <h2 className="text-[26px] md:text-[40px] font-bold text-white mb-4 leading-tight">
                        কেন আমরাই শিক্ষার্থী ও অভিভাবকদের প্রথম পছন্দ?
                    </h2>
                    <p className="text-xs md:text-base text-white/50 max-w-[650px] mx-auto">
                        শিক্ষার্থী ও অভিভাবকদের আস্থা আর ভালোবাসার কিছু বাস্তব গল্প ও তাদের অভিজ্ঞতা জেনে নিন।
                    </p>
                </div>

                {/* Video Testimonials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {VIDEO_TESTIMONIALS.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveVideoId(item.videoId)}
                            className="group relative aspect-[3/4] rounded-[24px] overflow-hidden border border-white/5 bg-white/5 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:shadow-2xl hover:shadow-black"
                        >
                            {/* Image Background */}
                            <img
                                src={item.image}
                                alt={`${item.name} video thumbnail`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                                    <Play className="w-5 h-5 text-red-500 fill-red-500 ml-0.5" />
                                </div>
                            </div>

                            {/* Name and Location Info at bottom */}
                            <div className="absolute bottom-5 left-5 right-5 text-left">
                                <h3 className="font-extrabold text-base md:text-lg text-white leading-tight">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-white/70 mt-1 line-clamp-1">
                                    {item.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Text Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {TEXT_TESTIMONIALS.map((item, i) => (
                        <div
                            key={i}
                            style={{ background: item.gradient }}
                            className="flex flex-col rounded-[24px] p-6 border border-white/5 hover:border-white/15 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl text-left justify-between"
                        >
                            {/* Quote icon at top */}
                            <div className="mb-4">
                                <Quote className="w-6 h-6 text-white/20" />
                            </div>

                            {/* Review Text */}
                            <p className="text-xs md:text-[13px] text-white/80 leading-relaxed italic mb-6 flex-grow">
                                "{item.testimonial}"
                            </p>

                            {/* User details at bottom */}
                            <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-auto">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 object-contain rounded-full bg-white/5 border border-white/10"
                                />
                                <div className="flex flex-col justify-center min-w-0">
                                    <h4 className="font-bold text-xs md:text-sm text-white truncate">
                                        {item.name}
                                    </h4>
                                    <p className="text-[10px] text-white/40 truncate mt-0.5">
                                        {item.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Player Modal */}
            {activeVideoId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
                    <div className="relative w-full max-w-[800px] aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <button
                            onClick={() => setActiveVideoId(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                            aria-label="Close video player"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
}

