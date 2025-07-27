'use client'

import { Search, X, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SearchItem } from '@/lib/actions/search'

interface SearchSuggestionItemProps {
    item: SearchItem
    onClick: (item: SearchItem) => void
    showImage?: boolean
}

export function SearchSuggestionItem({
    item,
    onClick,
    showImage = true
}: SearchSuggestionItemProps) {
    const handleClick = () => {
        onClick(item)
    }

    return (
        <button
            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={ handleClick }
        >
            { showImage && item.image ? (
                <img
                    src={ item.image }
                    alt=""
                    className="h-8 w-8 rounded object-cover flex-shrink-0"
                />
            ) : (
                <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            ) }
            <div className="flex-1 min-w-0">
                <div
                    className="truncate"
                    dangerouslySetInnerHTML={ { __html: item.text } }
                />
                { item.sub_text && (
                    <div className="text-xs text-muted-foreground truncate">
                        { item.sub_text }
                    </div>
                ) }
            </div>
        </button>
    )
}

interface RecentSearchItemProps {
    query: string
    onClick: (query: string) => void
    onRemove: (query: string, e?: React.MouseEvent) => void
}

export function RecentSearchItem({ query, onClick, onRemove }: RecentSearchItemProps) {
    return (
        <div className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors group">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <button
                className="flex-1 text-left truncate"
                onClick={ () => onClick(query) }
            >
                { query }
            </button>
            <button
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-background rounded transition-all"
                onClick={ (e) => {
                    e.stopPropagation()
                    onRemove(query, e)
                } }
            >
                <X className="h-3 w-3" />
            </button>
        </div>
    )
}

interface SearchSectionProps {
    title: string
    children: React.ReactNode
    onClearAll?: (e?: React.MouseEvent) => void
    showClearAll?: boolean
}

export function SearchSection({
    title,
    children,
    onClearAll,
    showClearAll = false
}: SearchSectionProps) {
    const t = useTranslations('Header.search')

    return (
        <div className="py-2">
            <div className="flex items-center justify-between px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                <span>{ title }</span>
                { showClearAll && onClearAll && (
                    <button
                        onClick={ (e) => onClearAll(e) }
                        className="text-xs hover:text-foreground transition-colors"
                    >
                        { t('clear_recent') }
                    </button>
                ) }
            </div>
            { children }
        </div>
    )
}
