import { useUserStore } from "@/store/useUserStore";
import type { SavedTraveller } from "@/types/user";

export function getSavedTravellers(): SavedTraveller[] {
    const { savedTravellers } = useUserStore();
    return savedTravellers.length > 0 ? savedTravellers : [];
}
