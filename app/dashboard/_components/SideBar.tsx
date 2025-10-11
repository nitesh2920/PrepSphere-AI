"use client";

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Shield, UserCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { CourseCountContext } from '@/app/_context/CourseCountContext';

const SideBar = () => {
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext)
  const path = usePathname();

  const MenuList = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard/'
    },
    {
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade'
    },
    {
      name: 'Profile',
      icon: UserCircle,
      path: '/dashboard/profile'
    }
  ];

  return (
    <div className="h-screen shadow-md dark:border-r dark:border-gray-800 p-5">
      {/* Logo and Title */}
      <div className="flex gap-2 items-center">
        <Image src={'/logo.svg'} alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl">PrepSphere AI</h2>
      </div>

      {/* Prepare New Button and Menu */}
      <div className="mt-10">
        <Link href={"/create"} className="w-full">
          <Button className="w-full">Generate Material +</Button>
        </Link>

        <div className="mt-5">
          {MenuList.map((item, index) => {
            const isActive = path === item.path;
            return (
              <Link href={item.path} key={index}>
                <div
                  className={`group flex mt-3 gap-5 cursor-pointer items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${isActive ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                >
                  <item.icon className={`group-hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`} />
                  <h2 className={`group-hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`}>{item.name}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer / Credit Section */}
      <div className="mt-10 border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[90%]">
        <h2 className="text-lg mb-2">Available Credits: {(12 - totalCourse)}</h2>
        <Progress value={(totalCourse / 12) * 100} className="bg-blue-100 [&>div]:bg-blue-500" />
        <h2 className="text-sm mt-1">{totalCourse}  out of 12 credits</h2>
        <Link href="/dashboard/upgrade" className="text-blue-600 underline text-sm mt-2 inline-block">
          Upgrade to create more
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
