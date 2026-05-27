"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Clock, Users, CheckCircle, PhoneCall, Sparkles } from "lucide-react";
import productsDataRaw from "@/lib/data/products.json";

interface ProductItem {
    title: string;
    slug: string;
    priceText: string;
    thumbnail: string;
}

export default function Class8Page() {
    const list = productsDataRaw.data.products;
    const filteredProducts: ProductItem[] = [];

    list.forEach((p: any) => {
        const title = p.title || "";
        const slug = p.slug || "";
        const priceText = p.price_details ? p.price_details.text : "";
        const thumbnail = p.media ? (p.media.find((m: any) => m.name === "thumbnail" || m.name === "sqr_img") || {}).resource_value : "";
        
        // Match Class 8
        if (slug.includes("class-8") || title.includes("class-8") || title.includes("অষ্টম") || title.includes("Class 8")) {
            filteredProducts.push({ title, slug, priceText, thumbnail });
        }
    });

    return (
        <main className="w-full bg-[#030303] text-white min-h-screen relative overflow-hidden pb-20">
            {/* Top Gradient Header block */}
            <div className="py-12 md:py-20 relative overflow-hidden" style={{ background: "linear-gradient(to top, #000000 8.02%, #00192E 91.98%)" }}>
                {/* Back to Home Link */}
                <div className="max-w-[1200px] mx-auto w-full px-4 mb-6">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
                        <span className="text-sm">←</span> প্রধান পাতা
                    </Link>
                </div>

                <div className="max-w-[1200px] mx-auto w-full px-4 text-center space-y-6">
                    <div className="space-y-2">
                        <span className="text-sm font-extrabold text-[#EF7C7C] tracking-wider uppercase">Class 6-8 Programme</span>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            অষ্টম শ্রেণি অনলাইন ব্যাচ ও গাইডবুক
                        </h1>
                        <p className="text-sm md:text-lg text-white/60 max-w-[650px] mx-auto">
                            নতুন শিক্ষাক্রমের আলোকে বিষয়ভিত্তিক মজবুত ভিত্তি গড়ার সেরা গাইডলাইন
                        </p>
                    </div>

                    {/* Batch Toggle Buttons */}
                    <div className="flex justify-center">
                        <div className="text-white py-1.5 border border-white/10 rounded-full flex gap-1.5 justify-between items-center backdrop-blur-[17px] bg-white/[0.08] px-2 w-fit">
                            <Link 
                                href="/class-6" 
                                className="px-5 py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 text-white/60 hover:bg-white/5 hover:text-white"
                            >
                                Class 6
                            </Link>
                            <Link 
                                href="/class-7" 
                                className="px-5 py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 text-white/60 hover:bg-white/5 hover:text-white"
                            >
                                Class 7
                            </Link>
                            <Link 
                                href="/class-8" 
                                className="px-5 py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 bg-[#149353] border border-black/10 shadow-lg text-white"
                            >
                                Class 8
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course List Section */}
            <div className="max-w-[1200px] mx-auto w-full px-4 mt-8">
                <div className="mb-8 border-l-4 border-[#1CAB55] pl-4 text-left">
                    <h2 className="text-xl md:text-2xl font-extrabold text-white">
                        উপলব্ধ কোর্স ও বইসমূহ
                    </h2>
                    <p className="text-xs md:text-sm text-white/50 mt-1">
                        নতুন শিক্ষাবর্ষের সকল বিষয়ভিত্তিক কোর্স ও সহায়ক বইসমূহ
                    </p>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="bg-white/[0.02] border border-white/5 rounded-[24px] p-12 text-center text-white/50">
                        এই ক্লাসের কোনো কোর্স এখন উপলব্ধ নেই। শীঘ্রই কোর্সসমূহ যোগ করা হবে।
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredProducts.map((course, i) => (
                            <div
                                key={i}
                                className="group flex flex-col bg-[#111] border border-white/5 hover:border-white/15 rounded-[24px] overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl"
                            >
                                {/* Thumbnail */}
                                <div className="w-full aspect-[16/10] overflow-hidden relative bg-white/5">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-green-950/20 to-teal-950/20 flex items-center justify-center">
                                            <Sparkles className="w-10 h-10 text-[#1CAB55] opacity-35" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow justify-between text-left gap-4">
                                    <div>
                                        <h3 className="font-bold text-base md:text-lg text-white group-hover:text-[#1CAB55] transition-colors leading-tight mb-2 min-h-[44px] line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-xs text-white/50">
                                            সহজ ভাষায় বেসিক ক্লিয়ার ও সাপ্তাহিক মূল্যায়ন নিশ্চিত করতে অভিজ্ঞ শিক্ষকদের সেরা গাইড।
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-white/40 uppercase">ফি / মূল্য</span>
                                            <span 
                                                className="text-base font-black text-[#1CAB55] mt-0.5"
                                                dangerouslySetInnerHTML={{ __html: course.priceText || "ফ্রি" }}
                                            />
                                        </div>
                                        <Link
                                            href={`/product/${course.slug}`}
                                            className="bg-[#149353] hover:bg-[#1CAB55] text-white font-bold text-xs md:text-sm px-4.5 py-2.5 rounded-full transition-all hover:scale-105"
                                        >
                                            ভর্তি হোন
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Contact CTA */}
                <div className="rounded-[32px] bg-gradient-to-r from-[#120606] to-[#080202] border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left mt-16">
                    <div>
                        <h3 className="text-lg md:text-2xl font-extrabold mb-2">ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য কল করুন</h3>
                        <p className="text-xs md:text-sm text-white/50">সকাল ৯টা থেকে রাত ১১টা পর্যন্ত যেকোনো সময় আমাদের সাথে কথা বলতে পারেন</p>
                    </div>
                    <a 
                        href="tel:16910"
                        className="flex items-center gap-2 bg-[#149353] hover:bg-[#1CAB55] text-white px-7 py-3.5 rounded-full font-bold text-sm md:text-base transition-all hover:scale-105"
                    >
                        <PhoneCall className="w-4.5 h-4.5" />
                        ১৬৯১০ এ কল করুন
                    </a>
                </div>
            </div>
        </main>
    );
}
