import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
    name: string;
    image?: string | null | undefined;
    className?: string;
}

function initials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function UserAvatar({ name, image, className }: UserAvatarProps) {
    if (image) {
        return (
            <Image
                src={image}
                alt={name}
                width={40}
                height={40}
                className={cn("rounded-full object-cover h-8 w-8", className)}
            />
        );
    }

    return (
        <div
            className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full bg-coral text-xs font-semibold text-white",
                className,
            )}
            aria-label={name}
        >
            {initials(name)}
        </div>
    );
}
