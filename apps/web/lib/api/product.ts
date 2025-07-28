import { ProductResponse, ProductData, RatingData, RatingResponse } from '@/lib/types/product';

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

export async function getCourseRating(productId: number|string, courseId: number|string): Promise<RatingData | null> {
    const url = `https://api.10minuteschool.com/micro-survey/api/v3/forms/621f401d9c78e90013bbfe3b/course-rating/${courseId}?product_id=${productId}`;

    try {
        const response = await fetch(url, {
            headers: {
                'accept': 'application/json',
            },
            next: {
                revalidate: 3600, // ISR: revalidate every hour
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch rating data: ${response.status}`);
        }

        const result: RatingResponse = await response.json();

        if (result.code === 200 && result.data) {
            return result.data;
        }

        return null;
    } catch (error) {
        console.error('Error fetching rating data:', error);
        return null;
    }
}
