import { UAParser } from "ua-parser-js";

interface DeviceInfo {
    name: string;
    browser: string;
    os: string;
}

export function parseDevice(userAgent: string | null | undefined): DeviceInfo {
    if (!userAgent) return { name: "Unknown Device", browser: "Unknown", os: "Unknown" };

    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    return {
        name: deriveDeviceName(device, os),
        browser: formatComponent(browser.name, browser.version),
        os: formatComponent(os.name, os.version),
    };
}

function deriveDeviceName(
    device: ReturnType<UAParser["getDevice"]>,
    os: ReturnType<UAParser["getOS"]>,
): string {
    if (device.vendor && device.model) return `${device.vendor} ${device.model}`;

    if (device.vendor) return device.vendor;
    if (device.model) return device.model;

    if (os.name) return os.version ? `${os.name} ${os.version}` : os.name;

    return "Unknown Device";
}

function formatComponent(name: string | undefined, version: string | undefined): string {
    if (!name) return "Unknown";
    return version ? `${name} ${version}` : name;
}
