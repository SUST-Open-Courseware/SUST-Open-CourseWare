"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { PersonStanding } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { IconBadge } from "./icon-badge";



export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");

  return (
    <>
      {
        (!isCoursePage) &&
        (
          <>
            <div className="hidden md:flex justify-center">
              <SearchInput />
            </div>
          </>
        )

      }
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <div className="bg-sky-200 text-sky-700 w-12 h-12 rounded-full flex items-center justify-center">
              <LogOut />
            </div>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <div className="bg-emerald-200 text-emerald-700 w-12 h-12 rounded-full flex items-center justify-center">
              <PersonStanding />
            </div>
          </Link>
        ) : null}
        <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center">
          <UserButton
            afterSignOutUrl="/"
          />
        </div>
      </div>
    </>
  )
}