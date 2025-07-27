import { ProductResponse, ProductData } from '@/lib/types/product';

export async function getProductData(slug: string, lang: 'en' | 'bn' = 'en'): Promise<ProductData | null> {
    const url = `https://api.10minuteschool.com/discovery-service/api/v1/products/${slug}?lang=${lang}`;

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
            throw new Error(`Failed to fetch product data: ${response.status}`);
        }

        const result: ProductResponse = await response.json();

        if (result.code === 200 && result.data) {
            return result.data;
        }

        return null;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return null;
    }
}
