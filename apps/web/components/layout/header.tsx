import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
// import { useTranslations } from 'next-intl'
import LocalSwitcher from "./local-switcher";
import MobileNav from "./mobile-nav";


import { getTranslations } from "next-intl/server";
import Nav from "./nav";
import SearchBar from "./search-bar";
import { Button } from "@enterprise/ui/components/button";
const Header = async () => {
    const t = await getTranslations();
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background shadow-sm">
            <div className="container mx-auto max-w-[1400px] px-4">
                {/* Mobile header */ }
                <div className="flex lg:hidden h-16 items-center w-full justify-between px-4">
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <Image src="/10mslogo.svg" alt="10 Minute School" width={ 40 } height={ 40 } className="h-7 w-auto" />
                    </Link>
                    <div className="flex items-center gap-2">
                    <LocalSwitcher />
                        <MobileNav />
                    </div>
                </div>
                {/* Desktop header */ }
                <div className="hidden lg:flex h-16 items-center w-full gap-4 justify-between px-4">
                    {/* Logo */ }
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <img src="/10mslogo.svg" alt="10 Minute School" width={ 40 } height={ 40 } className="h-7 w-auto" />
                    </Link>
                    {/* Navigation and actions */ }
                    <div className="flex items-center gap-2 flex-1">
                        <SearchBar />
                        {/* Add your desktop navigation here, e.g. <Nav /> */ }
                        <Nav />
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <LocalSwitcher />
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            {/* Language Switcher */ }
                            <div className='hidden lg:flex items-center gap-1 text-sm text-muted-foreground'>
                                <Phone className='h-6 w-6 fill-primary stroke-0' />
                                <span className="text-primary text-lg">{ t("Header.phone") }</span>
                            </div>

                            {/* Login Button */ }
                            <Button
                                size='sm'
                                className='bg-primary hover:bg-primary/80 cursor-pointer text-white'>
                                { t("Header.login") }
                            </Button>



                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
