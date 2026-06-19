import { DOWNLOAD_LINKS } from "@/config/constants";
import { DownloadLink } from "@/config/types";
import Link from "next/link";

interface AppDownload extends DownloadLink {
    className: string;
}

const HEADING_ID = "app-download-heading";

function DownloadButton({ label, href, icon: Icon, className }: AppDownload) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${className}`}
        >
            <Icon className="h-4 w-4 shrink-0 text-red-500" />
            {label}
        </Link>
    );
}

export default function AppDownloadBanner() {
    return (
        <section className="w-full bg-stone-900 py-20" aria-labelledby={HEADING_ID}>
            <div className="mx-auto max-w-7xl px-6">
                <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-sand p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-xl flex flex-col gap-3">
                        <p className="text-xs font-semibold uppercase tracking-widest text-coral">
                            Pocket companion
                        </p>

                        <h2 className="text-3xl md:text-4xl leading-tight">
                            Carry your whole trip in one app.
                        </h2>

                        <p className="text-sand/70">
                            Live updates for flights, stay check-ins, cab arrivals and tour
                            reminders — all in one calm feed.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {DOWNLOAD_LINKS.map((download, index) => {
                            const link = {
                                ...download,
                                className:
                                    index === 0
                                        ? "bg-sand text-ink hover:bg-sand-dark"
                                        : "bg-sand/10 text-sand border border-sand/20 hover:bg-sand/20",
                            };
                            return <DownloadButton key={download.label} {...link} />;
                        })}
                    </div>

                    <div
                        aria-hidden="true"
                        className="absolute -right-20 -top-25 size-80 rounded-full bg-red-500/15 blur-3xl pointer-events-none"
                    />
                </div>
            </div>
        </section>
    );
}
