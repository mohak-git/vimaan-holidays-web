import { ArmchairIcon, Luggage, ShieldCheck, UtensilsCrossed } from "lucide-react";
import type { BookingAddons } from "@/types/flights/booking";

interface AddonsSummaryProps {
    addons: BookingAddons;
}

export default function AddonsSummary({ addons }: AddonsSummaryProps) {
    const items = [
        addons.seats.length > 0 && {
            icon: ArmchairIcon,
            text: `${addons.seats.length} seat(s) selected`,
        },
        addons.meals.length > 0 && {
            icon: UtensilsCrossed,
            text: `${addons.meals.length} meal(s) added`,
        },
        addons.extraBaggage > 0 && {
            icon: Luggage,
            text: `${addons.extraBaggage}kg extra baggage`,
        },
        addons.insurance && {
            icon: ShieldCheck,
            text: "Travel insurance added",
        },
    ].filter(Boolean) as { icon: React.ElementType; text: string }[];

    if (items.length === 0) return null;

    return (
        <div className="bg-white rounded-xl p-6 border border-sand-dark shadow-soft mb-8">
            <h3 className="font-semibold font-serif text-lg mb-4">Add-ons Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-sm">
                        <Icon className="w-4 h-4 text-coral shrink-0" />
                        <span>{text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
