import { getTranslations } from "next-intl/server";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@enterprise/ui/components/navigation-menu";

import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@enterprise/ui/components/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { navigations } from "@/lib/navigations";
import NavLink from "./nav-link";

const Nav = async () => {
  const t = await getTranslations();

  return (
    <NavigationMenu
      className='hidden lg:flex'
      viewport={false}>
      <NavigationMenuList className='gap-1'>
        {navigations.map((nav, index) =>
          // If it has items, render as dropdown
          nav.items ? (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger className='text-muted-foreground text-sm hover:text-primary hover:bg-transparent data-[state=open]:text-primary data-[state=open]:bg-transparent'>
                {t(nav.label)}
              </NavigationMenuTrigger>
              <NavigationMenuContent className='max-w-min'>
                {nav.items.map((item: any, itemIndex: number) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className='flex items-center gap-6 p-2 flex-nowrap rounded-md hover:bg-accent hover:text-accent-foreground'>
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt={t(item.label)}
                        width={20}
                        height={20}
                        className='flex-shrink-0 size-6'
                      />
                    )}
                    <span className='text-nowrap text-sm text-muted-foreground'>
                      {t(item.label)}
                    </span>
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={index}>
              <NavLink
                href={nav.href}
                title={t(nav.label)}
                className='text-muted-foreground text-sm hover:text-primary hover:bg-transparent data-[state=open]:text-primary data-[state=open]:bg-transparent'
              />
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Nav;
