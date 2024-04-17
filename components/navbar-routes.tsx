"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Grip, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { IconBadge } from "./icon-badge";



export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");

  interface DropdownItem {
    label: string;
    value: string;
    url: string;
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const teacherDropDowns = [
    { label: 'Student', value: 'student', url: '/' },
    { label: 'Teacher', value: 'teacher', url: '/teacher/courses' },
  ];

  const studentDropDowns = [
    { label: 'Student', value: 'student', url: '/' },
  ]

  const dropDowns = isTeacher(userId) ? teacherDropDowns : studentDropDowns;

  const handleClick = (item: DropdownItem) => {
    setIsOpen(false);
    window.location.href = item.url;
  };

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
      <div className="flex gap-x-4 ml-auto">

        {
          isCoursePage ? (
            <Link href="/">
              <div className="bg-sky-200 text-sky-700 w-12 h-12 rounded-full flex items-center justify-center">
                <LogOut />
              </div>
            </Link>
          ) :
            <div className="relative">
              <button
                className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center"
                onClick={toggleDropdown}
              >
                <Grip />
              </button>
              {isOpen && (
                <ul className="absolute mt-1 shadow-md bg-gray-100 z-50 overflow-hidden p-2 rounded-2xl divide-y divide-gray-100">
                  {dropDowns.map((item) => (
                    <li
                      key={item.value}
                      className={`block px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white ${item === dropDowns[0] ? 'rounded-t-xl' : ''
                        } ${item === dropDowns[dropDowns.length - 1] ? 'rounded-b-xl' : ''}`}
                      onClick={() => handleClick(item)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
        }

        <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center">
          <UserButton
            afterSignOutUrl="/"
          />
        </div>
      </div>
    </>
  )
}