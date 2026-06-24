import type { FAQItem, HelpArticle } from "@/types/account";

export const helpArticles: HelpArticle[] = [
    {
        id: "art-1",
        title: "How to change or cancel a flight booking",
        excerpt: "Step-by-step guide to modifying or cancelling your flight reservation.",
        category: "Bookings",
    },
    {
        id: "art-2",
        title: "Understanding fare types and cancellation policies",
        excerpt: "Learn about Saver, Value, and Flex fares and their refund rules.",
        category: "Fares",
    },
    {
        id: "art-3",
        title: "Adding baggage and seat selection",
        excerpt: "How to add extra baggage, choose seats, and pre-book meals.",
        category: "Add-ons",
    },
    {
        id: "art-4",
        title: "Managing your saved traveller profiles",
        excerpt: "Save traveller details for faster future bookings.",
        category: "Account",
    },
    {
        id: "art-5",
        title: "Payment methods and refund process",
        excerpt: "Accepted payment methods and how refunds are processed.",
        category: "Payments",
    },
    {
        id: "art-6",
        title: "Visa requirements and travel documentation",
        excerpt: "Check visa requirements for domestic and international travel.",
        category: "Travel Info",
    },
];

export const faqs: FAQItem[] = [
    {
        id: "faq-1",
        question: "How do I cancel my flight booking?",
        answer: "You can cancel your booking from the My Bookings section. Select the booking you want to cancel and click the Cancel button. Refund eligibility depends on your fare type — Flex fares are fully refundable, Saver fares are non-refundable. Processing time is 5-7 business days.",
        category: "Bookings",
    },
    {
        id: "faq-2",
        question: "Can I change the date of my flight?",
        answer: "Date changes are allowed for Value and Flex fare bookings. You can modify your booking from the booking details page. A change fee plus any fare difference may apply. Saver fares do not allow date changes.",
        category: "Bookings",
    },
    {
        id: "faq-3",
        question: "How do I add extra baggage after booking?",
        answer: "Extra baggage can be added from the booking details page up to 48 hours before departure. Alternatively, you can purchase additional baggage at the airport check-in counter at a higher rate.",
        category: "Add-ons",
    },
    {
        id: "faq-4",
        question: "What documents do I need for domestic travel?",
        answer: "For domestic travel within India, a government-issued photo ID is mandatory — Aadhaar, Passport, Driver's License, or Voter ID. For international travel, a valid passport with at least 6 months validity and necessary visas are required.",
        category: "Travel Info",
    },
    {
        id: "faq-5",
        question: "How long does it take to get a refund?",
        answer: "Refunds are typically processed within 5-7 business days. The amount is credited back to the original payment method. For UPI transactions, refunds are instant. Card payments may take 7-10 business days depending on your bank.",
        category: "Payments",
    },
    {
        id: "faq-6",
        question: "Can I book tickets for someone else using my account?",
        answer: "Yes, you can book tickets for anyone using your account. Save their details as a traveller profile for faster booking. The booking confirmation will be sent to the email address provided in the contact details.",
        category: "Account",
    },
    {
        id: "faq-7",
        question: "What happens if my flight is delayed or cancelled by the airline?",
        answer: "If the airline cancels your flight, you are entitled to a full refund or free rescheduling. For significant delays, airlines usually provide meal vouchers and, if needed, accommodation. Contact our support team and we will assist you with the process.",
        category: "Travel Info",
    },
    {
        id: "faq-8",
        question: "How do I change my password or update my profile?",
        answer: "Go to Settings in your account. You can update your personal information under the Profile Information section and change your password under the Change Password section.",
        category: "Account",
    },
];
