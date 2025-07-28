'use client'

import React, { useState, useTransition, Suspense } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { SearchSuggestions } from './search-suggestions'
import SparkSearchIcon from '../icons/spark-search-icon'
import Form from 'next/form'
import { SearchItem } from '@/lib/actions/search'
import { ScrollArea } from "@enterprise/ui/components/scroll-area";
import { cn } from '@enterprise/ui/lib/utils'
interface SearchBarProps {
    onSearch?: (query: string) => void
    placeholder?: string
    className?: string
}

const SearchBar = ({
    onSearch,
    placeholder,
    className
}: SearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [isPending, startTransition] = useTransition()
    const t = useTranslations('Header')
    const router = useRouter()

    // Handle selection of search suggestions
    const handleSelectSuggestion = (item: SearchItem) => {
        const cleanText = item.text.replace(/<[^>]*>/g, '')

        if (item.context === 'product' && item.slug) {
            // For product items: close dropdown and navigate
            setSearchQuery(cleanText)
            setIsActive(false)

            // Navigate to product page
            const productUrl = `/product/${item.slug}/?ref=${item.taxonomy.vertical}&type=search`
            router.push(productUrl)

            if (onSearch) {
                startTransition(() => {
                    onSearch(cleanText)
                })
            }
        } else {
            // For phrase/query items: populate input but keep dropdown open
            setSearchQuery(cleanText)
            // Don't close dropdown for phrase suggestions
        }
    }

    // Handle selection of recent searches (populate input but keep dropdown open)
    const handleSelectRecent = (query: string) => {
        setSearchQuery(query)
        // Don't close dropdown for recent searches - keep it open like phrase suggestions
        if (onSearch) {
            startTransition(() => {
                onSearch(query)
            })
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleFocus = () => {
        setIsActive(true)
    }

    const handleBlur = () => {
        // Longer timeout to allow for interactions with dropdown
        setTimeout(() => setIsActive(false), 300)
    }

    const handleDropdownMouseDown = (e: React.MouseEvent) => {
        // Prevent the input from losing focus when clicking in dropdown
        e.preventDefault()
    }

    return (
        <div className={cn("flex-1 ", className) }>
            <Form action="/search">
                <div className={ `relative border ${isActive ? 'rounded-t-[24px]' : 'border-border rounded-full'} bg-background transition-all duration-200` }>
                    <div className="flex items-center gap-3 px-2 py-1.5">
                        <SparkSearchIcon className={ `h-7 w-7 flex-shrink-0 transition-colors ${isPending
                            ? 'text-primary animate-pulse'
                            : 'text-muted-foreground'
                            }` } />
                        <input
                            type="text"
                            name="q"
                            placeholder={ placeholder || t('search.placeholder') }
                            value={ searchQuery }
                            onChange={ handleInputChange }
                            onFocus={ handleFocus }
                            onBlur={ handleBlur }
                            className="flex-1 text-sm placeholder:text-sm placeholder:text-muted-foreground bg-transparent border-none outline-none"
                            disabled={ isPending }
                        />
                    </div>
                </div>
            </Form>

            {/* Search Suggestions Dropdown */ }
            <Suspense fallback={ null }>
                <ScrollArea onMouseDown={ handleDropdownMouseDown }>
                    <SearchSuggestions
                        query={ searchQuery }
                        onSelectSuggestion={ handleSelectSuggestion }
                        onSelectRecent={ handleSelectRecent }
                        isVisible={ isActive }
                    />
                </ScrollArea>
            </Suspense>
        </div>
    )
}

export default SearchBar
