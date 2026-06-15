import { PriceBreakup as GenericPriceBreakup } from "@/components/ui/PriceBreakup";
import type { PriceBreakdown } from "@/types/flights/booking";

interface PriceBreakupProps {
    breakdown: PriceBreakdown;
    className?: string;
}

export default function PriceBreakup({ breakdown, className }: PriceBreakupProps) {
    const lineItems = [
        { key: "baseFare", label: "Base Fare", value: breakdown.baseFare },
        { key: "taxes", label: "Taxes & Fees (18%)", value: breakdown.taxes },
        {
            key: "seatTotal",
            label: "Seat Selection",
            value: breakdown.seatTotal,
        },
        { key: "mealTotal", label: "Meals", value: breakdown.mealTotal },
        { key: "baggageTotal", label: "Extra Baggage", value: breakdown.baggageTotal },
        { key: "insurance", label: "Travel Insurance", value: breakdown.insurance },
        ...(breakdown.convenienceFee > 0
            ? [{ key: "convenienceFee", label: "Convenience Fee", value: breakdown.convenienceFee }]
            : []),
        {
            key: "promoDiscount",
            label: "Promo Discount",
            value: breakdown.promoDiscount,
            highlight: true,
            invertSign: true,
        },
    ];

    return (
        <GenericPriceBreakup
            lineItems={lineItems}
            grandTotal={breakdown.grandTotal}
            className={className}
        />
    );
}
