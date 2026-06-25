import { Calendar, Download, Mail, Share2, XCircle } from "lucide-react";

interface Props {
    onCancel: () => void;
    onAction: (action: string) => void;
}

export function ManageActions({ onCancel, onAction }: Props) {
    const actions = [
        { icon: Download, label: "Download E-Ticket", action: "Download" },
        { icon: Mail, label: "Send to Email", action: "Email" },
        { icon: Calendar, label: "Add to Calendar", action: "Calendar" },
        { icon: Share2, label: "Share", action: "Share" },
    ];

    return (
        <div className="bg-ink rounded-2xl p-6 text-white shadow-sm">
            <h3 className="font-serif text-xl mb-4">Manage Booking</h3>
            <div className="space-y-2">
                {actions.map(({ icon: Icon, label, action }) => (
                    <button
                        key={action}
                        onClick={() => onAction(action)}
                        className="w-full flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        {label}
                    </button>
                ))}
                <div className="pt-4 mt-4 border-t border-white/10">
                    <button
                        onClick={onCancel}
                        className="w-full flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-400 hover:text-red-300"
                    >
                        <XCircle className="h-4 w-4 shrink-0" />
                        Cancel Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
