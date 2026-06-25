export default function BookingsSkeleton() {
    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="h-9 w-48 animate-pulse rounded-lg bg-sand-dark" />
                <div className="h-5 w-64 animate-pulse rounded bg-sand-dark" />
            </div>
            <div className="flex items-center gap-4 border-b border-sand-dark pb-px">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-24 animate-pulse rounded bg-sand-dark" />
                ))}
            </div>
            <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-44 animate-pulse rounded-2xl bg-sand-dark" />
                ))}
            </div>
        </div>
    );
}
