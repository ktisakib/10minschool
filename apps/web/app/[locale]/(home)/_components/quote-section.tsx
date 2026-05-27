import React from "react";
import { Quote } from "lucide-react";

export default function QuoteSection() {
    return (
        <section className="w-full bg-black text-white py-16 px-4 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                <div 
                    className="rounded-[40px] border border-white/10 p-8 md:p-12 overflow-hidden bg-gradient-to-r from-[#120606] to-[#080202] relative"
                    style={{ boxShadow: "inset 0px 0px 32px rgba(255, 255, 255, 0.03)" }}
                >
                    {/* Background Quote watermark */}
                    <Quote className="absolute left-6 top-6 w-20 h-20 text-white/[0.01] pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        {/* Quote bubble text */}
                        <div className="md:col-span-8 flex flex-col text-left items-start gap-4">
                            <Quote className="w-8 h-8 text-[#149353] fill-[#149353]" />
                            <blockquote className="text-lg md:text-2xl font-bold text-white/90 leading-relaxed italic">
                                "১০ মিনিট স্কুলের মাধ্যমে আমি আমার বেসিক অনেক স্ট্রং করতে পেরেছি। প্রতিটি বিষয় ভিজ্যুয়াল অ্যানিমেশনের সাহায্যে যেভাবে পানির মতো পরিষ্কার করে পড়ানো হয়, তা পড়াশোনাকে আমার কাছে অনেক আনন্দের করে তুলেছে।"
                            </blockquote>
                            <div className="flex flex-col mt-2">
                                <cite className="not-italic font-extrabold text-base text-[#1CAB55]">
                                    — স্বীকৃতি দাস হৃদিকা
                                </cite>
                                <span className="text-xs text-white/40 mt-0.5">
                                    শিক্ষার্থী, অনলাইন ব্যাচ
                                </span>
                            </div>
                        </div>

                        {/* Graphic illustration */}
                        <div className="md:col-span-4 flex justify-center items-center">
                            <img 
                                src="https://cdn.10minuteschool.com/image/Group_2085664141_%281%29_1763892292257.svg" 
                                alt="Student success illustration" 
                                className="max-w-[85%] h-auto object-contain transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
