import type { BookingAddons } from "@/types/flights/booking";
import { ArmchairIcon, Luggage, ShieldCheck, UtensilsCrossed } from "lucide-react";

interface AddonsSummaryProps {
    addons: BookingAddons;
}

export default function AddonsSummary({ addons }: AddonsSummaryProps) {
    const items: { icon: React.ElementType; text: string }[] = [];
    if (addons.seats.length > 0) items.push({ icon: ArmchairIcon, text: `${addons.seats.length} seat(s) selected` });
    if (addons.meals.length > 0) items.push({ icon: UtensilsCrossed, text: `${addons.meals.length} meal(s) added` });
    if (addons.extraBaggage > 0) items.push({ icon: Luggage, text: `${addons.extraBaggage}kg extra baggage` });
    if (addons.insurance) items.push({ icon: ShieldCheck, text: "Travel insurance added" });

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
