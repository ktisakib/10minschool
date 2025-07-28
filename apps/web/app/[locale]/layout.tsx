import { Geist, Geist_Mono, Inter } from "next/font/google";

import "@enterprise/ui/globals.css";
import { Providers } from "@/components/providers";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html
            lang={ locale }
            suppressHydrationWarning>
            <body className={ `${fontSans.variable}  font-sans antialiased ` }>
                <NextIntlClientProvider>
                    <Providers>
                        <Header />
                        { children }
                        <Footer />
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
