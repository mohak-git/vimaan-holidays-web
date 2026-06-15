"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface BookingHeroProps {
    bookingRef: string;
    email: string;
}

export default function BookingHero({ bookingRef, email }: BookingHeroProps) {
    return (
        <div className="relative mb-10 overflow-hidden rounded-2xl bg-linear-to-br from-green-50 to-emerald-50/50 border border-green-100/60 p-8 md:p-10 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative mx-auto mb-5 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm"
            >
                <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
            >
                <div className="flex items-center justify-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold font-serif text-green-900">
                        Booking Confirmed!
                    </h1>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 shadow-sm border border-green-100">
                    <span className="text-sm text-ink/50">Reference</span>
                    <span className="text-lg font-bold font-serif text-ink tracking-wide">
                        {bookingRef}
                    </span>
                </div>

                {email && (
                    <p className="text-sm text-ink/40 mt-4 flex items-center justify-center gap-1.5">
                        <span className="inline-block w-1 h-1 rounded-full bg-green-400" />
                        Confirmation sent to {email}
                        <span className="inline-block w-1 h-1 rounded-full bg-green-400" />
                    </p>
                )}
            </motion.div>
        </div>
    );
}
