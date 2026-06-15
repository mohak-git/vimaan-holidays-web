import { savedTravellers as mockSavedTravellers } from "@/lib/mock/savedTravellers";
import type { SavedTraveller } from "@/types/user";

export function getSavedTravellers(): SavedTraveller[] {
    return mockSavedTravellers;
}
