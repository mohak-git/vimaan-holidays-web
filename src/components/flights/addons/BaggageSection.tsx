import BaggageSelector from "@/components/flights/BaggageSelector";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { BaggageSectionProps } from "./types";

export default function BaggageSection({
    passengers,
    baggageOptions,
    extraBaggage,
    onBaggageSelect,
    getPassengerLabel,
}: BaggageSectionProps) {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {baggageOptions.map((opt) => (
                    <div
                        key={opt.id}
                        className="border border-sand-dark rounded-lg py-2.5 text-center"
                    >
                        <p className="text-sm font-semibold text-ink">{opt.label}</p>
                        <p className="text-xs font-medium text-coral">{formatPrice(opt.price)}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-3">
                {passengers.map((p, idx) => {
                    const baggage = extraBaggage.find((b) => b.passengerId === p.id);
                    return (
                        <div key={p.id}>
                            {idx > 0 && <hr className="border-sand-dark mb-3" />}
                            <BaggageSelector
                                options={baggageOptions}
                                selectedBaggageId={baggage?.baggageId ?? null}
                                passengerName={getPassengerLabel(idx)}
                                onSelect={onBaggageSelect(p.id)}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
