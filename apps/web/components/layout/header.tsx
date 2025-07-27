import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
// import { useTranslations } from 'next-intl'
import Nav from "./nav";
import SearchBar from "./search-bar";
import LocalSwitcher from "./local-switcher";
import { Button } from "@enterprise/ui/components/button";

import { getTranslations } from "next-intl/server";

const Header = async () => {
  // const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const t = await getTranslations();
  // const mobileNavConfig = createNavigationConfig(t)

  return (
    <>
      <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto max-w-[1400px] px-4'>
          {/* Main Header */}
          <div className='flex h-16 relative items-center gap-4'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center gap-2 flex-shrink-0'>
              <Image
                src='/10mslogo.svg'
                alt='10 Minute School'
                width={40}
                height={40}
                className='h-6 w-auto'
              />
            </Link>

            {/* Search Bar - Right after logo */}
            <div className='hidden relative md:flex flex-1 max-w-sm'>
              <SearchBar />
            </div>

            {/* Navigation Menu - Desktop */}
            <div className='hidden lg:flex'>
              <Nav />
            </div>

            {/* Right Side Actions */}
            <div className='flex items-center gap-3 flex-shrink-0'>
              {/* Phone Number */}

              {/* Language Switcher */}
              <LocalSwitcher />
              <div className='hidden lg:flex items-center gap-1 text-sm text-muted-foreground'>
                <Phone className='h-6 w-6 fill-primary stroke-0' />
                <span className="text-primary text-lg">{t("Header.phone")}</span>
              </div>

              {/* Login Button */}
              <Button
                size='sm'
                className='bg-primary hover:bg-primary/80 cursor-pointer text-white'>
                {t("Header.login")}
              </Button>

              {/* Mobile Menu Button */}
              <button
                className='lg:hidden p-2 hover:bg-accent rounded-lg transition-colors'
                // onClick={ () => setIsMobileNavOpen(true) }
              >
                <Menu className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className='md:hidden pb-4'>
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {/* <ModularMobileNav
                isOpen={ isMobileNavOpen }
                onClose={ () => setIsMobileNavOpen(false) }
                config={ mobileNavConfig }
            /> */}
    </>
  );
};

export default Header;
