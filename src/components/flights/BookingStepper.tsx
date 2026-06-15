import { BookingStepper as GenericBookingStepper, type Step } from "@/components/ui/BookingStepper";

const STEPS: Step[] = [
    { number: 1, label: "Traveller Details", shortLabel: "Details" },
    { number: 2, label: "Seats & Add-ons", shortLabel: "Add-ons" },
    { number: 3, label: "Payment", shortLabel: "Payment" },
];

interface BookingStepperProps {
    currentStep: number;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
    return <GenericBookingStepper steps={STEPS} currentStep={currentStep} />;
}
