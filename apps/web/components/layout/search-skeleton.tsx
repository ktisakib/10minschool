import { Skeleton } from "@enterprise/ui/components/skeleton";

interface SearchSuggestionSkeletonProps {
    count?: number;
}

export function SearchSuggestionSkeleton({
    count = 3,
}: SearchSuggestionSkeletonProps) {
    return (
        <div className='py-2'>
            <div className='px-4 py-2 border-b border-border'>
                <Skeleton className='h-3 w-24' />
            </div>
            { Array.from({ length: count }).map((_, index) => (
                <div
                    key={ index }
                    className='flex items-center gap-3 px-4 py-2'>
                    <Skeleton className='h-4 w-4 flex-shrink-0' />
                    <div className='flex-1 space-y-1'>
                        <Skeleton className='h-4 w-3/4' />
                        <Skeleton className='h-3 w-1/2' />
                    </div>
                </div>
            )) }
        </div>
    );
}
