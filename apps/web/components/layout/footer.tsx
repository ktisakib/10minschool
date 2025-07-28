import Image from "next/image"
import Link from "next/link"
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiYoutubeFill, RiTiktokFill } from "@remixicon/react"

// Mock translation data - in your app, this would come from your i18n system
const translations = {
    Footer: {
        company: "কোম্পানি",
        career_recruitment: "ক্যারিয়ার / নিয়োগ বিজ্ঞপ্তি",
        join_teacher: "শিক্ষক হিসাবে যোগ দিন",
        join_affiliate: "অ্যাফিলিয়েট হিসাবে যোগ দিন",
        privacy_policy: "প্রাইভেসি পলিসি",
        refund_policy: "রিফান্ড পলিসি",
        terms: "ব্যবহারকারীর শর্তাবলি",
        other: "অন্যান্য",
        blog: "ব্লগ",
        book_store: "বুক স্টোর",
        free_notes: "ফ্রি নোটস ও গাইড",
        job_preparation: "চাকরি প্রস্তুতি কোর্সসমূহ",
        verify_certificate: "সার্টিফিকেট ভেরিফাই করুন",
        free_download: "ফ্রি ডাউনলোড",
        contact: "আমাদের যোগাযোগ মাধ্যম",
        call: "কল করুন: 16910 (24x7)",
        whatsapp: "হোয়াটসঅ্যাপ: +8801896016252(24x7)",
        intl: "দেশের বাহির থেকে: +880 9610916910",
        email: "ইমেইল: support@10minuteschool.com",
    },
}

export default function Footer() {
    const t = translations.Footer

    return (
        <footer className="">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:flex lg:flex-row  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and App Downloads */ }
                    <div className="space-y-6 w-sm ">
                        <div>
                            <Image
                                src="/10mslogo.svg"
                                alt="10 Minute School Logo"
                                width={ 150 }
                                height={ 60 }
                                className="h-12 w-auto"
                            />
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">ডাউনলোড করুন আমাদের মোবাইল অ্যাপ</p>
                        </div>

                        <div className="flex flex-row gap-6 space-y-3">
                            <Link href="#" className="inline-block">
                                <Image
                                    src="/playstore.png"
                                    alt="Download on Google Play"
                                    width={ 150 }
                                    height={ 50 }
                                    className="h-12 w-auto"
                                />
                            </Link>
                            <Link href="#" className="inline-block">
                                <Image
                                    src="/applestore.png"
                                    alt="Download on App Store"
                                    width={ 150 }
                                    height={ 50 }
                                    className="h-12 w-auto"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Company Links */ }
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{ t.company }</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.career_recruitment }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.join_teacher }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.join_affiliate }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.privacy_policy }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.refund_policy }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.terms }
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Other Links */ }
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{ t.other }</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.blog }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.book_store }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.free_notes }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.job_preparation }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.verify_certificate }
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    { t.free_download }
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */ }
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{ t.contact }</h3>
                        <div className="space-y-3">
                            <div className="text-sm">
                                <p className="text-gray-600">
                                    <span className="text-green-600 font-medium">কল করুন: 16910</span> (24x7)
                                </p>
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-600">
                                    <span className="font-medium">হোয়াটসঅ্যাপ:</span> <span className="text-green-600">+8801896016252</span>
                                    (24x7)
                                </p>
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-600">
                                    <span className="font-medium">দেশের বাহির থেকে:</span>{ " " }
                                    <span className="text-green-600">+880 9610916910</span>
                                </p>
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-600">
                                    <span className="font-medium">ইমেইল:</span>{ " " }
                                    <Link href="mailto:support@10minuteschool.com" className="text-green-600">
                                        support@10minuteschool.com
                                    </Link>
                                </p>
                            </div>

                            {/* Social Media Icons */ }
                            <div className="flex space-x-3 pt-4">
                                <Link href="#" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                                    <RiFacebookFill className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                                    <RiInstagramFill className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                                    <RiLinkedinFill className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                                    <RiYoutubeFill className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                                    <RiTiktokFill className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */ }
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">স্বত্ব © ২০১৫ - ২০২৫ টেন মিনিট স্কুল কর্তৃক সর্বস্বত্ব সংরক্ষিত</p>
                </div>
            </div>
        </footer>
    )
}
