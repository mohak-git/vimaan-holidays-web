let promise: Promise<boolean> | null = null;

export function loadScript(): Promise<boolean> {
    if (promise) return promise;

    promise = new Promise((resolve) => {
        if (typeof window === "undefined") return resolve(false);
        if (window.Razorpay) return resolve(true);

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => {
            promise = null;
            resolve(false);
        };
        document.body.appendChild(script);
    });

    return promise;
}
