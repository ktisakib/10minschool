'use client'

import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import TranslationIcon from '@/components/icons/translation-icon'

const LocalSwitcher = () => {
    const t = useTranslations('Header')
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale })
    }

    return (
        <button
            onClick={ () => switchLocale(locale === 'en' ? 'bn' : 'en') }
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Switch language"
        >
            <TranslationIcon className="h-4 w-4" />
            <span className="text-sm font-medium">
                { t('language') }
            </span>
        </button>
    )
}

export default LocalSwitcher
