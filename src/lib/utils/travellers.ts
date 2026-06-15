export interface TravellerCount {
    adults: number;
    children?: number;
    infants?: number;
}

export function formatTravellers(t: TravellerCount): string {
    const parts: string[] = [];
    if (t.adults > 0) parts.push(`${t.adults} ${t.adults === 1 ? "Adult" : "Adults"}`);
    if ((t.children ?? 0) > 0) parts.push(`${t.children} ${(t.children ?? 0) === 1 ? "Child" : "Children"}`);
    if ((t.infants ?? 0) > 0) parts.push(`${t.infants} ${(t.infants ?? 0) === 1 ? "Infant" : "Infants"}`);
    return parts.join(", ") || "1 Adult";
}

export function totalTravellers(t: TravellerCount): number {
    return t.adults + (t.children ?? 0) + (t.infants ?? 0);
}
