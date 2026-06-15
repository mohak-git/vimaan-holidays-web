import { Clock, MapPin, Users } from "lucide-react";

const tips = [
    { icon: Clock, title: "Web Check-in", desc: "Opens 48 hours before departure" },
    { icon: MapPin, title: "Airport Arrival", desc: "Arrive at airport 2 hours before departure" },
    { icon: Users, title: "Valid ID Required", desc: "Carry a valid photo ID for all passengers" },
];

export default function TravelTips() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {tips.map(({ icon: Icon, title, desc }) => (
                <div
                    key={title}
                    className="flex gap-3 items-center bg-white rounded-xl p-4 border border-sand-dark"
                >
                    <Icon className="w-6 h-6 text-coral" />
                    <div>
                        <h4 className="font-semibold text-sm">{title}</h4>
                        <p className="text-xs text-ink/50">{desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
