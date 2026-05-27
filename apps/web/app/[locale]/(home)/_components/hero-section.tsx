"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden bg-black text-white px-4 pt-16 pb-20">
            {/* Styles for custom animations and effects */}
            <style jsx global>{`
                @keyframes fadeInWithGradient {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInScale {
                    0% {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes slideUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes bounceSlow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-6px);
                    }
                }
                .custom-bounce {
                    animation: bounceSlow 3s ease-in-out infinite;
                }
                .glare-card-container {
                    box-shadow: 0px 3px 0px rgba(255, 255, 255, 0.35), inset 0px 0px 24px rgba(255, 255, 255, 0.12);
                    backdrop-filter: blur(14.5px);
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                .glare-card-container:hover {
                    transform: translateY(-8px) scale(1.02);
                    border-color: rgba(255, 255, 255, 0.4);
                    box-shadow: 0px 8px 20px rgba(28, 171, 85, 0.3), inset 0px 0px 24px rgba(255, 255, 255, 0.2);
                }
                .highlight-card-shadow {
                    position: relative;
                }
                .highlight-card-shadow::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: 49px;
                    background: linear-gradient(180deg, #FFBD01 0%, #FE2601 100%);
                    z-index: 0;
                    padding: 2px;
                    pointer-events: none;
                }
                @media (max-width: 768px) {
                    .highlight-card-shadow::before {
                        border-radius: 29px;
                    }
                }
            `}</style>

            {/* Eclipse & Light Ray Backgrounds */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
                {/* Dark shadow backdrop */}
                <div className="absolute inset-0 bg-[#000000] z-[1]"></div>
                
                {/* Eclipse png */}
                <div className="absolute inset-0 flex justify-center items-start top-[60px] md:top-[100px] z-[2] opacity-70 animate-pulse duration-10000">
                    <img 
                        src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/eclipse_1763622548696.png" 
                        alt="Hero Background Eclipse" 
                        className="w-full max-w-[2620px] object-cover mix-blend-screen"
                    />
                </div>
                
                {/* Light Ray overlays */}
                <div className="absolute inset-0 z-[3] mix-blend-plus-lighter opacity-40">
                    <img 
                        src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/light_ray_1763622568654.png" 
                        alt="Hero Background Light Ray" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 z-[3] mix-blend-plus-lighter opacity-25 animate-pulse">
                    <img 
                        src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/light_ray_1763622568654.png" 
                        alt="Hero Background Light Ray Pulsing" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Bottom mask gradient */}
                <div className="absolute inset-0 z-[4]" style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, transparent 80%)" }}></div>
            </div>

            {/* Main Hero Content */}
            <div className="relative z-10 max-w-[1200px] w-full flex flex-col items-center gap-2 mt-8 md:mt-24">
                {/* H1 Title with Gradient Text */}
                <h1 className="text-center font-bold text-4xl md:text-7xl tracking-tight leading-tight mb-2">
                    <span className="inline-block animate-[fadeInWithGradient_1s_ease-in-out_0.2s_forwards] bg-gradient-to-r from-[#FFB25A] via-[#EFCBFF] via-55% to-[#9BDDFF] bg-clip-text text-transparent">
                        শেখা হোক আনন্দে!
                    </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-base md:text-2xl text-white/90 max-w-[500px] mb-8 md:mb-12 font-medium">
                    <span className="inline-block animate-[fadeInWithGradient_1s_ease-in-out_0.4s_forwards]">
                        এক জায়গায় স্কুল ও কলেজের সম্পূর্ণ প্রস্তুতি!
                    </span>
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5 mb-8 md:mb-12 w-full max-w-[1100px] px-2">
                    {/* HSC 26 */}
                    <Link href="/hsc/hsc-26" className="group flex flex-col items-center">
                        <div className="glare-card-container relative flex border border-white/20 bg-[#110606]/80 flex-col items-center justify-center gap-3 w-full aspect-square rounded-[22px] md:rounded-[40px] p-2 md:p-5 overflow-hidden">
                            <img 
                                src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/1x1_-_Camera_1762764883758.png" 
                                alt="HSC ২৬" 
                                className="w-10 h-10 md:w-20 md:h-20 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                            />
                            <h4 className="font-semibold text-center text-xs md:text-lg text-white relative z-10">HSC ২৬</h4>
                        </div>
                    </Link>

                    {/* HSC 27 */}
                    <Link href="/hsc/hsc-27" className="group flex flex-col items-center">
                        <div className="glare-card-container relative flex border border-white/20 bg-[#110606]/80 flex-col items-center justify-center gap-3 w-full aspect-square rounded-[22px] md:rounded-[40px] p-2 md:p-5 overflow-hidden">
                            <img 
                                src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/1x1_-_Camera_%281%29_1762765160482.png" 
                                alt="HSC ২৭" 
                                className="w-10 h-10 md:w-20 md:h-20 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                            />
                            <h4 className="font-semibold text-center text-xs md:text-lg text-white relative z-10">HSC ২৭</h4>
                        </div>
                    </Link>

                    {/* HSC 28 */}
                    <Link href="/hsc/hsc-28" className="group flex flex-col items-center">
                        <div className="glare-card-container relative flex border border-white/20 bg-[#110606]/80 flex-col items-center justify-center gap-3 w-full aspect-square rounded-[22px] md:rounded-[40px] p-2 md:p-5 overflow-hidden">
                            <img 
                                src="https://cdn.10minuteschool.com/images/banners/1x1_-_Camera_1778734831949.png" 
                                alt="HSC ২৮" 
                                className="w-10 h-10 md:w-20 md:h-20 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                            />
                            <h4 className="font-semibold text-center text-xs md:text-lg text-white relative z-10">HSC ২৮</h4>
                        </div>
                    </Link>

                    {/* Tenth Class */}
                    <Link href="/ssc/ssc-27" className="group flex flex-col items-center relative">
                        <div className="highlight-card-shadow w-full aspect-square rounded-[22px] md:rounded-[40px]">
                            <div className="glare-card-container relative flex border border-white/20 bg-[#110606]/80 flex-col items-center justify-center gap-3 w-full h-full rounded-[22px] md:rounded-[40px] p-2 md:p-5 overflow-hidden z-10">
                                <img 
                                    src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/1x1_-_Camera_%283%29_1762765228978.png" 
                                    alt="দশম শ্রেণি" 
                                    className="w-10 h-10 md:w-20 md:h-20 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                                />
                                <h4 className="font-semibold text-center text-xs md:text-lg text-white relative z-10">দশম শ্রেণি</h4>
                            </div>
                        </div>
                        {/* Floating Bouncy Badge */}
                        <div className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 w-[80px] md:w-[130px] h-[36px] md:h-[55px] flex items-center justify-center custom-bounce z-20">
                            <img 
                                src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/Rectangle_3463271_1762767794755.svg" 
                                alt="Badge Background" 
                                className="absolute inset-0 w-full h-full object-contain"
                            />
                            <p className="relative z-30 text-white text-[8px] md:text-[11px] font-bold text-center px-2 pb-1.5 md:pb-2">
                                ২০২৬ সালে ভর্তি চলছে
                            </p>
                        </div>
                    </Link>

                    {/* Ninth Class */}
                    <Link href="/ssc/ssc-28" className="group flex flex-col items-center relative">
                        <div className="highlight-card-shadow w-full aspect-square rounded-[22px] md:rounded-[40px]">
                            <div className="glare-card-container relative flex border border-white/20 bg-[#110606]/80 flex-col items-center justify-center gap-3 w-full h-full rounded-[22px] md:rounded-[40px] p-2 md:p-5 overflow-hidden z-10">
                                <img 
                                    src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/1x1_-_Camera_%284%29_1762765246822.png" 
                                    alt="৯ম শ্রেণি" 
                                    className="w-10 h-10 md:w-20 md:h-20 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                                />
                                <h4 className="font-semibold text-center text-xs md:text-lg text-white relative z-10">৯ম শ্রেণি</h4>
                            </div>
                        </div>
                        {/* Floating Bouncy Badge */}
                        <div className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 w-[80px] md:w-[130px] h-[36px] md:h-[55px] flex items-center justify-center custom-bounce z-20">
                            <img 
                                src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/Rectangle_3463271_1762767794755.svg" 
                                alt="Badge Background" 
                                className="absolute inset-0 w-full h-full object-contain"
                            />
                            <p className="relative z-30 text-white text-[8px] md:text-[11px] font-bold text-center px-2 pb-1.5 md:pb-2">
                                ২০২৬ সালে ভর্তি চলছে
                            </p>
                        </div>
                    </Link>

                    {/* 6th - 8th Class */}
                    <Link href="/class-6" className="group flex flex-col items-center relative">
                        <div className="highlight-card-shadow w-full aspect-square rounded-[22px] md:rounded-[40px]">
                            <div className="glare-card-container relative flex border border-white/20 bg-[#110606]/80 flex-col items-center justify-center gap-3 w-full h-full rounded-[22px] md:rounded-[40px] p-2 md:p-5 overflow-hidden z-10">
                                <img 
                                    src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/1x1_-_Camera_%285%29_1762765261842.png" 
                                    alt="৬ষ্ঠ-৮ম শ্রেণি" 
                                    className="w-10 h-10 md:w-20 md:h-20 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                                />
                                <h4 className="font-semibold text-center text-xs md:text-lg text-white relative z-10 leading-tight">৬ষ্ঠ, ৭ম, ৮ম</h4>
                            </div>
                        </div>
                        {/* Floating Bouncy Badge */}
                        <div className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 w-[80px] md:w-[130px] h-[36px] md:h-[55px] flex items-center justify-center custom-bounce z-20">
                            <img 
                                src="https://cdn.10minuteschool.com/images/ssr_10mins_web/v5.2/Rectangle_3463271_1762767794755.svg" 
                                alt="Badge Background" 
                                className="absolute inset-0 w-full h-full object-contain"
                            />
                            <p className="relative z-30 text-white text-[8px] md:text-[11px] font-bold text-center px-2 pb-1.5 md:pb-2">
                                ২০২৬ সালে ভর্তি চলছে
                            </p>
                        </div>
                    </Link>
                </div>


                {/* Free Classes CTAs */}
                <div className="flex flex-row justify-center gap-4 mt-12 md:mt-16 w-full animate-[slideUp_0.8s_ease-out_0.6s_forwards] opacity-0" style={{ animationFillMode: "forwards" }}>
                    <Link 
                        href="https://10minuteschool.com/en/event/ob-26-free-class/" 
                        className="flex items-center gap-1.5 px-5 py-2.5 md:px-7 md:py-3.5 rounded-full text-white font-semibold text-sm md:text-base bg-[#149353] hover:bg-[#1CAB55] transition-all hover:scale-105 shadow-lg shadow-green-900/30"
                    >
                        ফ্রি ক্লাস (৬-১০)
                        <ArrowRight className="w-4.5 h-4.5" />
                    </Link>
                    <Link 
                        href="https://10minuteschool.com/event/hsc-online-batch/" 
                        className="flex items-center gap-1.5 px-5 py-2.5 md:px-7 md:py-3.5 rounded-full text-white font-semibold text-sm md:text-base bg-[#149353] hover:bg-[#1CAB55] transition-all hover:scale-105 shadow-lg shadow-green-900/30"
                    >
                        ফ্রি ক্লাস (HSC)
                        <ArrowRight className="w-4.5 h-4.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
