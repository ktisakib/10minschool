import React from "react";
import { PlayCircle, Clock, FileText, CheckCircle2, Users, Compass } from "lucide-react";

interface FeatureDetail {
    stat: string;
    subtext: string;
    description: string;
    icon: React.ReactNode;
}

const DETAILS: FeatureDetail[] = [
    {
        stat: "১০টি",
        subtext: "লাইভ ক্লাস প্রতিদিন",
        description: "ক্লাসে সরাসরি প্রশ্ন করার সুযোগ এবং টপিক ভিত্তিক পূর্ণাঙ্গ আলোচনা। দুজন শিক্ষকের সাহায্যে একইসাথে ক্লাস নেওয়া হয়।",
        icon: <PlayCircle className="w-8 h-8 text-[#149353]" />
    },
    {
        stat: "২ ঘণ্টা",
        subtext: "ডাউটসলভ সাপোর্ট",
        description: "ক্লাসের পরেও যেকোনো কঠিন প্রশ্নের সমাধান ও মেন্টরদের কাছ থেকে সরাসরি ডাউট ক্লিয়ারিং সাপোর্ট গ্রুপে নেওয়ার সুবিধা।",
        icon: <Clock className="w-8 h-8 text-[#149353]" />
    },
    {
        stat: "রেকর্ডেড",
        subtext: "ক্লাস ও পিডিএফ লেকচার শিট",
        description: "যেকোনো সময় রিভিশন দেওয়ার জন্য লাইভ ক্লাসের ফুল রেকর্ডিং ও আকর্ষণীয় সব প্র্যাকটিস মেটেরিয়াল প্ল্যাটফর্মে সেভ থাকে।",
        icon: <FileText className="w-8 h-8 text-[#149353]" />
    },
    {
        stat: "মূল্যায়ন",
        subtext: "পরীক্ষা ও কুইজ ফোরাম",
        description: "পরীক্ষার মাধ্যমে নিজের প্রগতি ও দুর্বলতা যাচাই করার নিয়মিত সুযোগ। লাইভ লিডারবোর্ডের মাধ্যমে নিজের অবস্থান দেখা যায়।",
        icon: <CheckCircle2 className="w-8 h-8 text-[#149353]" />
    },
    {
        stat: "১ - ১",
        subtext: "মেন্টরশিপ ও গাইডলাইন",
        description: "পড়াশোনার পাশাপাশি ক্যারিয়ার প্ল্যানিং এবং পড়াশোনার মানসিক চাপ দূর করতে লাইভ মেন্টরশিপ সেশন ও ওয়ান-টু-ওয়ান গাইডলাইন।",
        icon: <Users className="w-8 h-8 text-[#149353]" />
    },
    {
        stat: "রোডম্যাপ",
        subtext: "ওরিয়েন্টেশন সেশন",
        description: "কোর্স শুরুর প্রথম থেকেই গোছানো প্রিপারেশন নেওয়ার বিশেষ রোডম্যাপ এবং বোর্ড পরীক্ষা এনালাইসিস ক্লাস ও টিপস।",
        icon: <Compass className="w-8 h-8 text-[#149353]" />
    }
];

export default function FeaturesSection() {
    return (
        <section className="w-full bg-black text-white py-16 md:py-24 px-4 relative">
            {/* Background lighting */}
            <div className="absolute left-1/4 top-1/2 w-[550px] h-[550px] bg-green-950/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-[40px] font-bold text-white mb-4">
                        অনলাইন ব্যাচের শিক্ষার্থীরা পাচ্ছে
                    </h2>
                    <p className="text-sm md:text-base text-white/50 max-w-[650px] mx-auto">
                        আমাদের ব্যাচে যোগ দিলেই তোমরা পাবে পড়াশোনা এবং অনুশীলনের সেরা সব ফিচার ও সর্বোচ্চ সাপোর্ট।
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {DETAILS.map((detail, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start p-8 rounded-[32px] border border-white/5 bg-[#111]/70 hover:border-white/15 hover:bg-white/[0.02] transition-all duration-300 group hover:shadow-lg hover:shadow-green-950/5 text-left relative overflow-hidden"
                            style={{ boxShadow: "inset 0px 0px 24px rgba(255, 255, 255, 0.02)" }}
                        >
                            {/* Accent Glow on Hover */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#149353]/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Header row */}
                            <div className="flex items-center justify-between w-full mb-6">
                                <div className="p-3 rounded-2xl bg-white/[0.03] group-hover:bg-[#149353]/10 transition-colors duration-300">
                                    {detail.icon}
                                </div>
                                <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent group-hover:from-[#1CAB55] group-hover:to-emerald-300 transition-all duration-300">
                                    {detail.stat}
                                </span>
                            </div>
                            
                            {/* Subtext Title */}
                            <h3 className="font-bold text-lg md:text-xl text-white group-hover:text-[#1CAB55] transition-colors leading-tight mb-3">
                                {detail.subtext}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                                {detail.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
