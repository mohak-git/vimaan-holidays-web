interface SkeletonCardProps {
    lines?: number;
    className?: string;
}

export function SkeletonCard({ lines = 3, className }: SkeletonCardProps) {
    return (
        <div className={`bg-white rounded-xl p-5 shadow-soft animate-pulse border border-sand-dark ${className ?? ""}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                {Array.from({ length: lines }).map((_, i) => (
                    <div key={i} className="flex-1 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sand-dark shrink-0" />
                        <div className="space-y-2 flex-1">
                            <div className="h-3 w-3/4 bg-sand-dark rounded" />
                            <div className="h-3 w-1/2 bg-sand-dark rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
