"use client";

import { useCompare } from "@/contexts/CompareContext";
import { useState } from "react";
import { MdCompareArrows } from "react-icons/md";
import Link from "next/link";

export default function CompareIcon() {
    const { compareCount } = useCompare();
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative">
            <Link
                href="/compare"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                aria-label="Compare properties"
            >
                <MdCompareArrows className="h-5 w-5" />
                {compareCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                        {compareCount}
                    </span>
                )}
            </Link>

            {/* Hover Tooltip */}
            {showTooltip && (
                <div className="absolute top-12 right-0 z-50 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg">
                    <div className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-gray-900"></div>
                    {compareCount === 0 ? (
                        <p>No properties to compare</p>
                    ) : (
                        <p>
                            {compareCount} propert{compareCount === 1 ? "y" : "ies"} selected
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
