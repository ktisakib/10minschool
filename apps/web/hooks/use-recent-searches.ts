'use client'

import { useState, useEffect } from 'react'

const RECENT_SEARCHES_KEY = 'tenminute_recent_searches'
const MAX_RECENT_SEARCHES = 5

export function useRecentSearches() {
    const [recentSearches, setRecentSearches] = useState<string[]>([])

    useEffect(() => {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
        if (stored) {
            try {
                setRecentSearches(JSON.parse(stored))
            } catch {
                setRecentSearches([])
            }
        }
    }, [])

    const addRecentSearch = (query: string) => {
        if (!query.trim()) return

        setRecentSearches(prev => {
            const filtered = prev.filter(item => item !== query)
            const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES)
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
            return updated
        })
    }

    const removeRecentSearch = (query: string) => {
        setRecentSearches(prev => {
            const updated = prev.filter(item => item !== query)
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
            return updated
        })
    }

    const clearRecentSearches = () => {
        setRecentSearches([])
        localStorage.removeItem(RECENT_SEARCHES_KEY)
    }

    return {
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches
    }
}
