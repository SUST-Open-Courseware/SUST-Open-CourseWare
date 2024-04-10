"use client";

import React, { useState, useEffect } from "react";
import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { Logo } from "./logo";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
    <div className={`p-8 h-full flex items-center bg-white ${scrolled ? "shadow-md" : ""}`}>
      <div className="hidden md:flex p-2 mr-auto items-center">
        <Logo />
        <p className="ml-4 text-lg text-gray-500 text-center">SUST OCW</p>
      </div>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
