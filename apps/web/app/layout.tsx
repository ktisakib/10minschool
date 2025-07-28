
import type { Metadata } from "next";
import { ReactNode } from "react";
// Default SEO metadata for the site
export const metadata: Metadata = {
    title: "10 Minute School",
    description: "Learn anything in 10 minutes. Courses, resources, and more.",
    openGraph: {
        title: "10 Minute School",
        description: "Learn anything in 10 minutes. Courses, resources, and more.",
    },
    twitter: {
        card: "summary_large_image",
        title: "10 Minute School",
        description: "Learn anything in 10 minutes. Courses, resources, and more.",
    },
};

type Props = {
    children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
    return children;
}
