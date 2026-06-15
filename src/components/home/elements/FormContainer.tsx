import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function FormContainer({ children }: Props) {
    return (
        <div className="w-full flex flex-col flex-wrap md:flex-row gap-2 md:gap-0 border border-black/10 rounded-2xl p-2 bg-white">
            {children}
        </div>
    );
}
