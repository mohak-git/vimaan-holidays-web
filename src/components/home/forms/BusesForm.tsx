import { Calendar, MapPin } from "lucide-react";
import FieldSeparator from "../elements/FieldSeparator";
import FormContainer from "../elements/FormContainer";
import InputField from "../elements/InputField";
import SwapLocationsButton from "../elements/SwapLocationsButton";

export default function BusesForm() {
    return (
        <FormContainer>
            <InputField label="From" value="Mumbai" detail="Maharashtra" icon={MapPin} />

            <SwapLocationsButton />
            <InputField label="To" value="Pune" detail="Maharashtra" icon={MapPin} />

            <FieldSeparator />
            <InputField label="Travel Date" value="Tomorrow" detail="25 May '26" icon={Calendar} />
        </FormContainer>
    );
}
