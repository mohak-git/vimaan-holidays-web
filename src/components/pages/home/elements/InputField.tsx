import type { LucideIcon } from "lucide-react";

interface Props {
    label: string;
    value: string;
    icon: LucideIcon;
    detail: string;
}

export default function InputField({ label, value, icon: Icon, detail }: Props) {
    return (
        <div className="flex-1 min-w-[200px] p-3 hover:bg-black/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-black/5">
            <p className="text-xs font-medium text-ink/60 mb-1 flex items-center gap-1.5">
                {<Icon className="w-3.5 h-3.5" />}
                {label}
            </p>
            <p className="font-serif text-lg font-semibold text-ink truncate">{value}</p>
            <p className="text-xs text-ink/50 truncate mt-0.5">{detail}</p>
        </div>
    );
}
