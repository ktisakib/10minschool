import React from "react";
import { Star, Smartphone, ShieldAlert, WifiOff } from "lucide-react";

export default function AppSection() {
    return (
        <section className="w-full bg-[#050505] text-white py-16 md:py-24 px-4 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute right-1/4 bottom-1/4 w-[500px] h-[500px] bg-green-950/15 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                <div 
                    className="rounded-[40px] md:rounded-[56px] border border-white/10 p-8 md:p-16 overflow-hidden bg-gradient-to-br from-[#120606]/90 to-[#0b0303]/90 relative"
                    style={{ boxShadow: "inset 0px 0px 32px rgba(255, 255, 255, 0.05)" }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Text details */}
                        <div className="lg:col-span-7 flex flex-col text-left items-start gap-6">
                            <span className="text-xs md:text-sm font-bold text-[#1CAB55] uppercase tracking-wider bg-[#149353]/15 px-3.5 py-1.5 rounded-full inline-block">
                                ১০ এমএস মোবাইল অ্যাপ
                            </span>
                            
                            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                ডাউনলোড করুন আমাদের মোবাইল অ্যাপ, পড়া শুরু করুন আজ থেকেই
                            </h2>
                            
                            <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-[550px]">
                                পড়াশোনা এখন হাতের মুঠোয়! কুইজ খেলে, ভিডিও লেকচার দেখে ও বন্ধুদের সাথে গ্রুপ স্টাডি করে পরীক্ষার প্রস্তুতিকে করে তোলো আরও মজাদার ও সহজ।
                            </p>

                            {/* Features list bullet points */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full border-t border-b border-white/5 py-6 my-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/[0.03] rounded-xl text-[#149353]">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-white">একাডেমিক পড়াশোনা</span>
                                        <span className="text-[10px] text-white/40">ক্লাস ১-১২ সিলেবাস</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/[0.03] rounded-xl text-[#149353]">
                                        <ShieldAlert className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-white">24/7 ডাউটসলভ</span>
                                        <span className="text-[10px] text-white/40">২৪ ঘণ্টা সমাধান</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/[0.03] rounded-xl text-[#149353]">
                                        <WifiOff className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-white">ইন্টারনেট ছাড়াও</span>
                                        <span className="text-[10px] text-white/40">অফলাইন ডাউনলোড</span>
                                    </div>
                                </div>
                            </div>

                            {/* App Stats */}
                            <div className="flex items-center gap-8 mb-2">
                                <div className="flex flex-col">
                                    <span className="text-2xl md:text-3xl font-black text-white">১ কোটি+</span>
                                    <span className="text-xs text-white/40">ডাউনলোড</span>
                                </div>
                                <div className="h-8 w-px bg-white/10"></div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <span className="text-2xl md:text-3xl font-black text-white">৪.৫+</span>
                                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    </div>
                                    <span className="text-xs text-white/40">প্লে স্টোর রিভিউ</span>
                                </div>
                            </div>

                            {/* Store Links */}
                            <div className="flex flex-wrap gap-4 mt-2">
                                <a 
                                    href="https://play.google.com/store/apps/details?id=com.tenminuteschool.gb" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="transition-transform hover:scale-105"
                                >
                                    <img 
                                        src="https://cdn.10minuteschool.com/images/v5.2/googlePlayNew_1757848513564.svg" 
                                        alt="Google Play Store" 
                                        className="h-11 w-auto"
                                    />
                                </a>
                                <a 
                                    href="https://apps.apple.com/us/app/10-minute-school/id1577443847" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="transition-transform hover:scale-105"
                                >
                                    <img 
                                        src="https://cdn.10minuteschool.com/images/v5.2/appStoreNew_1757847196847.svg" 
                                        alt="Apple App Store" 
                                        className="h-11 w-auto"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* App Mockups Container */}
                        <div className="lg:col-span-5 flex justify-center items-center">
                            <div className="relative w-full max-w-[340px] md:max-w-[420px] aspect-[0.9] flex items-center justify-center">
                                <img 
                                    src="https://cdn.10minuteschool.com/image/Main_Container_%281%29_1763882370405.png" 
                                    alt="10ms App Interface Mockups" 
                                    className="w-full h-auto object-contain transition-transform duration-500 hover:rotate-2 hover:scale-103"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
