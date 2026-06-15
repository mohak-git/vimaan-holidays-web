"use client";

import type { FlightBookingInfo } from "@/types/flights/flight";
import { Calendar, Download, Mail, Share2 } from "lucide-react";
import { toast } from "sonner";

interface FlightActionsProps {
    bookingRef: string;
    flight: FlightBookingInfo;
    email: string;
}

export default function FlightActions({ bookingRef, flight, email }: FlightActionsProps) {
    const handleDownload = () => window.print();

    const handleSendEmail = () => {
        toast.success(`E-ticket sent to ${email}`);
    };

    const handleAddToCalendar = () => {
        toast.success(`E-ticket added to your calendar`);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Flight Booking ${bookingRef}`,
                    text: `I booked a flight from ${flight.from} to ${flight.to} on ${flight.departureDate}!`,
                    url: window.location.href,
                });
            } catch {}
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
        }
    };

    const actions = [
        { icon: Download, label: "Download E-Ticket", onClick: handleDownload },
        { icon: Mail, label: "Send to Email", onClick: handleSendEmail },
        { icon: Calendar, label: "Add to Calendar", onClick: handleAddToCalendar },
        { icon: Share2, label: "Share", onClick: handleShare },
    ] as const;

    return (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {actions.map(({ icon: Icon, label, onClick }) => (
                <button
                    key={label}
                    type="button"
                    onClick={onClick}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-sand-dark rounded-xl text-sm font-medium hover:bg-sand transition-colors"
                >
                    <Icon className="w-4 h-4" />
                    {label}
                </button>
            ))}
        </div>
    );
}
