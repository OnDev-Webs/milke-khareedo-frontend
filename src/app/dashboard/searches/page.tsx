"use client";

import { Clock, MapPin } from "lucide-react";
import { useApi } from "@/lib/api/hooks/useApi";
import { userDashboardService } from "@/lib/api/services/userDashboard.service";
import type {
    SearchHistoryGroup,
    SearchHistoryItem,
} from "@/lib/api/services/userDashboard.service";

export default function MySearchesPage() {
    const { data, loading } = useApi<SearchHistoryGroup[]>(() =>
        userDashboardService.getSearchHistory()
    );


    const groups = data ?? [];

    if (loading || !groups.length) {
        return (
            <div className="rounded-[24px] bg-white px-6 py-10 shadow">
                No searches yet
            </div>
        );
    }

    return (
        <div className="rounded-[24px] bg-[#f8fbff] px-4 py-6 shadow sm:px-8 sm:py-8 min-h-[400px]">
            {groups.map((group) => (
                <div key={group.dateLabel} className="mb-6 last:mb-0">
                    <h3 className="mb-3 text-sm font-semibold text-[#2b2b2b]">
                        {group.dateLabel}
                    </h3>

                    <div className="flex flex-col gap-3">
                        {group.searches.map((item) => (
                            <SearchRow key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}


function SearchRow({ item }: { item: SearchHistoryItem }) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f4fa]">
                    <Clock className="h-4 w-4 text-[#555]" />
                </span>

                <p className="min-w-0 flex-1 text-sm text-[#2b2b2b] line-clamp-2">
                    {item.searchQuery}
                </p>
            </div>

            {item.location && (
                <span className="hidden sm:flex shrink-0 items-center gap-1 rounded-full bg-[#f1f4fa] px-3 py-1 text-xs font-medium text-[#555]">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                </span>
            )}
        </div>
    );
}

