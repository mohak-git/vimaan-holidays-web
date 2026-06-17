type FieldProps = {
    w1: string;
    w2: string;
    w3: string;
};

const Field = ({ w1, w2, w3 }: FieldProps) => (
    <div className="flex-1 px-4 py-2 flex flex-col gap-2">
        <div className={`h-3 ${w1} bg-black/10 rounded`} />
        <div className={`h-5 ${w2} bg-black/20 rounded`} />
        <div className={`h-3 ${w3} bg-black/5 rounded`} />
    </div>
);

export default function BookingCardSkeleton() {
    const fields: [string, string, string][] = [
        ["w-12", "w-28", "w-36"],
        ["w-12", "w-24", "w-32"],
        ["w-16", "w-20", "w-12"],
        ["w-12", "w-24", "w-32"],
        ["w-28", "w-20", "w-16"],
    ];

    return (
        <>
            {/* Form */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 md:gap-0 border border-black/10 rounded-2xl p-4 md:p-2 bg-white animate-pulse">
                    {fields.map(([w1, w2, w3], i) => (
                        <div key={i} className="flex flex-1 items-center">
                            <Field w1={w1} w2={w2} w3={w3} />
                            {i !== fields.length - 1 && (
                                <div className="hidden md:block w-px h-12 mx-2 bg-black/10" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Special fares */}
                <div className="flex flex-wrap items-center gap-2 px-2 animate-pulse">
                    <div className="h-3 w-20 bg-black/10 rounded" />
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-6 w-16 bg-black/5 border border-black/10 rounded-sm"
                        />
                    ))}
                </div>
            </div>

            {/* Button */}
            <div className="flex justify-center md:justify-end">
                <div className="w-full md:w-48 h-12 bg-coral/30 rounded-xl shadow-glow animate-pulse" />
            </div>
        </>
    );
}
