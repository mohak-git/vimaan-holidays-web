import { Calendar, ChevronDown, MapPin } from "lucide-react";
import FieldSeparator from "../elements/FieldSeparator";
import InputField from "../elements/InputField";

export default function ActivitiesForm() {
    return (
        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-0 border border-black/10 rounded-2xl p-2 bg-white">
            <InputField label="City or Destination" value="Dubai" detail="UAE" icon={MapPin} />

            <FieldSeparator />
            <InputField label="Date" value="Select Date" detail="Optional" icon={Calendar} />

            <FieldSeparator />
            <InputField
                label="Category"
                value="All Activities"
                detail="Theme Parks, Safaris..."
                icon={ChevronDown}
            />
        </div>
    );
}
