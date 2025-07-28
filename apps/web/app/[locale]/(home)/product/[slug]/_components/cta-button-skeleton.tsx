import { Skeleton } from "@enterprise/ui/components/skeleton";

export const CtaButtonSkeleton = () => {
    return (
        <div className="space-y-4 p-4 bg-white rounded-lg">
            {/* Price Section */ }
            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-20" /> {/* Final price */ }
                <Skeleton className="h-6 w-16" /> {/* Original price */ }
                <Skeleton className="h-6 w-16 rounded-full" /> {/* Discount badge */ }
            </div>

            {/* CTA Button */ }
            <Skeleton className="h-12 w-full rounded-md" />
        </div>
    );
};
