function SkeletonField() {
    return (
        <div className="space-y-1.5">
            <div className="h-3 w-16 animate-pulse rounded bg-sand-dark" />
            <div className="h-10 animate-pulse rounded-lg bg-sand-dark" />
        </div>
    );
}

export default function AuthCardSkeleton() {
    return (
        <div className="space-y-5" role="status" aria-label="Loading form">
            <SkeletonField />
            <SkeletonField />

            <div className="flex justify-end">
                <div className="h-3 w-28 animate-pulse rounded bg-sand-dark" />
            </div>

            <div className="h-11 animate-pulse rounded-xl bg-coral/20" />
            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-sand-dark" />
                <div className="h-3 w-24 animate-pulse rounded bg-sand-dark" />
                <div className="h-px flex-1 bg-sand-dark" />
            </div>

            <div className="flex items-center justify-center gap-3 h-11 animate-pulse rounded-xl border border-sand-dark" />
            <div className="flex justify-center">
                <div className="h-3 w-40 animate-pulse rounded bg-sand-dark" />
            </div>
        </div>
    );
}
