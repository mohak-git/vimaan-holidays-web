import { Calendar, MapPin } from "lucide-react";
import FieldSeparator from "../elements/FieldSeparator";
import FormContainer from "../elements/FormContainer";
import InputField from "../elements/InputField";

export default function CruiseForm() {
    return (
        <FormContainer>
            <InputField
                label="Destination Region"
                value="Mediterranean"
                detail="Europe"
                icon={MapPin}
            />

            <FieldSeparator />
            <InputField label="Departure Port" value="Any Port" detail="Flexible" icon={MapPin} />

            <FieldSeparator />
            <InputField label="Travel Month" value="Aug 2026" detail="Flexible" icon={Calendar} />
        </FormContainer>
    );
}
