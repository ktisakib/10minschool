import { VariantResponse, Variant } from '@/lib/types/variant';

export async function getProductVariants(slug: string): Promise<Variant[]> {
    const url = `https://api.10minuteschool.com/discovery-service/api/v1/products/${slug}/variants`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-TENMS-SOURCE-PLATFORM': 'web',
                'accept': 'application/json',
            },
            next: {
                revalidate: 3600, // ISR: revalidate every hour
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch variant data: ${response.status}`);
        }

        const result: VariantResponse = await response.json();

        if (result.status_code === 200 && result.data?.items) {
            return result.data.items;
        }

        return [];
    } catch (error) {
        console.error('Error fetching variant data:', error);
        return [];
    }
}
