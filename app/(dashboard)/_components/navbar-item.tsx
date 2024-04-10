"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
    label: string;
    href: string;
};

export const NavbarItem = ({
    label,
    href,
}: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    }

    return (
        <button onClick={onClick}
            type="button">
            <p className={`pb-2 font-semibold text-sm ${isActive ? "text-blue-500 border-b-4 border-blue-500" : "text-gray-500 border-b-4 border-transparent"}`}>{label}</p>
        </button>
    );
};