export default function Logo({ size = 40 }: { size?: number }) {
    return (
        <div className="flex items-center gap-3">
            <img
                src="/icons/mandipro.png"
                alt="Mandi Pro"
                width={size}
                height={size}
                className="rounded-md object-cover"
            />
            <div className="hidden flex-col leading-tight sm:flex">
                <span className="text-lg font-semibold text-emerald-900">
                    Mandi Pro
                </span>
                <span className="text-xs text-neutral-500">
                    Trade management for mandi businesses
                </span>
            </div>
        </div>
    );
}
