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
    {
        label: "User Profile",
        href: "/dashboard/profile",
        icon: User,
    },
    {
        label: "Viewed Properties",
        href: "/dashboard/viewed-properties",
        icon: Building2,
    },
    {
        label: "My Favorite",
        href: "/dashboard/favorites",
        icon: Heart,
    },
    {
        label: "Site visits",
        href: "/dashboard/site-visits",
        icon: Globe,
    },
    {
        label: "My Searches",
        href: "/dashboard/searches",
        icon: Search,
    },
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
        <section className="relative min-h-screen bg-[#f5f6fa]">
            <div className="relative z-0 bg-[#17171D] pt-10 pb-40">
                <div className="mx-auto max-w-[1250px] px-6">
                    <h1 className="mb-8 text-[26px] font-bold leading-none tracking-normal text-white">
                        Dashboard
                    </h1>


                    <div className="flex flex-wrap gap-3">
                        {tabs.map((tab) => {
                            const active = pathname === tab.href;
                            const Icon = tab.icon;

                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition
                                             ${active
                                            ? "bg-[#ff7a59] text-white"
                                            : "bg-white text-gray-800 hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon className="h-[18px] w-[18px]" />
                                    <span>{tab.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                </div>
            </div>

            <div className="relative z-10 -mt-32 mx-auto max-w-[1250px] px-6 pb-16">
                {children}
            </div>
        </section>
    );
}
