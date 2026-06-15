"use client";

import { CONVENIENCE_FEE, INSURANCE_PER_PERSON } from "@/config/constants";
import type { PassengerFormData } from "@/lib/schemas/passenger";
import { passengerSchema } from "@/lib/schemas/passenger";
import { getSavedTravellers } from "@/lib/services/savedTravellers";
import {
    countOfTypeUpTo,
    emptyPassenger,
    generateInitialPassengers,
    isDuplicate,
    TYPE_LABEL,
} from "@/lib/utils/booking";
import { calculateTotal } from "@/lib/utils/pricing";
import { useBookingStore } from "@/store/useBookingStore";
import { useFlightSearchStore } from "@/store/useFlightSearchStore";
import type { PassengerDetails, PassengerType } from "@/types/flights/booking";
import type { SavedTraveller } from "@/types/user";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export function useBookingForm() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const {
        flightId,
        selectedFare,
        farePrice,
        flightDetails,
        fareType,
        setPassengers,
        passengers: storedPassengers,
        contactDetails: storedContact,
    } = useBookingStore();
    const { travellers: searchTravellers } = useFlightSearchStore();

    const [savedTravellerOpen, setSavedTravellerOpen] = useState(false);
    const [activePassengerIdx, setActivePassengerIdx] = useState(0);
    const [saving, setSaving] = useState(false);
    const [formVersions, setFormVersions] = useState<number[]>([]);

    const submitCountRef = useRef(0);
    const contactSubmittedRef = useRef(false);

    const urlAdults = parseInt(searchParams.get("adults") ?? "0", 10);
    const urlChildren = parseInt(searchParams.get("children") ?? "0", 10);
    const urlInfants = parseInt(searchParams.get("infants") ?? "0", 10);

    const hasUrlParams = urlAdults > 0 || urlChildren > 0 || urlInfants > 0;
    const storeAdults = searchTravellers?.adults ?? 0;
    const storeChildren = searchTravellers?.children ?? 0;
    const storeInfants = searchTravellers?.infants ?? 0;

    const initAdults = hasUrlParams ? urlAdults : storeAdults || 1;
    const initChildren = hasUrlParams ? urlChildren : storeChildren || 0;
    const initInfants = hasUrlParams ? urlInfants : storeInfants || 0;

    const passengerForms: PassengerDetails[] =
        storedPassengers.length > 0
            ? storedPassengers.map((p) => ({ ...p, type: p.type ?? "adult" }))
            : generateInitialPassengers(initAdults, initChildren, initInfants);

    const totalPassengers = passengerForms.length;
    const idCounterRef = useRef(totalPassengers);

    useEffect(() => {
        if (!flightId && !params.flightId) {
            router.push("/");
        }
    }, [flightId, params.flightId, router]);

    const adults = passengerForms.filter((p) => p.type === "adult").length;
    const children = passengerForms.filter((p) => p.type === "child").length;
    const infants = passengerForms.filter((p) => p.type === "infant").length;

    const breakdown = useMemo(() => {
        if (!farePrice) return null;
        return calculateTotal({
            farePrice,
            adults: totalPassengers,
            seatTotal: 0,
            mealTotal: 0,
            baggageTotal: 0,
            insuranceAdded: false,
            insurancePerPerson: INSURANCE_PER_PERSON,
            promoDiscount: 0,
            convenienceFee: CONVENIENCE_FEE,
        });
    }, [farePrice, totalPassengers]);

    const savedTravellers = useMemo(() => getSavedTravellers(), []);

    const handlePassengerSave = useCallback(
        (idx: number) => (data: PassengerFormData) => {
            if (isDuplicate(passengerForms, data, idx)) {
                toast.error("A passenger with the same name and date of birth already exists");
                return;
            }
            const updated = [...passengerForms];
            updated[idx] = { ...updated[idx], ...data, type: updated[idx].type };
            setPassengers(updated);
            submitCountRef.current++;
            const label = TYPE_LABEL[updated[idx].type] ?? "Adult";
            toast.success(
                `${label} ${countOfTypeUpTo(updated, updated[idx].type, idx)} details saved`,
            );
        },
        [passengerForms, setPassengers],
    );

    const handleContactSave = useCallback(() => {
        contactSubmittedRef.current = true;
        toast.success("Contact details saved");
    }, []);

    const handleFillFromSaved = useCallback(
        (traveller: SavedTraveller) => {
            const data = {
                title: traveller.title,
                firstName: traveller.firstName,
                lastName: traveller.lastName,
                dateOfBirth: traveller.dateOfBirth,
                gender: traveller.gender,
                nationality: traveller.nationality,
            };

            if (isDuplicate(passengerForms, data, activePassengerIdx)) {
                toast.error("This traveller is already added");
                return;
            }

            const updated = [...passengerForms];
            updated[activePassengerIdx] = { ...updated[activePassengerIdx], ...data };
            setPassengers(updated);

            setFormVersions((prev) => {
                const next = [...prev];
                next[activePassengerIdx] = (next[activePassengerIdx] ?? 0) + 1;
                return next;
            });

            setSavedTravellerOpen(false);
            toast.success("Traveller details filled");
        },
        [passengerForms, activePassengerIdx, setPassengers],
    );

    const handleDeleteTraveller = useCallback(
        (idx: number) => {
            const updated = passengerForms.filter((_, i) => i !== idx);
            setPassengers(updated);
            toast.success("Traveller removed");
        },
        [passengerForms, setPassengers],
    );

    const handleAddTraveller = useCallback(
        (type: PassengerType) => {
            const newPassenger = emptyPassenger(`p-${idCounterRef.current++}`, type);
            const updated = [...passengerForms, newPassenger];
            setPassengers(updated);
            setFormVersions((prev) => [...prev, 0]);
            toast.success(`${TYPE_LABEL[type]} traveller added`);
        },
        [passengerForms, setPassengers],
    );

    const navigateToAddons = useCallback(() => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            const id = flightId || params.flightId;
            if (id) {
                const q = new URLSearchParams({
                    adults: String(totalPassengers),
                    class: "Economy",
                    fareType: fareType || "",
                }).toString();
                router.push(`/flights/${id}/booking/addons?${q}`);
            }
        }, 800);
    }, [flightId, params.flightId, totalPassengers, fareType, router]);

    const handleSaveAndContinue = useCallback(() => {
        submitCountRef.current = 0;
        contactSubmittedRef.current = false;

        for (let i = 0; i < passengerForms.length; i++) {
            const form = document.getElementById(`passenger-form-${i}`) as HTMLFormElement | null;
            if (form) form.requestSubmit();
        }

        const contactForm = document.getElementById("contact-form") as HTMLFormElement | null;
        if (contactForm) contactForm.requestSubmit();

        setTimeout(() => {
            const state = useBookingStore.getState();

            const invalid: string[] = [];
            for (const [i, p] of state.passengers.entries()) {
                const result = passengerSchema.safeParse(p);
                if (!result.success) {
                    const label = `${TYPE_LABEL[p.type]} ${countOfTypeUpTo(state.passengers, p.type, i)}`;
                    invalid.push(label);
                }
            }

            if (invalid.length > 0) {
                toast.error(`Please fill required fields for: ${invalid.join(", ")}`);
                return;
            }

            if (!state.contactDetails?.email || !state.contactDetails?.phone) {
                toast.error("Please fill in all required contact details before continuing.");
                return;
            }

            navigateToAddons();
        }, 300);
    }, [passengerForms.length, navigateToAddons]);

    return {
        passengerForms,
        formVersions,
        breakdown,
        saving,
        savedTravellerOpen,
        activePassengerIdx,
        flightId,
        flightDetails,
        selectedFare,
        farePrice,
        fareType,
        storedContact,
        adults,
        children,
        infants,
        savedTravellers,
        setSavedTravellerOpen,
        setActivePassengerIdx,
        handlePassengerSave,
        handleContactSave,
        handleFillFromSaved,
        handleDeleteTraveller,
        handleAddTraveller,
        handleSaveAndContinue,
    };
}
