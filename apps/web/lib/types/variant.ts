export interface Plan {
    avail_grace_period: number;
    content_access_type: string;
    content_access_value: number;
    content_available_end_at: string;
    content_available_start_at: string;
    grace_period: number;
    id: number;
    name: string;
    payment_end_at: string;
    payment_start_at: string;
    secondary_name: string;
    status: string;
    upgrade_warning_days: number;
}

export interface Variant {
    id: string;
    name: string;
    price: number;
    discount_type: string;
    discount_value: number;
    order_idx: number;
    max_user_purchase_limit: number;
    max_order_quantity: number;
    plan: Plan | null;
    discount_amount: number;
    final_price: number;
    is_enrolled: boolean;
    identification_id: string;
    identification_type: string;
    total_enrolment: number;
    is_enable_inventory: boolean;
    available_stock: number;
    meta: any[];
    media: any[];
    is_exclusive: boolean;
    max_gift_item_count: number;
}

export interface Product {
    old_crm_id: number;
    slug: string;
    id: string;
    title: string;
    is_cohort_based_course: boolean;
}

export interface VariantResponse {
    data: {
        items: Variant[];
        product: Product;
        is_enrolled: boolean;
    };
    error: any[];
    message: string;
    payload: any[];
    status_code: number;
}
