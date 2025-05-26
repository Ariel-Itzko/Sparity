import CBtn1 from "../../../components/common/CBtn1";

export default function HeroSection() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                background: `
      radial-gradient(circle at 10% 50%, rgba(255, 255, 255, 0.1), transparent 60%),
      linear-gradient(to right, black, var(--primary-text-color))
    `,
            }}
        >
            <div className="hero-overlay bg-black/40 backdrop-blur-sm"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md flex flex-col items-center">
                    <h1 className="mb-5 text-5xl font-bold text-[var(--primary-text-color)]">Connect. Create. Get Paid.</h1>
                    <p className="mb-5">
                        Sparity helps content creators and brands team up for powerful paid promotions — with flexible pricing, performance-based deals, and complete transparency.
                    </p>
                    <CBtn1 />
                </div>
            </div>
        </div>
    )
}
