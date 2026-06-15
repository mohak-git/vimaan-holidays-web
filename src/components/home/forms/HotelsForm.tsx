import { Calendar, MapPin, Users } from "lucide-react";
import FieldSeparator from "../elements/FieldSeparator";
import FormContainer from "../elements/FormContainer";
import InputField from "../elements/InputField";

export default function HotelsForm() {
    return (
        <FormContainer>
            <div className="flex-[1.5]">
                <InputField
                    label="City, Property or Location"
                    value="Goa, India"
                    detail="1,245 properties found"
                    icon={MapPin}
                />
            </div>

            <FieldSeparator />
            <InputField label="Check-in" value="10 Jun '26" detail="Wednesday" icon={Calendar} />

            <FieldSeparator />
            <InputField label="Check-out" value="14 Jun '26" detail="Sunday" icon={Calendar} />

            <FieldSeparator />
            <InputField
                label="Rooms & Guests"
                value="1 Room, 2 Adults"
                detail="No children"
                icon={Users}
            />
        </FormContainer>
    );
}
