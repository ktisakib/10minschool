import React from "react";
import { Users, MessagesSquare, CheckSquare } from "lucide-react";

interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    image: string;
}

const FEATURES: Feature[] = [
    {
        title: "দেশসেরা টিচারদের প্যানেল",
        description: "যেকোনো কঠিন বিষয়ও সহজে বোঝার জন্য ক্লাস নিবেন দেশের সেরা ও অভিজ্ঞ শিক্ষকবৃন্দ। জটিল টপিকগুলো সহজ উদাহরণ দিয়ে বুঝিয়ে দেওয়া হবে।",
        icon: <Users className="w-6 h-6" />,
        color: "from-blue-500/20 to-indigo-500/5",
        image: "https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/Group_2085664166_1763018342207.png"
    },
    {
        title: "1-1 Counselling & Live Support",
        description: "ক্লাস শেষে মেন্টরদের সাথে সরাসরি আলোচনার মাধ্যমে যেকোনো ডাউট বা সন্দেহ সমাধান করে নিন। এখানে আপনি একা নন, সবসময় আপনার পাশে আছি আমরা।",
        icon: <MessagesSquare className="w-6 h-6" />,
        color: "from-[#EF7C7C]/20 to-[#EF7C7C]/5",
        image: "https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/Group_1763017844889.svg"
    },
    {
        title: "কাজ করতে করতে শেখা",
        description: "বাস্তবসম্মত প্রজেক্ট, কুইজ ও হ্যান্ডস-অন অনুশীলনের মাধ্যমে তাত্ত্বিক বিষয়ের পাশাপাশি ব্যবহারিক দক্ষতায়ও সেরা হয়ে উঠুন সহজেই।",
        icon: <CheckSquare className="w-6 h-6" />,
        color: "from-[#1CAB55]/20 to-[#1CAB55]/5",
        image: "https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/Group_2085664139_1763876795176.svg"
    }
];

export default function SelfPacedSection() {
    return (
        <section className="w-full bg-[#030303] text-white py-16 md:py-24 px-4 relative overflow-hidden">
            {/* Ambient overlay */}
            <div className="absolute right-1/4 bottom-0 w-[450px] h-[450px] bg-indigo-950/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-[40px] font-bold text-white mb-4">
                        অনলাইনেই শেখা হোক নিজের গতিতে!
                    </h2>
                    <p className="text-xs md:text-base text-white/50 max-w-[600px] mx-auto">
                        আমাদের লার্নিং প্ল্যাটফর্ম ডিজাইন করা হয়েছে এমনভাবে যাতে আপনি নিজের সুবিধামতো সময়ে যেকোনো স্থান থেকে দক্ষতার সাথে শিখতে পারেন।
                    </p>
                </div>

                {/* Grid of features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {FEATURES.map((feature, i) => (
                        <div 
                            key={i}
                            className={`flex flex-col rounded-[32px] border border-white/10 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-8 hover:border-white/20 transition-all duration-300 group hover:shadow-xl hover:shadow-white/[0.01]`}
                        >
                            {/* Graphic Container */}
                            <div className="w-full h-48 flex items-center justify-center relative mb-6 rounded-2xl bg-white/[0.01] border border-white/5 overflow-hidden">
                                <img 
                                    src={feature.image} 
                                    alt={feature.title}
                                    className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Icon & Title */}
                            <div className="flex items-start gap-4 mb-3">
                                <div className="p-3 rounded-2xl bg-white/[0.04] text-[#1CAB55] group-hover:bg-[#1CAB55]/10 group-hover:text-white transition-colors duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-lg md:text-xl text-white/90 group-hover:text-[#1CAB55] transition-colors duration-300 text-left pt-2 leading-tight">
                                    {feature.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-white/50 leading-relaxed text-left pl-14">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
