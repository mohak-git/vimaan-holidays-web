import { Calendar, MapPin } from "lucide-react";
import FieldSeparator from "../elements/FieldSeparator";
import FormContainer from "../elements/FormContainer";
import InputField from "../elements/InputField";

export default function VisaForm() {
    return (
        <FormContainer>
            <InputField
                label="Going to"
                value="United Kingdom"
                detail="Tourist Visa"
                icon={MapPin}
            />

            <FieldSeparator />
            <InputField
                label="Travelling from"
                value="India"
                detail="Indian Passport"
                icon={MapPin}
            />

            <FieldSeparator />
            <InputField label="Travel Month" value="July 2026" detail="Estimated" icon={Calendar} />
        </FormContainer>
    );
}
