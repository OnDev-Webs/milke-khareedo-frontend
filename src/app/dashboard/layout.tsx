"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Building2,
  Heart,
  Globe,
  Search,
  SlidersHorizontal,
  UserRoundIcon,
} from "lucide-react";
import { IoHeartOutline } from "react-icons/io5";
import Image from "next/image";

const tabs = [
  { label: "User Profile", href: "/dashboard/profile", icon: "/images/user.svg" },
  { label: "Viewed Properties", href: "/dashboard/viewed-properties", icon: "/images/building.svg" },
  { label: "My Favorite", href: "/dashboard/favorites", icon: "/images/heart.svg" },
  { label: "Site visits", href: "/dashboard/site-visits", icon: "/images/global.svg" },
  { label: "My Searches", href: "/dashboard/searches", icon: "/images/global-search.svg" },
  { label: "My Preference", href: "/dashboard/preferences", icon: "/images/pet.svg" },
];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className="relative bg-[#f5f6fa] pb-12 min-h-[86vh]">
      <div className="relative z-0 bg-[#17171D] pt-8 pb-54 md:pt-10 md:pb-48">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6">
          <h1 className="mb-6 text-[22px] sm:text-[26px] font-bold leading-none text-white">
            Dashboard
          </h1>

          <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
            {tabs.map((tab) => {
              const active = pathname === tab.href;
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
                    ${active
                      ? "bg-[#1C4692] hover:bg-[#1c4692e6] text-white"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                    }`}
                >
                  {active ? (
                    <Image
                      src={tab.icon}
                      alt={tab.label}
                      width={20}
                      height={20}
                      className="invert brightness-0"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                      <Image
                        src={tab.icon}
                        alt={tab.label}
                        width={20}
                        height={20}
                      />
                    </span>
                  )}
                  <span className="whitespace-nowrap">{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-48 md:-mt-40 mx-auto max-w-[1380px] px-4 sm:px-6 pb-12">
        {children}
      </div>
    </section>
  );
}
