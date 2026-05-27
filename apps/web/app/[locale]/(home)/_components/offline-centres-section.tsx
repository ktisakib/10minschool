import React from "react";
import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

interface Centre {
    name: string;
    address: string;
    mapUrl: string;
}

const CENTRES: Centre[] = [
    {
        name: "উত্তরা",
        address: "লিফট: ৮, হাউজ: ২, রোড: ৭, সেক্টর: ৩, উত্তরা, ঢাকা (রাজলক্ষী কমপ্লেক্সের পেছনে)",
        mapUrl: "https://www.google.com/maps/place/10+Minute+School+English+Centre+Uttara/@23.8645579,90.3963086,17z"
    },
    {
        name: "পান্থপথ",
        address: "লিফট: ২, হাউজ: ১৪৭/ এ/ ২, গ্রীন রোড, পান্থপথ, ঢাকা (পান্থপথ সিগন্যালের উত্তরে)",
        mapUrl: "https://www.google.com/maps?q=10+Minute+School+English+Centre,+Lift:+2,+House:+147/+A/+2,+Green+Road,+Panthapath,+Dhaka"
    },
    {
        name: "মিরপুর",
        address: "লিফট: ৭, প্লট: ১১৪, সেনপাড়া পর্বতা, মিরপুর- ১০, ঢাকা (মেট্রোরেল পিলার: ২৫৬)",
        mapUrl: "https://www.google.com/maps/place/10+Minute+School+English+Centre+Mirpur/@23.8044657,90.3693722,15z"
    },
    {
        name: "মগবাজার",
        address: "লিফট: ৩, প্লট: ২০৬, আউটার সার্কুলার রোড, মগবাজার, ঢাকা (মগবাজার মোড় সংলগ্ন)",
        mapUrl: "https://www.google.com/maps/place/10+Minute+School+English+Centre+Moghbazar/@23.7490976,90.4048202,17z"
    },
    {
        name: "চট্টগ্রাম",
        address: "লিফট: ৭, কদম মোবারক ম্যানশন, মোমিন রোড, জামালখান, চট্টগ্রাম",
        mapUrl: "#"
    }
];

interface OfflineCourse {
    title: string;
    rating: string;
    reviewsCount: string;
    image: string;
    slug: string;
}

const COURSES: OfflineCourse[] = [
    {
        title: "Kids' English",
        rating: "৪.৮",
        reviewsCount: "১৮৫",
        image: "https://cdn.10minuteschool.com/images/thumbnails/kids-english-sqrt-thumbnails-1.jpg",
        slug: "kids-english"
    },
    {
        title: "Spoken English Junior",
        rating: "৪.৯",
        reviewsCount: "২৪০",
        image: "https://cdn.10minuteschool.com/images/thumbnails/spoken-english-junior-new-sqr-thumbnail.jpg",
        slug: "spoken-english-junior"
    },
    {
        title: "After SSC English Course (Offline)",
        rating: "৪.৮",
        reviewsCount: "১২০",
        image: "https://cdn.10minuteschool.com/images/thumbnails/after-ssc-english-course-sqr-thumbnail-26.jpg",
        slug: "after-ssc-english-course-offline"
    },
    {
        title: "IELTS Programme",
        rating: "৪.৯",
        reviewsCount: "৩১০",
        image: "https://cdn.10minuteschool.com/images/thumbnails/ielts-programme-sqr-thumbnail.png",
        slug: "ielts-programme"
    },
    {
        title: "Study Abroad",
        rating: "৪.৭",
        reviewsCount: "৯৮",
        image: "https://cdn.10minuteschool.com/image/Study-Abroad-150_1755758870578.png",
        slug: "study-abroad"
    },
    {
        title: "Spoken English Course",
        rating: "৪.৮",
        reviewsCount: "৪৫০",
        image: "https://cdn.10minuteschool.com/images/thumbnails/spoken-english-senior-sqr-thumbnial.jpg",
        slug: "spoken-english-course"
    }
];

