"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Clock, Users, CheckCircle, PhoneCall, Sparkles } from "lucide-react";
import productsDataRaw from "@/lib/data/products.json";

interface PageProps {
    params: Promise<{
        batch: string;
        locale: string;
    }>;
}

interface ProductItem {
    title: string;
    slug: string;
    priceText: string;
    thumbnail: string;
}

interface GroupSection {
    title: string;
    slug: string;
    products: ProductItem[];
}

export default function SSCBatchPage({ params }: PageProps) {
    const { batch } = React.use(params);
    const [activeSubTab, setActiveSubTab] = useState("all");

    // Validate batch
    const validBatches = ["ssc-27", "ssc-28"];
    if (!validBatches.includes(batch)) {
        notFound();
    }

    // Get display title
    let displayTitle = "";
    if (batch === "ssc-27") {
        displayTitle = "দশম শ্রেণি অনলাইন ব্যাচ (এসএসসি ২০২৭)";
    } else {
        displayTitle = "নবম শ্রেণি অনলাইন ব্যাচ (এসএসসি ২০২৮)";
    }

    // Parse products list
    const list = productsDataRaw.data.products;
    const allProducts: ProductItem[] = [];

    list.forEach((p: any) => {
        const title = p.title || "";
        const slug = p.slug || "";
        const priceText = p.price_details ? p.price_details.text : "";
        const thumbnail = p.media ? (p.media.find((m: any) => m.name === "thumbnail" || m.name === "sqr_img") || {}).resource_value : "";
        
        // Match condition
        const matchSsc27 = batch === "ssc-27" && (slug.includes("ssc-27") || title.includes("ssc-27") || slug.includes("class-10") || title.includes("দশম") || title.includes("Class 10"));
        const matchSsc28 = batch === "ssc-28" && (slug.includes("ssc-28") || title.includes("ssc-28") || slug.includes("class-9") || title.includes("৯ম") || title.includes("Class 9"));

        if (matchSsc27 || matchSsc28) {
            allProducts.push({ title, slug, priceText, thumbnail });
        }
    });

    // Group products
    const groups: GroupSection[] = [
        {
            title: "বিজ্ঞান বিভাগ",
            slug: "science",
            products: allProducts.filter(p => p.slug.includes("science") || p.title.includes("বিজ্ঞান") || p.title.includes("পদার্থ") || p.title.includes("রসায়ন") || p.title.includes("গণিত") || p.title.includes("জীববিজ্ঞান") || p.title.includes("Physics") || p.title.includes("Chemistry") || p.title.includes("Math") || p.title.includes("Biology"))
        },
        {
            title: "ব্যবসায় শিক্ষা বিভাগ",
            slug: "business-studies",
            products: allProducts.filter(p => p.slug.includes("business") || p.title.includes("ব্যবসায়") || p.title.includes("হিসাব") || p.title.includes("ফিন্যান্স") || p.title.includes("Accounting") || p.title.includes("Finance"))
        },
        {
            title: "মানবিক বিভাগ",
            slug: "humanities",
            products: allProducts.filter(p => p.slug.includes("humanities") || p.title.includes("মানবিক") || p.title.includes("ভূগোল") || p.title.includes("অর্থনীতি") || p.title.includes("Geography") || p.title.includes("Economics"))
        }
    ];

    // Filter groups based on sub tab selection
    const activeGroups = activeSubTab === "all" 
        ? groups.filter(g => g.products.length > 0)
        : groups.filter(g => g.slug === activeSubTab && g.products.length > 0);

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
                        <span className="text-sm font-extrabold text-[#EF7C7C] tracking-wider uppercase">SSC Programme</span>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            {displayTitle}
                        </h1>
                        <p className="text-sm md:text-lg text-white/60 max-w-[650px] mx-auto">
                            নতুন শিক্ষাক্রমের আলোকে এসএসসি পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি ও এ-প্লাস নিশ্চিত করার সম্পূর্ণ রোডম্যাপ
                        </p>
                    </div>

                    {/* Batch Toggle Buttons */}
                    <div className="flex justify-center">
                        <div className="text-white py-1.5 border border-white/10 rounded-full flex gap-1.5 justify-between items-center backdrop-blur-[17px] bg-white/[0.08] px-2 w-fit">
                            <Link 
                                href="/ssc/ssc-27" 
                                className={`px-5 py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 ${
                                    batch === "ssc-27" 
                                        ? "bg-[#149353] border border-black/10 shadow-lg text-white" 
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                SSC 27 (দশম)
                            </Link>
                            <Link 
                                href="/ssc/ssc-28" 
                                className={`px-5 py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 ${
                                    batch === "ssc-28" 
                                        ? "bg-[#149353] border border-black/10 shadow-lg text-white" 
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                SSC 28 (নবম)
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content grid area */}
            <div className="max-w-[1200px] mx-auto w-full px-4 mt-8">
                {/* Sub Tab Bar Selector */}
                <div className="mb-10 overflow-x-auto scrollbar-hide bg-white/[0.02] border border-white/5 rounded-2xl px-2 py-2 w-fit">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveSubTab("all")}
                            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                                activeSubTab === "all"
                                    ? "bg-[#149353] text-white shadow-md shadow-green-900/10"
                                    : "bg-transparent text-white/60 hover:text-white"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveSubTab("science")}
                            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                                activeSubTab === "science"
                                    ? "bg-[#149353] text-white shadow-md shadow-green-900/10"
                                    : "bg-transparent text-white/60 hover:text-white"
                            }`}
                        >
                            Science
                        </button>
                        <button
                            onClick={() => setActiveSubTab("business-studies")}
                            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                                activeSubTab === "business-studies"
                                    ? "bg-[#149353] text-white shadow-md shadow-green-900/10"
                                    : "bg-transparent text-white/60 hover:text-white"
                            }`}
                        >
                            Business Studies
                        </button>
                        <button
                            onClick={() => setActiveSubTab("humanities")}
                            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                                activeSubTab === "humanities"
                                    ? "bg-[#149353] text-white shadow-md shadow-green-900/10"
                                    : "bg-transparent text-white/60 hover:text-white"
                            }`}
                        >
                            Humanities
                        </button>
                    </div>
                </div>

                {/* Render Group Sections */}
                {activeGroups.length === 0 ? (
                    <div className="bg-white/[0.01] border border-white/5 rounded-[24px] p-16 text-center text-white/40">
                        এই ক্যাটাগরিতে কোনো লাইভ কোর্স বা সমাধান সামগ্রী এখন উপলব্ধ নেই।
                    </div>
                ) : (
                    <div className="space-y-16">
                        {activeGroups.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-6">
                                {/* Group Title Header */}
                                <div className="border-l-4 border-[#149353] pl-4 text-left">
                                    <h2 className="text-xl md:text-2xl font-black text-white">
                                        SSC {batch === "ssc-27" ? "২০২৭" : "২০২৮"} ({group.title})
                                    </h2>
                                </div>

                                {/* Group Course Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {group.products.map((course, i) => (
                                        <div
                                            key={i}
                                            className="group flex flex-col bg-[#111] border border-white/5 hover:border-white/15 rounded-[24px] overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl"
                                        >
                                            {/* Course image wrapper */}
                                            <div className="w-full aspect-[16/10] overflow-hidden relative bg-white/5">
                                                {course.thumbnail ? (
                                                    <img
                                                        src={course.thumbnail}
                                                        alt={course.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-indigo-950/20 to-purple-950/20 flex items-center justify-center">
                                                        <Sparkles className="w-10 h-10 text-[#149353] opacity-35" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Details body */}
                                            <div className="p-6 flex flex-col flex-grow justify-between text-left gap-4">
                                                <div>
                                                    <h3 className="font-extrabold text-base md:text-lg text-white group-hover:text-[#EF7C7C] transition-colors leading-tight mb-2 min-h-[44px] line-clamp-2">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-xs text-white/50 leading-relaxed">
                                                        এসএসসি পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি কভার করতে বিশেষ সেশন, সমাধান বই এবং সাপ্তাহিক পরীক্ষা।
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-white/40 uppercase">ফি / মূল্য</span>
                                                        <span 
                                                            className="text-base font-black text-[#1CAB55] mt-0.5"
                                                            dangerouslySetInnerHTML={{ __html: course.priceText || "Free" }}
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
                            </div>
                        ))}
                    </div>
                )}

                {/* FAQ Block */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6 md:p-10 mt-20 text-left">
                    <h3 className="text-xl md:text-2xl font-bold mb-6">সাধারণ কিছু প্রশ্ন ও উত্তর (FAQ)</h3>
                    <div className="space-y-6">
                        <div className="border-b border-white/5 pb-4">
                            <h4 className="font-bold text-sm md:text-base text-white mb-2">নতুন কারিকুলাম ও বোর্ড প্রশ্নের প্রস্তুতি কীভাবে হবে?</h4>
                            <p className="text-xs md:text-sm text-white/50 leading-relaxed">নতুন শিখন পদ্ধতি ও বোর্ড পরীক্ষার মূল্যায়ন নীতি অনুসরণ করে আমাদের ক্লাস কন্টেন্ট এবং সাপ্তাহিক কুইজগুলো তৈরি করা হয়েছে, যা মেধা বিকাশে ও বোর্ড পরীক্ষায় ভালো রেজাল্ট করতে সরাসরি সাহায্য করে।</p>
                        </div>
                        <div className="border-b border-white/5 pb-4">
                            <h4 className="font-bold text-sm md:text-base text-white mb-2">মাস্টারবুক ও বান্ডেল বইগুলো ডেলিভারি কীভাবে পাওয়া যাবে?</h4>
                            <p className="text-xs md:text-sm text-white/50 leading-relaxed">অর্ডার করার পর ৩-৫ কার্যদিবসের মধ্যে আপনার দেওয়া ডেলিভারি ঠিকানায় বইগুলো কুরিয়ার সার্ভিসের মাধ্যমে পৌঁছে দেওয়া হবে।</p>
                        </div>
                    </div>
                </div>

                {/* Contact CTA banner */}
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
