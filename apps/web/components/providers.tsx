"use client";

import TrpcProvider from "@enterprise/trpc/trpc-provider";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider url='/api/trpc'>

        <NextThemesProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
          enableColorScheme>
          {children}
        </NextThemesProvider>
      
    </TrpcProvider>
  );
}
