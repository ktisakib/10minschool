const HeroBackground = () => (
    <div className="min-h-75 max-w-screen w-full flex items-center isolate absolute bg-black">
        <div
            className="absolute inset-0 z-0"
            style={ {
                backgroundImage: `
          radial-gradient(circle at 90% 100%, rgba(19, 47, 105, 0.5) 0%, transparent 60%),
          radial-gradient(circle at 90% 100%, rgba(19, 47, 105, 0.4) 0%, transparent 30%),
          radial-gradient(circle at 90% 100%, rgba(19, 47, 105, 0.3) 0%, transparent 10%)
        `,
            } }
        />
    </div>
);

export default HeroBackground;
