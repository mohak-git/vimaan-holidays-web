import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatPrice";

export interface PriceBreakupLineItem {
    key: string;
    label: string;
    value: number;
    highlight?: boolean;
    invertSign?: boolean;
}

interface PriceBreakupProps {
    lineItems: PriceBreakupLineItem[];
    grandTotal: number;
    className?: string;
    title?: string;
}

export function PriceBreakup({ lineItems, grandTotal, className, title = "Price Breakup" }: PriceBreakupProps) {
    return (
        <div className={cn("bg-white rounded-xl p-4 border border-sand-dark shadow-soft", className)}>
            <h3 className="font-semibold font-serif text-lg mb-4">{title}</h3>
            <div className="space-y-2 text-sm">
                {lineItems.map((item) => {
                    if (item.value === 0 && item.key !== "baseFare") return null;
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
                                {formatPrice(item.value)}
                            </span>
                        </div>
                    );
                })}
                <div className="border-t border-sand-dark pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                        <span>Grand Total</span>
                        <span className="text-coral">{formatPrice(grandTotal)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
