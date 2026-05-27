"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Calendar, BookOpen, GraduationCap } from "lucide-react";

interface BatchItem {
    title: string;
    subTitle: string;
    image: string;
    slug: string;
    price: string;
    originalPrice: string;
    features: string[];
    badge?: string;
}

interface BatchTab {
    id: string;
    label: string;
    title: string;
    items: BatchItem[];
}

const TABS: BatchTab[] = [
    {
        id: "middle",
        label: "ক্লাস ৬ - ৮",
        title: "ক্লাস ৬-৮ অনলাইন ব্যাচ ২০২৬",
        items: [
            {
                title: "অষ্টম শ্রেণি অনলাইন ব্যাচ ২০২৬",
                subTitle: "নতুন কারিকুলামে বিজ্ঞান ও গণিতে সেরা প্রস্তুতি",
                image: "https://cdn.10minuteschool.com/images/banners/SCR-20251120-racr_1763645563255.jpeg?w=480&h=260&q=70",
                slug: "class-8-online-batch-2026",
                price: "৪৫০০ ৳",
                originalPrice: "৬০০০ ৳",
                features: ["প্রতিদিন লাইভ ক্লাস", "অধ্যায়ভিত্তিক লেকচার শিট", "ডাউট সলভিং সেশন"],
                badge: "ভর্তি চলছে"
            },
            {
                title: "সপ্তম শ্রেণি অনলাইন ব্যাচ ২০২৬",
                subTitle: "নতুন শিখন পদ্ধতিতে মেধা বিকাশের কমপ্লিট সলিউশন",
                image: "https://cdn.10minuteschool.com/images/banners/SCR-20251120-raul_1763645649501.jpeg?w=480&h=260&q=70",
                slug: "class-7-online-batch-2026",
                price: "৪৫০০ ৳",
                originalPrice: "৬০০০ ৳",
                features: ["সহজ ভাষায় বেসিক ক্লিয়ার", "সাপ্তাহিক মূল্যায়ন পরীক্ষা", "হোমওয়ার্ক ফিডব্যাক"],
                badge: "ভর্তি চলছে"
            },
            {
                title: "ষষ্ঠ শ্রেণি অনলাইন ব্যাচ ২০২৬",
                subTitle: "মজা ও আনন্দের মাধ্যমে পড়াশোনার মজবুত ভিত্তি",
                image: "https://cdn.10minuteschool.com/images/banners/SCR-20251120-rbnb_1763645775846.jpeg?w=480&h=260&q=70",
                slug: "class-6-online-batch-2026",
                price: "৪৫০০ ৳",
                originalPrice: "৬০০০ ৳",
                features: ["ভিজ্যুয়াল লার্নিং কন্টেন্ট", "২৪/৭ ডাউট সলভ সাপোর্ট", "অভিভাবক মিটিং"],
                badge: "ভর্তি চলছে"
            }
        ]
    },
    {
        id: "ssc",
        label: "এসএসসি ব্যাচ",
        title: "এসএসসি অনলাইন ব্যাচ",
        items: [
            {
                title: "নবম শ্রেণি অনলাইন ব্যাচ (এসএসসি ২০২৮)",
                subTitle: "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখার সেরা গাইডলাইন",
                image: "https://cdn.10minuteschool.com/images/banners/SCR-20251120-rude_1763648936301.jpeg?w=480&h=260&q=70",
                slug: "test-by-sqa-class-9-online-batch-2026-science-ssc-28",
                price: "৫০০০ ৳",
                originalPrice: "৭০০০ ৳",
                features: ["ফুল সিলেবাস কভারেজ", "অধ্যায়ভিত্তিক লাইভ এমসিকিউ", "অধ্যায়ভিত্তিক সাজেশন্স"],
                badge: "২০২৬ ব্যাচ"
            },
            {
                title: "দশম শ্রেণি অনলাইন ব্যাচ (এসএসসি ২০২৭)",
                subTitle: "বোর্ড পরীক্ষার পূর্ণাঙ্গ রোডম্যাপ ও গোছানো প্রস্তুতি",
                image: "https://cdn.10minuteschool.com/images/banners/SCR-20251120-rxlq_1763649500924.jpeg?w=480&h=260&q=70",
                slug: "ssc-28-science-online-batch",
                price: "৫০০০ ৳",
                originalPrice: "৭০০০ ৳",
                features: ["বোর্ড প্রশ্ন এনালাইসিস ক্লাস", "টেস্ট পেপার সলিউশন", "পূর্ণাঙ্গ মডেল টেস্ট"],
                badge: "ভর্তি চলছে"
            },
            {
                title: "দশম শ্রেণি স্পেশাল ব্যাচ (এসএসসি ২০২৬)",
                subTitle: "শেষ মুহূর্তের চূড়ান্ত সিলেবাস রিভিশন ও প্র্যাকটিস",
                image: "https://cdn.10minuteschool.com/images/banners/SCR-20251120-rdas_1763646032056.jpeg?w=480&h=260&q=70",
                slug: "ssc-28-higher-math-online-batch",
                price: "৪০০০ ৳",
                originalPrice: "৬০০০ ৳",
                features: ["মেগা রিভিশন ক্লাস", "বিগত বছরের প্রশ্ন সলভ", "লাইভ এক্সাম এক্সপেরিয়েন্স"],
                badge: "রিভিশন ব্যাচ"
            }
        ]
    },
    {
        id: "hsc",
        label: "এইচএসসি ও এডমিশন",
        title: "এইচএসসি ও ভর্তি প্রস্তুতি অনলাইন ব্যাচ",
        items: [
            {
                title: "এইচএসসি ২০২৭ অনলাইন ব্যাচ",
                subTitle: "কলেজে পা রেখেই জিপিএ-৫ নিশ্চিত করার পূর্ণাঙ্গ লাইভ কোর্স",
                image: "https://cdn.10minuteschool.com/images/banners/Rectangle_83_1764073095439.png?w=480&h=260&q=70",
                slug: "hsc-28-basic-building-course",
                price: "৬০০০ ৳",
                originalPrice: "৮৫ ৳",
                features: ["পদার্থ, রসায়ন, গণিত ও জীববিজ্ঞান", "ইন্টারেক্টিভ নোটস ও প্র্যাকটিস শিট", "১-১ টেলিগ্রাম ডাউট সলভ"],
                badge: "বেসিক টু এডভান্স"
            },
            {
                title: "এইচএসসি ২০২৬ অনলাইন ব্যাচ",
                subTitle: "একাডেমিক রিভিশন ক্লাস ও টেস্ট পেপার সলভ সেশন",
                image: "https://cdn.10minuteschool.com/images/banners/10-MS-Cover-Photo-Website-Version_1771230994077.jpg?w=480&h=260&q=70",
                slug: "hsc-2026-final-revision-live-course",
                price: "৫৫০০ ৳",
                originalPrice: "৭৫০০ ৳",
                features: ["বোর্ড স্ট্যান্ডার্ড পূর্ণাঙ্গ প্রস্তুতি", "সৃজনশীল প্রশ্ন লেখার গোছানো টেকনিক", "মডেল টেস্ট ও এক্সপার্ট ফিডব্যাক"],
                badge: "ভর্তি চলছে"
            },
            {
                title: "বিশ্ববিদ্যালয় ভর্তি পরীক্ষা ২০২৫ প্রস্তুতি ব্যাচ",
                subTitle: "ঢাকা বিশ্ববিদ্যালয় ও বুয়েট এডমিশন টেস্টের ১০০% গাইডলাইন",
                image: "https://cdn.10minuteschool.com/images/banners/image_821_1764073118585.png?w=480&h=260&q=70",
                slug: "hsc-28-sesh-muhurter-prostuti-science",
                price: "৭৫০০ ৳",
                originalPrice: "১০০০০ ৳",
                features: ["এডমিশন স্ট্যান্ডার্ড হ্যাকস ও শর্টকাট", "ডেইলি লাইভ এক্সাম ও র‍্যাংক লিস্ট", "বিগত ২০ বছরের কোশ্চেন সলভ"],
                badge: "এডমিশন স্পেশাল"
            }
        ]
    }
];

