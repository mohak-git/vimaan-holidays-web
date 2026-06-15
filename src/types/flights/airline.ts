import { AIRLINE_CODES } from "@/config/constants";

export type AirlineCode = (typeof AIRLINE_CODES)[number];

export interface Airline {
    code: AirlineCode;
    name: string;
    color: string;
    logo: string;
}
