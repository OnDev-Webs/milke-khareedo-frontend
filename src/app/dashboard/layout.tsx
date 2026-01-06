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
} from "lucide-react";

const tabs = [
  { label: "User Profile", href: "/dashboard/profile", icon: User },
  {
    label: "Viewed Properties",
    href: "/dashboard/viewed-properties",
    icon: Building2,
  },
  { label: "My Favorite", href: "/dashboard/favorites", icon: Heart },
  { label: "Site visits", href: "/dashboard/site-visits", icon: Globe },
  { label: "My Searches", href: "/dashboard/searches", icon: Search },
  {
    label: "My Preference",
    href: "/dashboard/preferences",
    icon: SlidersHorizontal,
  },
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
                  <Icon className="h-4 w-4" />
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
