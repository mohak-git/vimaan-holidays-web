import { PriceBreakup, type PriceBreakupLineItem } from "@/components/ui/PriceBreakup";
import type { Booking } from "@/types/flights/booking";

export function PaymentSummary({ booking }: { booking: Booking }) {
    const { payment } = booking;

    const lineItems: PriceBreakupLineItem[] = [
        { key: "baseFare", label: "Base Fare", value: payment.baseFare },
        { key: "taxes", label: "Taxes & Surcharges", value: payment.taxes },
    ];
    if (payment.addons > 0)
        lineItems.push({ key: "addons", label: "Add-ons", value: payment.addons });
    if (payment.promoDiscount > 0) {
        lineItems.push({
            key: "promo",
            label: "Promo Discount",
            value: payment.promoDiscount,
            highlight: true,
            invertSign: true,
        });
    }

    if (payment.convenienceFee > 0)
        lineItems.push({ key: "fee", label: "Convenience Fee", value: payment.convenienceFee });

    return (
        <PriceBreakup
            title="Payment Summary"
            lineItems={lineItems}
            grandTotal={payment.total}
            className="rounded-2xl p-6 shadow-sm"
        />
    );
}
