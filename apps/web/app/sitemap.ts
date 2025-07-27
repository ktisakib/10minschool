import { MetadataRoute } from 'next';
import { Locale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getPathname } from '@/i18n/navigation';

export default function sitemap(): MetadataRoute.Sitemap {
    return [...getEntries('/'), ...getEntries('/pathnames')];
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntries(href: Href) {
    return routing.locales.map((locale) => ({
        url: getUrl(href, locale),
        alternates: {
            languages: Object.fromEntries(
                routing.locales.map((cur) => [cur, getUrl(href, cur)])
            )
        }
    }));
}

function getUrl(href: Href, locale: Locale) {
    const pathname = getPathname({ locale, href });
    const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return host + pathname;
}
