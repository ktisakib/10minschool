
import { getProductVariants } from "@/lib/api/variant";
import { Button } from "@enterprise/ui/components/button";
import { Badge } from "@enterprise/ui/components/badge";
import { getTranslations } from "next-intl/server";

interface CtaButtonProps {
    slug: string;
    ctaText?: {
        name: string;
        value: string;
    };
}

const CtaButton = async ({ slug, ctaText }: CtaButtonProps) => {
    const t = await getTranslations("Product.cta_button");

    try {
        const variants = await getProductVariants(slug);
        const firstVariant = variants[0]; // Get the first variant as default

        if (!firstVariant) {
            return (
                <div className="space-y-4 p-4 bg-white rounded-lg">
                    <Button className="w-full h-12 bg-[#48B34A] hover:bg-[#3FA73F] text-white font-medium text-lg">
                        { ctaText?.value || t("default_text") }
                    </Button>
                </div>
            );
        }

        const hasDiscount = firstVariant.discount_amount > 0;

        return (
            <div className="space-y-4 p-4 bg-white rounded-lg">
                {/* Price Section */ }
                <div className="flex items-center gap-4 flex-wrap">
                    {/* Final Price */ }
                    <span className="text-2xl font-bold text-gray-900">
                        ৳{ firstVariant.final_price.toLocaleString() }
                    </span>

                    { hasDiscount && (
                        <>
                            {/* Original Price */ }
                            <span className="text-xl text-gray-500 line-through">
                                ৳{ firstVariant.price.toLocaleString() }
                            </span>

                            <Badge className="bg-orange-500 relative overflow-visible  isolate px-[7px] text-white text-sm py-[3px] rounded before:content-[''] before:size-0 before:absolute border-l-5 before:top-px border-l-orange-500 before:block before:-left-4 before:border-t-12 before:border-t-transparent  before:border-b-12 before:border-b-transparent before:border-r-12 before:border-r-orange-500">
                                { firstVariant.discount_amount }৳ { t("discount") }
                            </Badge>
                        </>
                    ) }
                </div>

                {/* CTA Button */ }
                <Button className="w-full h-12 bg-primary/90 hover:bg-primary text-white font-medium text-lg rounded-md">
                    { ctaText?.name || t("default_text") }
                </Button>
            </div>
        );
    } catch (error) {
        console.error("Error in CTA Button:", error);

        // Fallback UI
        return (
            <div className="space-y-4 p-4 bg-background rounded-lg">
                <Button className="w-full h-12 bg-primary hover:bg-primary text-white font-medium text-lg rounded-md">
                    { ctaText?.name || t("default_text") }
                </Button>
            </div>
        );
    }
};

export default CtaButton;
