"use client";

import { Calendar, MapPin } from "lucide-react";
import { useCallback, useState } from "react";
import { CAB_TRIP_TYPES } from "../constants";
import FieldSeparator from "../elements/FieldSeparator";
import FormContainer from "../elements/FormContainer";
import InputField from "../elements/InputField";
import SegmentedControl from "../elements/SegmentedControl";
import { CabTripType } from "../types";

export default function CabsForm() {
    const [tripType, setTripType] = useState<CabTripType>("Outstation");

    const handleSelectTrip = useCallback((type: CabTripType) => setTripType(type), []);

    return (
        <div className="w-full flex flex-col gap-4">
            <SegmentedControl
                options={CAB_TRIP_TYPES}
                active={tripType}
                onSelect={handleSelectTrip}
            />

            <FormContainer>
                <InputField
                    label="Pickup Location"
                    value="Indira Nagar, Bangalore"
                    detail="Karnataka"
                    icon={MapPin}
                />

                <FieldSeparator />
                <InputField label="Drop Location" value="Mysore" detail="Karnataka" icon={MapPin} />

                <FieldSeparator />
                <InputField
                    label="Pickup Date"
                    value="28 May '26"
                    detail="10:00 AM"
                    icon={Calendar}
                />
            </FormContainer>
        </div>
    );
}
