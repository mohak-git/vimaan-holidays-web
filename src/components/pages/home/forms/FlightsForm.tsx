"use client";

import { Calendar, MapPin, Users } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { FLIGHT_TRIP_TYPES, SPECIAL_FARES } from "../constants";
import FieldSeparator from "../elements/FieldSeparator";
import FormContainer from "../elements/FormContainer";
import InputField from "../elements/InputField";
import SegmentedControl from "../elements/SegmentedControl";
import SwapLocationsButton from "../elements/SwapLocationsButton";
import { FlightTripType } from "../types";

const SpecialFaresList = memo(function SpecialFaresList() {
    return (
        <div className="flex flex-wrap items-center px-2 gap-2">
            <span className="text-xs font-medium text-ink/60 uppercase tracking-wider">
                Special Fares:
            </span>
            <ul className="flex gap-4">
                {SPECIAL_FARES.map((fare) => (
                    <button
                        key={fare}
                        type="button"
                        className={`text-xs px-3 py-1 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-coral ${
                            fare === "Regular"
                                ? "border-coral text-coral bg-coral/5"
                                : "border-black/10 text-ink/70 hover:border-black/20"
                        }`}
                    >
                        {fare}
                    </button>
                ))}
            </ul>
        </div>
    );
});

export default function FlightsForm() {
    const [tripType, setTripType] = useState<FlightTripType>("One Way");

    const handleSelectTripType = useCallback((type: FlightTripType) => setTripType(type), []);

    return (
        <div className="w-full flex flex-col gap-4">
            <SegmentedControl
                options={FLIGHT_TRIP_TYPES}
                active={tripType}
                onSelect={handleSelectTripType}
            />

            <FormContainer>
                <InputField
                    label="From"
                    value="New Delhi"
                    detail="DEL, Indira Gandhi Airport"
                    icon={MapPin}
                />

                <SwapLocationsButton />
                <InputField
                    label="To"
                    value="Bengaluru"
                    detail="BLR, Kempegowda Airport"
                    icon={MapPin}
                />

                <FieldSeparator />
                <InputField label="Departure" value="24 May '26" detail="Sunday" icon={Calendar} />

                <FieldSeparator />
                <InputField
                    label="Return"
                    value="Add return"
                    detail="Save more on round trips"
                    icon={Calendar}
                />

                <FieldSeparator />
                <InputField
                    label="Travellers & Class"
                    value="1 Traveller"
                    detail="Economy"
                    icon={Users}
                />
            </FormContainer>

            <SpecialFaresList />
        </div>
    );
}
