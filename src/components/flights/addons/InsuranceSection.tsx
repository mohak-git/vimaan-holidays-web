import InsuranceCard from "@/components/flights/InsuranceCard";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import type { InsuranceSectionProps } from "./types";

export default function InsuranceSection({ insuranceAdded, onToggle }: InsuranceSectionProps) {
    return (
        <div className="bg-white rounded-xl shadow-soft border border-sand-dark p-6">
            <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-5 h-5 text-coral" />
                <h2 className="font-semibold font-serif text-xl">Protect Your Trip</h2>
            </div>
            <InsuranceCard
                added={insuranceAdded}
                onToggle={() => {
                    onToggle();
                    if (!insuranceAdded) toast.success("Insurance added");
                }}
            />
        </div>
    );
}
