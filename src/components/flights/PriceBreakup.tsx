import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { PriceBreakdown } from "@/types/flights/booking";

interface Props {
    breakdown: PriceBreakdown;
    className?: string;
}

interface LineItem {
    key: keyof PriceBreakdown;
    label: string;
    showIf?: (b: PriceBreakdown) => boolean;
    highlight?: boolean;
    invertSign?: boolean;
}

const lineItems: LineItem[] = [
    { key: "baseFare", label: "Base Fare" },
    { key: "taxes", label: "Taxes & Fees (18%)" },
    { key: "seatTotal", label: "Seat Selection", showIf: (b) => b.seatTotal > 0 },
    { key: "mealTotal", label: "Meals", showIf: (b) => b.mealTotal > 0 },
    { key: "baggageTotal", label: "Extra Baggage", showIf: (b) => b.baggageTotal > 0 },
    { key: "insurance", label: "Travel Insurance", showIf: (b) => b.insurance > 0 },
    { key: "convenienceFee", label: "Convenience Fee" },
    {
        key: "promoDiscount",
        label: "Promo Discount",
        showIf: (b) => b.promoDiscount > 0,
        highlight: true,
        invertSign: true,
    },
];

export default function PriceBreakup({ breakdown, className }: Props) {
    return (
        <div
            className={cn("bg-white rounded-xl p-4 border border-sand-dark shadow-soft", className)}
        >
            <h3 className="font-semibold font-serif text-lg mb-4">Price Breakup</h3>

            <div className="space-y-2 text-sm">
                {lineItems.map((item) => {
                    if (item.showIf && !item.showIf(breakdown)) return null;

                    const value = breakdown[item.key] as number;

                    return (
                        <div
                            key={item.key}
                            className={cn(
                                "flex justify-between",
                                item.highlight && "text-green-600",
                            )}
                        >
                            <span>{item.label}</span>
                            <span className="font-medium">
                                {item.invertSign ? "-" : ""}
                                {formatPrice(value)}
                            </span>
                        </div>
                    );
                })}

                <div className="border-t border-sand-dark pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                        <span>Grand Total</span>
                        <span className="text-coral">{formatPrice(breakdown.grandTotal)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
