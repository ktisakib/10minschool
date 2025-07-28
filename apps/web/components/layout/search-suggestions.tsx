'use client'

import { useState, useEffect, useOptimistic, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { searchGuides, getPopularSearches, SearchResponse, SearchItem } from '@/lib/actions/search'
import { useRecentSearches } from '@/hooks/use-recent-searches'
import { useDebounce } from '@/hooks/use-debounce'
import { SearchSuggestionSkeleton } from '@/components/layout/search-skeleton'
import {
    SearchSuggestionItem,
    RecentSearchItem,
    SearchSection
} from './search-suggestion-item'

interface SearchSuggestionsProps {
    query: string
    onSelectSuggestion: (item: SearchItem) => void
    onSelectRecent: (query: string) => void
    isVisible: boolean
}

export function SearchSuggestions({
    query,
    onSelectSuggestion,
    onSelectRecent,
    isVisible
}: SearchSuggestionsProps) {
    const t = useTranslations('Header.search')
    const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearches()
    const [isPending, startTransition] = useTransition()
    const [searchResults, setSearchResults] = useState<SearchResponse | null>(null)
    const [popularSearches, setPopularSearches] = useState<SearchResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPopular, setIsLoadingPopular] = useState(false)

    // Debounce the search query to avoid too many API calls
    const debouncedQuery = useDebounce(query, 300)

    // Optimistic state for search results
    const [optimisticResults, setOptimisticResults] = useOptimistic<SearchResponse | null>(
        null
    )

    // Handle clearing recent searches without closing dropdown
    const handleClearRecent = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        clearRecentSearches()
    }

    // Handle removing individual recent search without closing dropdown
    const handleRemoveRecent = (query: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        removeRecentSearch(query)
    }

    // Fetch popular searches when component mounts or becomes visible
    useEffect(() => {
        if (isVisible && !popularSearches && !isLoadingPopular) {
            setIsLoadingPopular(true)
            startTransition(async () => {
                try {
                    const popular = await getPopularSearches()
                    setPopularSearches(popular)
                } catch (error) {
                    console.error('Popular searches error:', error)
                } finally {
                    setIsLoadingPopular(false)
                }
            })
        }
    }, [isVisible, popularSearches, isLoadingPopular])

    // Fetch search results when debounced query changes
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSearchResults(null)
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        startTransition(async () => {
            try {
                const results = await searchGuides(debouncedQuery.trim())
                setSearchResults(results)
                setOptimisticResults(results)
            } catch (error) {
                console.error('Search error:', error)
                setSearchResults(null)
            } finally {
                setIsLoading(false)
            }
        })
    }, [debouncedQuery])

    const handleSelectSuggestion = (item: SearchItem) => {
        // Add to recent searches
        const cleanText = item.text.replace(/<[^>]*>/g, '')
        addRecentSearch(cleanText)
        onSelectSuggestion(item)
    }

    const handleSelectRecent = (recentQuery: string) => {
        onSelectRecent(recentQuery)
    }

    if (!isVisible) return null

    return (
        <div className="absolute top-full left-0 right-0 mt-0 bg-background border border-border border-t-0 rounded-b-[24px] shadow-lg z-50 max-h-96 overflow-y-auto">
            {/* Show content based on query state */ }
            { !query.trim() ? (
                <>
                    {/* Show recent searches if available */ }
                    { recentSearches.length > 0 && (
                        <SearchSection
                            title={ t('recent_searches') }
                            showClearAll
                            onClearAll={ handleClearRecent }
                        >
                            { recentSearches.slice(0, 4).map((recentQuery) => (
                                <RecentSearchItem
                                    key={ recentQuery }
                                    query={ recentQuery }
                                    onClick={ handleSelectRecent }
                                    onRemove={ handleRemoveRecent }
                                />
                            )) }
                        </SearchSection>
                    ) }

                    {/* Show popular searches */ }
                    { isLoadingPopular ? (
                        <SearchSuggestionSkeleton count={ 4 } />
                    ) : popularSearches?.data.popular.length ? (
                        <SearchSection title={ t('popular_searches') }>
                            { popularSearches.data.popular.slice(0, 4).map((item) => (
                                <SearchSuggestionItem
                                    key={ item.id }
                                    item={ item }
                                    onClick={ handleSelectSuggestion }
                                    showImage={ false }
                                />
                            )) }
                        </SearchSection>
                    ) : (
                        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                            { t('popular_searches') }
                        </div>
                    ) }
                </>
            ) : (
                /* Show search results when query exists */
                <>
                    { (isLoading || isPending) ? (
                        <SearchSuggestionSkeleton count={ 5 } />
                    ) : searchResults ? (
                        <>
                            {/* Search results - no section title when typing */ }
                            { searchResults.data.items.length > 0 && (
                                <div className="py-2">
                                    { searchResults.data.items.slice(0, 8).map((item) => (
                                        <SearchSuggestionItem
                                            key={ item.id }
                                            item={ item }
                                            onClick={ handleSelectSuggestion }
                                        />
                                    )) }
                                </div>
                            ) }

                            {/* Popular searches from API - only show if no direct results */ }
                            { searchResults.data.items.length === 0 && searchResults.data.popular.length > 0 && (
                                <div className="py-2">
                                    { searchResults.data.popular.slice(0, 3).map((item) => (
                                        <SearchSuggestionItem
                                            key={ item.id }
                                            item={ item }
                                            onClick={ handleSelectSuggestion }
                                            showImage={ false }
                                        />
                                    )) }
                                </div>
                            ) }

                            {/* No results found */ }
                            { searchResults.data.items.length === 0 && searchResults.data.popular.length === 0 && (
                                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                                    { t('no_results') }
                                </div>
                            ) }
                        </>
                    ) : (
                        <SearchSuggestionSkeleton count={ 3 } />
                    ) }
                </>
            ) }
        </div>
    )
}