export default function OnlineBatchesSection() {
    const [activeTab, setActiveTab] = useState("middle");
    const currentTab = (TABS.find((t) => t.id === activeTab) || TABS[0]) as BatchTab;

    return (
        <section className="w-full bg-[#050505] text-white py-16 md:py-24 px-4 relative">
            <div className="absolute right-10 top-10 w-[300px] h-[300px] bg-green-950/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                {/* Title */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-[40px] font-bold text-white mb-4">
                        দেশসেরা সকল অনলাইন ব্যাচ
                    </h2>
                    <p className="text-sm md:text-base text-white/50 max-w-[650px] mx-auto">
                        স্কুল-কলেজের পরীক্ষা থেকে বিশ্ববিদ্যালয় ভর্তি পরীক্ষা - সব প্রস্তুতির সমাধান মিলবে এক জায়গায়।
                    </p>
                </div>

                {/* Tabs Selector Buttons */}
                <div className="flex justify-center mb-12">
                    <div className="flex bg-[#111] p-1.5 rounded-full border border-white/5 max-w-full overflow-x-auto scrollbar-hide">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? "bg-[#149353] text-white shadow-lg shadow-green-900/20"
                                        : "text-white/60 hover:text-white"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Tab Subtitle */}
                <div className="mb-8 text-left border-l-4 border-[#149353] pl-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                        {currentTab.title}
                    </h3>
                </div>

                {/* Batches Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentTab.items.map((item, index) => (
                        <div
                            key={index}
                            className="group flex flex-col bg-[#111] border border-white/5 hover:border-white/15 rounded-[24px] overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-black"
                        >
                            {/* Card Image */}
                            <div className="w-full aspect-[1.85] overflow-hidden relative bg-white/5">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                />
                                {item.badge && (
                                    <span className="absolute top-4 left-4 z-20 text-[10px] md:text-xs font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 px-3 py-1 rounded-md shadow-md animate-pulse">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex flex-col flex-grow text-left gap-4">
                                <div>
                                    <h4 className="font-bold text-lg md:text-xl text-white/95 group-hover:text-[#1CAB55] transition-colors leading-tight mb-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs md:text-sm text-white/50 leading-relaxed line-clamp-2">
                                        {item.subTitle}
                                    </p>
                                </div>

                                {/* Features List */}
                                <ul className="flex flex-col gap-2 my-2 border-t border-b border-white/5 py-4 flex-grow">
                                    {item.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-white/70">
                                            <Sparkles className="w-4 h-4 text-[#149353] flex-shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Price and Action */}
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/40 line-through leading-none">{item.originalPrice}</span>
                                        <span className="text-xl font-extrabold text-[#1CAB55] leading-none mt-1">{item.price}</span>
                                    </div>

                                    <Link
                                        href={`/product/${item.slug}`}
                                        className="bg-[#149353] hover:bg-[#1CAB55] text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105"
                                    >
                                        ভর্তি হোন
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
