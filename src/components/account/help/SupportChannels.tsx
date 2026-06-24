import { SUPPORT_CHANNELS } from "@/components/account/constants";
import Link from "next/link";

export default function SupportChannels() {
    return (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SUPPORT_CHANNELS.map((c) => (
                <Link
                    key={c.label}
                    href={c.href}
                    className="group flex cursor-pointer flex-col items-center rounded-2xl border border-sand-dark bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-coral/40 hover:shadow-md"
                >
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-coral/10 text-coral transition-colors group-hover:bg-coral/20">
                        <c.icon className="size-6" />
                    </div>
                    <h3 className="font-medium text-ink">{c.label}</h3>
                    <p className="mt-1 text-sm text-ink/50">{c.desc}</p>
                </Link>
            ))}
        </section>
    );
}
