import React from "react";
import Link from "next/link";
import { Star, Clock, FileText } from "lucide-react";

interface OnlineCourse {
    title: string;
    rating: string;
    reviewsCount: string;
    image: string;
    slug: string;
    videos?: string;
    notes?: string;
}

const COURSES: OnlineCourse[] = [
    {
        title: "IELTS Course by Munzereen Shahid",
        rating: "৪.৯",
        reviewsCount: "৮২০",
        image: "https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_16_9.png",
        slug: "ielts-course",
        videos: "১৫০+ ভিডিও",
        notes: "১২০+ নোটস"
    },
    {
        title: "ঘরে বসে Spoken English",
        rating: "৪.৮",
        reviewsCount: "১৮৫০",
        image: "https://cdn.10minuteschool.com/images/thumbnails/skills/ghore-boshe-Spoken-English-course-thumbnail-by-Munzereen-Shahid-16x9.jpg",
        slug: "spoken-english",
        videos: "৮০+ ভিডিও",
        notes: "১০০+ কুইজ"
    },
    {
        title: "IELTS LIVE Batch",
        rating: "৪.৯",
        reviewsCount: "৪৩০",
        image: "https://cdn.10minuteschool.com/images/thumbnails/batch-12-ielts-live-batch-sqrt-thumbnails.jpg",
        slug: "ielts-live-batch",
        videos: "৪০+ লাইভ ক্লাস",
        notes: "২০+ মক টেস্ট"
    },
    {
        title: "Complete English Grammar Course",
        rating: "৪.৭",
        reviewsCount: "৬১০",
        image: "https://cdn.10minuteschool.com/images/thumbnails/complete-grammar-course-thumbnail.jpg",
        slug: "complete-english-grammar-course",
        videos: "৬০+ ভিডিও",
        notes: "৮০+ প্র্যাকটিস"
    },
    {
        title: "English Communication for Professionals",
        rating: "৪.৮",
        reviewsCount: "৩৫০",
        image: "https://cdn.10minuteschool.com/images/thumbnails/english-communication-for-professionals/english-communication-for-professsionals-course-thumbnail---16x9.jpg",
        slug: "english-communication-for-professionals",
        videos: "৫০+ ভিডিও",
        notes: "৪০+ টেমপ্লেট"
    },
    {
        title: "IELTS Reading & Listening Mock Tests",
        rating: "৪.৭",
        reviewsCount: "২৪০",
        image: "https://cdn.10minuteschool.com/images/Thumbnails/IELTS-Listening-Reading-Mock-Tests-Course-Thumbnail_discount-30_16_9.jpg",
        slug: "ielts-listening-reading-mock-tests",
        videos: "১৫+ ফুল মক",
        notes: "রিয়েলটাইম ফিডব্যাক"
    }
];

export default function OnlineEnglishSection() {
    return (
        <section className="w-full bg-black text-white py-16 md:py-24 px-4 relative">
            {/* Soft backdrop radial light */}
            <div className="absolute left-1/3 top-1/3 w-[500px] h-[500px] bg-green-950/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                {/* Title */}
                <div className="mb-10 text-left border-l-4 border-[#1CAB55] pl-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-white">
                        ঘরে বসে অনলাইনেও ইংরেজি শেখা চলুক নিরবচ্ছিন্ন
                    </h2>
                    <p className="text-xs md:text-sm text-white/50 mt-1">
                        ভিডিও লেকচার, লাইভ সাপোর্ট ও অনুশীলনের মাধ্যমে যেকোনো সময়, যেকোনো স্থান থেকে ইংরেজি শিখুন
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COURSES.map((course, i) => (
                        <Link 
                            key={i} 
                            href={`/product/${course.slug}`}
                            className="group flex flex-col bg-[#111] border border-white/5 hover:border-white/15 hover:bg-white/[0.02] rounded-[24px] overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[#1CAB55]/5"
                        >
                            {/* Course Image Wrapper */}
                            <div className="w-full aspect-[16/9] overflow-hidden relative bg-white/5">
                                <img 
                                    src={course.image} 
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                />
                                
                                {/* Top badges overlay */}
                                {(course.videos || course.notes) && (
                                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
                                        {course.videos && (
                                            <span className="flex items-center gap-1 text-[10px] md:text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-2 py-1 rounded-md">
                                                <Clock className="w-3 h-3 text-[#1CAB55]" />
                                                {course.videos}
                                            </span>
                                        )}
                                        {course.notes && (
                                            <span className="flex items-center gap-1 text-[10px] md:text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-2 py-1 rounded-md">
                                                <FileText className="w-3 h-3 text-[#1CAB55]" />
                                                {course.notes}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="p-5 flex flex-col justify-between flex-grow gap-4 text-left">
                                <h3 className="font-semibold text-base md:text-lg text-white/95 group-hover:text-[#1CAB55] transition-colors line-clamp-2 min-h-[48px] leading-snug">
                                    {course.title}
                                </h3>

                                {/* Bottom stats and action */}
                                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex items-center gap-0.5 text-amber-400">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="text-sm font-bold text-white">{course.rating}</span>
                                        </div>
                                        <span className="text-xs text-white/40">({course.reviewsCount}+ রিভিউ)</span>
                                    </div>
                                    
                                    <span className="text-xs font-semibold text-[#1CAB55] group-hover:text-white group-hover:bg-[#1CAB55] border border-[#1CAB55] rounded-full px-3.5 py-1.5 transition-all duration-300">
                                        কোর্স দেখুন
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
