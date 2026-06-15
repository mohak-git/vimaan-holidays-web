import type { PassengerDetails, PassengerType } from "@/types/flights/booking";

export const TYPE_LABEL: Record<PassengerType, string> = {
    adult: "Adult",
    child: "Child",
    infant: "Infant",
};

export function emptyPassenger(id: string, type: PassengerType): PassengerDetails {
    return {
        id,
        type,
        title: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        nationality: "Indian",
        phone: "",
        email: "",
    };
}

export function isDuplicate(
    passengers: PassengerDetails[],
    data: { firstName: string; lastName: string; dateOfBirth: string },
    excludeIndex: number,
): boolean {
    const norm = (s: string) => s.trim().toLowerCase();
    return passengers.some(
        (p, i) =>
            i !== excludeIndex &&
            norm(p.firstName) === norm(data.firstName) &&
            norm(p.lastName) === norm(data.lastName) &&
            p.dateOfBirth === data.dateOfBirth,
    );
}

export function countOfTypeUpTo(
    passengers: PassengerDetails[],
    type: PassengerType,
    upToIndex: number,
): number {
    let count = 0;
    for (let i = 0; i <= upToIndex; i++) if (passengers[i].type === type) count++;

    return count;
}

export function generateInitialPassengers(
    adults: number,
    children: number,
    infants: number,
): PassengerDetails[] {
    const result: PassengerDetails[] = [];
    let id = 0;
    for (let i = 0; i < adults; i++) result.push(emptyPassenger(`p-${id++}`, "adult"));
    for (let i = 0; i < children; i++) result.push(emptyPassenger(`p-${id++}`, "child"));
    for (let i = 0; i < infants; i++) result.push(emptyPassenger(`p-${id++}`, "infant"));
    return result;
}
