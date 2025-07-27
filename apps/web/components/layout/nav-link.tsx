'use client'


import { cn } from "@enterprise/ui/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";

interface NavLinkProps {
    title: string;
    href: string;
    className?: string;
}

const NavLink = ({ title, href, className }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(href + '/');

    return (
        <Link
            href={ href }
            className={ cn(
                "transition-colors hover:text-primary",
                isActive ? "text-primary font-medium" : "text-muted-foreground",
                className
            ) }
        >
            { title }
        </Link>
    );
};

export default NavLink;
