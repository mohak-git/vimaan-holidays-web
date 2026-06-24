export default function DashboardSkeleton() {
    return (
        <div className="space-y-8" aria-hidden>
            <div className="space-y-3">
                <div className="h-9 w-80 animate-pulse rounded-lg bg-sand-dark" />
                <div className="h-5 w-56 animate-pulse rounded bg-sand-dark" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="h-72 animate-pulse rounded-2xl bg-sand-dark md:col-span-2" />
                <div className="h-72 animate-pulse rounded-2xl bg-sand-dark" />
                <div className="h-48 animate-pulse rounded-2xl bg-sand-dark md:col-span-3" />
            </div>
        </div>
    );
}
