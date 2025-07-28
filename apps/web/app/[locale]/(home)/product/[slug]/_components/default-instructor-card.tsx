const DEFAULT_INSTRUCTOR = {
    name: "Munzereen Shahid",
    credentials: [
        "MSc (English), University of Oxford (UK);",
        "BA, MA (English), University of Dhaka;",
        "IELTS: 8.5"
    ]
};

const DefaultInstructorCard = () => (
    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
        <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-2xl">👨‍🏫</span>
            </div>
        </div>

        <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{ DEFAULT_INSTRUCTOR.name }</h3>
            <div className="space-y-1 text-sm text-gray-600">
                { DEFAULT_INSTRUCTOR.credentials.map((credential, index) => (
                    <p key={ index } className={ index === 2 ? "font-medium" : "" }>
                        { credential }
                    </p>
                )) }
            </div>
        </div>
    </div>
);

export default DefaultInstructorCard;
