export default function SkeletonFlightCard() {
    return (
        <div className="bg-white rounded-xl p-5 shadow-soft animate-pulse border border-sand-dark">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 min-w-[160px]">
                    <div className="w-10 h-10 rounded-lg bg-sand-dark" />
                    <div className="space-y-2">
                        <div className="h-3 w-20 bg-sand-dark rounded" />
                        <div className="h-3 w-14 bg-sand-dark rounded" />
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-between gap-4">
                    <div className="space-y-2">
                        <div className="h-4 w-12 bg-sand-dark rounded" />
                        <div className="h-3 w-16 bg-sand-dark rounded" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-3 w-16 bg-sand-dark rounded" />
                        <div className="h-6 w-20 bg-sand-dark rounded" />
                        <div className="h-3 w-16 bg-sand-dark rounded" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-12 bg-sand-dark rounded" />
                        <div className="h-3 w-16 bg-sand-dark rounded" />
                    </div>
                </div>
                <div className="hidden md:block w-px h-12 bg-sand-dark" />
                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                    <div className="h-6 w-20 bg-sand-dark rounded" />
                    <div className="h-8 w-24 bg-sand-dark rounded-lg" />
                </div>
            </div>
        </div>
    );
}

