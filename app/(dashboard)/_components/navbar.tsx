"use client";

import React, { useState, useEffect } from "react";
import { NavbarRoutes } from "@/components/navbar-routes";
import { usePathname } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { Logo } from "./logo";
import { BarChart, Compass, Layout, List } from "lucide-react";
import { NavbarItem } from "./navbar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

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
  },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`px-10 pt-4 bg-white ${scrolled ? "shadow-md" : ""}`}>
      <div className={`flex items-center`}>
        <div className="hidden md:flex mr-auto items-center">
          <Logo />
          <p className="ml-4 text-lg text-gray-500 text-center">SUST OCW</p>
        </div>
        <MobileSidebar />
        <NavbarRoutes />
      </div>
      <div className="hidden md:flex pt-4 space-x-6">
        {
          routes.map((route, index) =>
            <NavbarItem href={route.href} label={route.label} key={index} />
          )
        }
      </div>
    </div>
  );
};
