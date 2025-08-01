const RatingDisplay = ({ ratingData }: { ratingData: any }) => {
    if (!ratingData) return null;
    return (
        <div className="flex flex-wrap items-center gap-2 my-4">
            <div className="flex  text-yellow-400 text-sm md:text-lg">⭐⭐⭐⭐⭐</div>
            <span className="text-gray-50 text-sm">
                { ratingData.rating_text}
            </span>
        </div>
    );
};

export default RatingDisplay;
