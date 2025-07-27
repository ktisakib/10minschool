import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'bn'],
    defaultLocale: 'bn',
    localePrefix: 'as-needed',
    localeDetection: false

    // localeCookie: false

    // localeCookie: {
    //     // Custom cookie name
    //     name: 'USER_LOCALE',
    //     // Expire in one year
    //     maxAge: 60 * 60 * 24 * 365
    // }
    // Used when no locale matches
});
