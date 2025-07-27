'use server'

export interface SearchItem {
    id: string
    context: string
    text: string
    sub_text: string
    image: string
    slug: string
    taxonomy: {
        vertical: string
        segment: string
    }
    tags: string[]
}

export interface SearchResponse {
    data: {
        recent: SearchItem[]
        popular: SearchItem[]
        items: SearchItem[]
        guest_user_id: string
        guest_keywords_merged: boolean
    }
    error: any[]
    message: string
    payload: any[]
    status_code: number
}

export async function searchGuides(query: string): Promise<SearchResponse> {
    try {
        const response = await fetch(
            `https://api.10minuteschool.com/discovery-service/api/v1/search/guides?query=${encodeURIComponent(query)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store', // Ensure fresh data
            }
        )

        if (!response.ok) {
            throw new Error(`Search API error: ${response.status}`)
        }

        const data: SearchResponse = await response.json()
        return data
    } catch (error) {
        console.error('Search error:', error)
        // Return empty structure on error
        return {
            data: {
                recent: [],
                popular: [],
                items: [],
                guest_user_id: '',
                guest_keywords_merged: false
            },
            error: [error instanceof Error ? error.message : 'Unknown error'],
            message: 'error',
            payload: [],
            status_code: 500
        }
    }
}

export async function getPopularSearches(): Promise<SearchResponse> {
    try {
        // Fetch popular searches with an empty query to get initial suggestions
        const response = await fetch(
            'https://api.10minuteschool.com/discovery-service/api/v1/search/guides?query=',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'default', // Cache popular searches for better performance
            }
        )

        if (!response.ok) {
            throw new Error(`Popular searches API error: ${response.status}`)
        }

        const data: SearchResponse = await response.json()
        return data
    } catch (error) {
        console.error('Popular searches error:', error)
        // Return fallback popular searches
        return {
            data: {
                recent: [],
                popular: [
                    {
                        id: 'fallback-1',
                        context: 'phrase',
                        text: 'HSC 25 শেষ মুহূর্তের প্রস্তুতি',
                        sub_text: '',
                        image: '',
                        slug: '',
                        taxonomy: { vertical: '', segment: '' },
                        tags: []
                    },
                    {
                        id: 'fallback-2',
                        context: 'phrase',
                        text: 'hsc 26',
                        sub_text: '',
                        image: '',
                        slug: '',
                        taxonomy: { vertical: '', segment: '' },
                        tags: []
                    },
                    {
                        id: 'fallback-3',
                        context: 'phrase',
                        text: 'ielts',
                        sub_text: '',
                        image: '',
                        slug: '',
                        taxonomy: { vertical: '', segment: '' },
                        tags: []
                    },
                    {
                        id: 'fallback-4',
                        context: 'phrase',
                        text: '৯ম শ্রেণি - অনলাইন ব্যাচ ২০২৭',
                        sub_text: '',
                        image: '',
                        slug: '',
                        taxonomy: { vertical: '', segment: '' },
                        tags: []
                    }
                ],
                items: [],
                guest_user_id: '',
                guest_keywords_merged: false
            },
            error: [],
            message: 'success',
            payload: [],
            status_code: 200
        }
    }
}
