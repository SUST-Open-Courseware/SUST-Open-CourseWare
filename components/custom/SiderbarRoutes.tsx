"use client";

import { Layout, GanttSquareIcon, List, BarChart } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";

export const SidebarRoutes = () => {
    const pathName = usePathname();
    const isTeacherPage = pathName?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => {
                return (
                    <SidebarItem
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                )
            })}
        </div>
    )
}

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: GanttSquareIcon,
        label: "Courses",
        href: "/courses",
    },
]


const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    }
]
