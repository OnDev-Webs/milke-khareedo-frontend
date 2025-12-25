"use client";

import { useCompare } from "@/contexts/CompareContext";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

export default function CompareOverlay() {
  const { compareItems, removeFromCompare, clearCompare, compareCount } = useCompare();

  return (
    <div className="w-[340px] rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">Compare</h3>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
            {compareCount}
          </span>
        </div>
        <button
          onClick={clearCompare}
          className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Property List */}
      <div className="max-h-[400px] overflow-y-auto px-5 py-4">
        {compareItems.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-500">
            No properties to compare
          </p>
        ) : (
          <div className="space-y-3">
            {compareItems.map((property) => (
              <div
                key={property.id}
                className="flex items-start justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 truncate">
                    {property.title}
                  </h4>
                  <p className="mt-1 text-xs font-medium text-gray-600">
                    {property.price}
                  </p>
                  {property.location && (
                    <p className="mt-1 text-xs text-gray-500 truncate">
                      {property.location}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeFromCompare(property.id)}
                  className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Remove from compare"
                >
                  <IoClose className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compare Button */}
      {compareItems.length > 0 && (
        <div className="border-t border-gray-200 px-5 py-4">
          <Link
            href="/compare"
            className="block w-full rounded-full bg-[#f15a29] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#e14f20] transition-colors"
          >
            Compare
          </Link>
        </div>
      )}
    </div>
  );
}
