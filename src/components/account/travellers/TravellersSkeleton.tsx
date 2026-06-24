export default function TravellersSkeleton() {
    return (
        <div className="space-y-8" aria-hidden>
            <div className="space-y-3">
                <div className="h-9 w-80 animate-pulse rounded-lg bg-sand-dark" />
                <div className="h-5 w-56 animate-pulse rounded bg-sand-dark" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-sand-dark bg-white p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-12 w-12 animate-pulse rounded-full bg-sand-dark" />
                            <div className="flex-1 space-y-2">
                                <div className="h-5 w-32 animate-pulse rounded bg-sand-dark" />
                                <div className="h-4 w-24 animate-pulse rounded bg-sand-dark" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
