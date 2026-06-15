import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
    number: number;
    label: string;
    shortLabel: string;
}

const STEPS: Step[] = [
    { number: 1, label: "Traveller Details", shortLabel: "Details" },
    { number: 2, label: "Seats & Add-ons", shortLabel: "Add-ons" },
    { number: 3, label: "Payment", shortLabel: "Payment" },
];

interface Props {
    currentStep: number;
}

export default function BookingStepper({ currentStep }: Props) {
    const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

    return (
        <div className="w-full bg-white rounded-xl p-4 shadow-soft border border-sand-dark">
            <div className="relative flex items-center justify-between">
                <div className="absolute inset-x-0 top-4 h-0.5 bg-sand-dark" />
                <div
                    className="absolute left-0 top-4 h-0.5 bg-green-500 transition-all"
                    style={{ width: `${progress}%` }}
                />

                {STEPS.map((step) => {
                    const completed = currentStep > step.number;
                    const active = currentStep === step.number;

                    return (
                        <div key={step.number} className="flex flex-col items-center z-1">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                                    completed
                                        ? "bg-green-500 text-white"
                                        : active
                                          ? "bg-coral text-white"
                                          : "bg-sand-dark text-ink/40",
                                )}
                            >
                                {completed ? <Check className="w-4 h-4" /> : step.number}
                            </div>
                            <span className="hidden sm:block text-xs mt-1 font-medium text-ink/60">
                                {step.label}
                            </span>
                            <span className="sm:hidden text-xs mt-1 font-medium text-ink/60">
                                {step.shortLabel}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
