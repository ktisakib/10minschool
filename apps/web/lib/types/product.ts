export interface Medium {
    name: string;
    resource_type: 'video' | 'image';
    resource_value: string;
    thumbnail_url?: string;
}

export interface Checklist {
    color: string;
    icon: string;
    id: string;
    list_page_visibility: boolean;
    text: string;
}

export interface Seo {
    // Define SEO structure as needed
}

export interface CtaText {
    name: string;
    value: string;
}

export interface Instructor {
    description: string;
    has_instructor_page: boolean;
    image: string;
    name: string;
    short_description: string;
    slug: string;
}

export interface Feature {
    icon: string;
    id: string;
    subtitle: string;
    title: string;
}

export interface Pointer {
    color: string;
    icon: string;
    id: string;
    text: string;
}

export interface AboutItem {
    description: string;
    icon: string;
    id: string;
    title: string;
}

export interface Testimonial {
    description: string;
    id: string;
    name: string;
    profile_image: string;
    testimonial: string;
    thumb?: string;
    video_type: string;
    video_url?: string;
}

export interface FAQ {
    answer: string;
    id: string;
    question: string;
}

export interface ExclusiveFeature {
    checklist: string[];
    file_type: string;
    file_url: string;
    id: string;
    title: string;
    video_thumbnail: string;
    video_url?: string;
}

export interface Section {
    type: string;
    name: string;
    description: string;
    bg_color: string;
    order_idx: number;
    values: any[];
}

export interface ProductData {
    slug: string;
    id: number;
    title: string;
    description: string;
    platform: string;
    type: string;
    modality: string;
    old_info: {
        cat_id: number;
        course_id: number;
        platform: string;
        skills_cat_id: number;
        slug: string;
    };
    start_at: string;
    media: Medium[];
    checklist: Checklist[];
    seo: Seo[];
    cta_text: CtaText;
    sections: Section[];
    is_cohort_based_course: boolean;
    secondary_cta_group: any[];
    delivery_method: string;
}

export interface ProductResponse {
    code: number;
    data: ProductData;
    error: any[];
    message: string;
    payload: any[];
    status_code: number;
}
