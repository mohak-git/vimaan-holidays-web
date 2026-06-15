const ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomString(length: number): string {
    let result = "";
    for (let i = 0; i < length; i++)
        result += ALPHANUM.charAt(Math.floor(Math.random() * ALPHANUM.length));

    return result;
}

export function generateBookingRef(): string {
    const year = new Date().getFullYear();
    return `FLT-${year}-${randomString(5)}`;
}

export function generatePNR(): string {
    return randomString(6);
}


