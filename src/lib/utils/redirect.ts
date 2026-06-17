export function getSafeRedirect(redirectTo: string | null | undefined): string {
    if (redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) return redirectTo;

    return "/";
}
