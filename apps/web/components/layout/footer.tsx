import Image from "next/image"
import Link from "next/link"
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiYoutubeFill, RiTiktokFill } from "@remixicon/react"
import { useTranslations } from "next-intl"

export default function Footer() {
    const t = useTranslations("Footer")

    return (
        <footer className="">
            <div className="max-w-[1200px] overflow-x-hidden mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:flex lg:flex-row  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and App Downloads */}
                    <div className="space-y-6  min-w-sm ">
                        <div className="flex flex-col items-center md:items-start">
                            <Image
                                src="/10mslogo.svg"
                                alt="10 Minute School Logo"
                                width={150}
                                height={60}
                                className="h-12 w-auto"
                            />
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">Download our mobile app</p>
                        </div>

                        <div className="flex flex-row gap-6 space-y-3">
                            <Link href="#" className="inline-block">
                                <Image
                                    src="/playstore.png"
                                    alt="Download on Google Play"
                                    width={150}
                                    height={50}
                                    className="h-12 w-auto"
                                />
                            </Link>
                            <Link href="#" className="inline-block">
                                <Image
                                    src="/applestore.png"
                                    alt="Download on App Store"
                                    width={150}
                                    height={50}
                                    className="h-12 w-auto"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("company")}</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("career_recruitment")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("join_teacher")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("join_affiliate")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("privacy_policy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("refund_policy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("terms")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Other Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("other")}</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("blog")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("book_store")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("free_notes")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("job_preparation")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("verify_certificate")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                    {t("free_download")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("contact")}</h3>
                        <div className="space-y-3">
                            <div className="text-sm">
                                <p className="text-gray-600">
                                    <span className="text-green-600 font-medium">{t("call")}</span>
                                </p>
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-600">
                                    <span className="font-medium">{t("whatsapp").split(":")[0]}:</span> <span className="text-green-600">{t("whatsapp").split(":")[1]}</span>
                                </p>
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-600">
                                    <span className="font-medium">{t("intl").split(":")[0]}:</span>{" "}
                                    <span className="text-green-600">{t("intl").split(":")[1]}</span>
                                </p>
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-600">
                                    {(() => {
                                        const emailParts = t("email")?.split(":");
                                        const label = emailParts?.[0] || "Email";
                                        const address = emailParts?.[1]?.trim() || "support@10minuteschool.com";
                                        return (
                                            <>
                                                <span className="font-medium">{label}:</span>{" "}
                                                <Link href={`mailto:${address}`} className="text-green-600">
                                                    {address}
                                                </Link>
                                            </>
                                        );
                                    })()}
                                </p>
                            </div>

                            {/* Social Media Icons */}
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

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">© 2015 - 2025 10 Minute School. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
