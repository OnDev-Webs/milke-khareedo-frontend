"use client";

import { useCompare } from "@/contexts/CompareContext";
import { useState, useRef, useEffect } from "react";
import { MdCompareArrows } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

export default function CompareIcon() {
    const { compareItems, compareCount, clearCompare, removeFromCompare } = useCompare();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    const handleCompareClick = () => {
        setShowDropdown(false);
        router.push("/compare");
    };

    const handleClear = () => {
        clearCompare();
        setShowDropdown(false);
    };

    return (
        <div className="relative">
            {/* Compare Button */}
            <div
                ref={buttonRef}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                className="relative"
            >
                <button
                    className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    aria-label="Compare properties"
                >
                    <MdCompareArrows className="h-5 w-5" />
                    {compareCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                            {compareCount}
                        </span>
                    )}
                </button>

                {/* Hover Dropdown - Matching Image Design */}
                {showDropdown && (
                    <div
                        ref={dropdownRef}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                        className="absolute top-12 right-0 z-50 w-[360px] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-gray-900">Compare</h3>
                                {compareCount > 0 && (
                                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#f15a29] px-2 text-xs font-semibold text-white">
                                        {compareCount}
                                    </span>
                                )}
                            </div>
                            {compareCount > 0 && (
                                <button
                                    onClick={handleClear}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Properties List */}
                        <div className="max-h-[400px] overflow-y-auto">
                            {compareItems.length === 0 ? (
                                <div className="px-4 py-8 text-center">
                                    <p className="text-sm text-gray-500">No properties selected for comparison</p>
                                </div>
                            ) : (
                                <div className="p-4 space-y-2.5">
                                    {compareItems.map((property) => (
                                        <div
                                            key={property.id}
                                            className="flex items-center gap-3 rounded-xl bg-white border border-gray-200 p-3 hover:bg-gray-50 transition-colors"
                                        >
                                            {/* Property Logo/Image - White square with logo */}
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm">
                                                {property.image ? (
                                                    <Image
                                                        src={property.image}
                                                        alt={property.title}
                                                        width={56}
                                                        height={56}
                                                        className="h-full w-full rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            className="h-7 w-7 text-gray-400"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Property Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-gray-900 truncate">
                                                    {property.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 mt-1">{property.price}</p>
                                            </div>

                                            {/* Remove Button - Red circle with X */}
                                            <button
                                                onClick={() => removeFromCompare(property.id)}
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
                                                aria-label={`Remove ${property.title} from comparison`}
                                            >
                                                <IoClose className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Compare Button */}
                        {compareCount > 0 && (
                            <div className="border-t border-gray-200 p-4 bg-gray-50">
                                <button
                                    onClick={handleCompareClick}
                                    className="w-full rounded-xl bg-gradient-to-b from-[#f15a29] to-[#e14f20] px-6 py-3 text-base font-bold text-white shadow-lg hover:shadow-xl transition-all hover:from-[#e14f20] hover:to-[#d1441a]"
                                >
                                    Compare
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
