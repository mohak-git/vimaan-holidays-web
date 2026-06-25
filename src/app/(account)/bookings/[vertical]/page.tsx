import { CATEGORIES } from "@/components/home/types";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ vertical: string }>;
}

export default async function VerticalBookingsPage({ params }: Props) {
    const { vertical } = await params;
    const category = CATEGORIES.find((c) => c.id === vertical);

    if (!category) notFound();

    const Icon = category.icon;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="font-serif text-3xl font-medium text-ink md:text-4xl">
                    {category.label} Bookings
                </h1>
                <p className="mt-1 text-ink/50">
                    View and manage your {category.label.toLowerCase()} bookings.
                </p>
            </header>

            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-sand-dark bg-white/50 p-12 shadow-soft">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand">
                    <Icon className="h-8 w-8 text-ink/40" />
                </div>
                <div className="text-center">
                    <h3 className="font-serif text-xl font-medium text-ink">Coming Soon</h3>

                    <p className="mx-auto mt-1 max-w-sm text-sm text-ink/50">
                        We&apos;re working on bringing {category.label.toLowerCase()} bookings to
                        Vimaan Holidays. Check back soon!
                    </p>
                </div>
            </div>
        </div>
    );
}
