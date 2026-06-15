export function StopsBadge({ stops }: { stops: number }) {
    if (stops === 0) return <span className="text-xs text-green-600 font-medium">Non-stop</span>;
    if (stops === 1) return <span className="text-xs text-amber-600 font-medium">1 Stop</span>;
    return <span className="text-xs text-red-600 font-medium">{stops} Stops</span>;
}