export default function OfflineCentresSection() {
    return (
        <section className="w-full bg-[#030303] text-white py-16 md:py-24 px-4 relative overflow-hidden">
            {/* Ambient Background Spotlight glow */}
            <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-red-950/15 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-amber-950/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                {/* Heading Panel */}
                <div className="text-center mb-12">
                    <h2 className="text-[26px] md:text-[45px] font-bold bg-gradient-to-r from-[#EF7C7C] via-[#F6BEBF] to-[#ECD79F] bg-clip-text text-transparent mb-4 leading-tight">
                        ক্লাসরুমে ইংরেজি শেখার নতুন আনন্দ
                    </h2>
                    <p className="text-sm md:text-lg text-white/60 max-w-[650px] mx-auto">
                        উন্নত কারিকুলাম, বাস্তবসম্মত অনুশীলন ও অভিজ্ঞ শিক্ষকদের সাথে সরাসরি ক্লাস করুন দেশজুড়ে আমাদের আধুনিক ইংলিশ সেন্টারগুলোতে।
                    </p>
                </div>

                {/* Centres Panel with Glassmorphism Card */}
                <div 
                    className="rounded-[36px] md:rounded-[48px] border border-white/10 p-6 md:p-10 mb-16 overflow-hidden bg-gradient-to-br from-[#120606]/85 to-[#0b0303]/85"
                    style={{ boxShadow: "inset 0px 0px 24px rgba(255, 255, 255, 0.05)" }}
                >
                    <div className="flex flex-col gap-8">
                        {/* Title of branches map */}
                        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                            <MapPin className="w-5 h-5 text-[#EF7C7C]" />
                            <h3 className="text-lg md:text-xl font-semibold text-white/90">
                                আমাদের অফলাইন সেন্টারসমূহ
                            </h3>
                        </div>

                        {/* Branches Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {CENTRES.map((centre, i) => (
                                <a 
                                    key={i} 
                                    href={centre.mapUrl}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex flex-col items-start p-5 gap-3 rounded-[20px] border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.03] group"
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="font-bold text-white text-base md:text-lg group-hover:text-[#EF7C7C] transition-colors">
                                            {centre.name}
                                        </h4>
                                        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                    <p className="text-xs text-white/50 leading-relaxed text-left line-clamp-4">
                                        {centre.address}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Offline Courses Grid Title */}
                <div className="mb-8 text-left border-l-4 border-[#EF7C7C] pl-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                        অফলাইন ইংলিশ কোর্সসমূহ
                    </h3>
                    <p className="text-xs md:text-sm text-white/50 mt-1">
                        নিজে এসে শিক্ষক ও সহপাঠীদের সাথে স্বতঃস্ফূর্ত পরিবেশে অংশ নিন
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {COURSES.map((course, i) => (
                        <Link 
                            key={i} 
                            href={`/product/${course.slug}`}
                            className="group flex flex-col bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-[20px] overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Course Image Wrapper */}
                            <div className="w-full aspect-square overflow-hidden relative bg-white/5">
                                <img 
                                    src={course.image} 
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                    <span className="text-[10px] md:text-xs font-semibold text-white bg-[#149353] px-2 py-1 rounded">
                                        বিস্তারিত দেখুন
                                    </span>
                                </div>
                            </div>

                            {/* Course Details */}
                            <div className="p-3 md:p-4 flex flex-col justify-between flex-grow gap-2 text-left">
                                <h4 className="font-semibold text-sm md:text-base text-white/90 group-hover:text-[#EF7C7C] transition-colors line-clamp-2 leading-tight min-h-[40px]">
                                    {course.title}
                                </h4>
                                
                                {/* Ratings */}
                                <div className="flex items-center gap-1.5 mt-auto">
                                    <div className="flex items-center gap-0.5 text-amber-400">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <span className="text-xs font-bold text-white">{course.rating}</span>
                                    </div>
                                    <span className="text-[10px] text-white/40">({course.reviewsCount}+ রিভিউ)</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Direct Contact Button */}
                <div className="flex justify-center mt-10">
                    <a 
                        href="tel:16910"
                        className="flex items-center gap-1.5 px-6 py-3 rounded-full text-white font-semibold text-sm md:text-base bg-[#149353] hover:bg-[#1CAB55] transition-all hover:scale-105 shadow-lg shadow-green-950/20"
                    >
                        সরাসরি যোগাযোগ করুন
                        <ArrowUpRight className="w-4.5 h-4.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
