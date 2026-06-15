import { ArrowRightLeft } from "lucide-react";
import { memo } from "react";

interface Props {
    onClick?: () => void;
}

const SwapLocationsButton = memo(function SwapLocationsButton({ onClick }: Props) {
    return (
        <div className="hidden md:flex items-center justify-center -mx-3 z-1">
            <button
                type="button"
                onClick={onClick}
                aria-label="Swap departure and destination"
                className="bg-white border border-black/10 p-1.5 rounded-full shadow-sm cursor-pointer hover:shadow-md transition-shadow text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
                <ArrowRightLeft className="w-4 h-4" />
            </button>
        </div>
    );
});

export default SwapLocationsButton;
