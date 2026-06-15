import { Calendar, MapPin, Users } from "lucide-react";
import FieldSeparator from "../elements/FieldSeparator";
import FormContainer from "../elements/FormContainer";
import InputField from "../elements/InputField";

export default function ToursForm() {
    return (
        <FormContainer>
            <div className="flex-[1.5]">
                <InputField
                    label="Destination"
                    value="Europe"
                    detail="France, Swiss, Italy"
                    icon={MapPin}
                />
            </div>

            <FieldSeparator />
            <InputField label="When" value="Flexible" detail="Anytime in Sep '26" icon={Calendar} />

            <FieldSeparator />
            <InputField label="Travellers" value="2 Adults" detail="1 Room" icon={Users} />
        </FormContainer>
    );
}
