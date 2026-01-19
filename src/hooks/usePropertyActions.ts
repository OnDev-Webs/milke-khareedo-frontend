"use client";

import { useCallback, useEffect, useState } from "react";
import { homeService, type Property } from "@/lib/api/services/home.service";
import { useAuthContext } from "@/contexts/AuthContext";
import { userDashboardService } from "@/lib/api";

type PendingAction =
    | { type: "favorite"; propertyId: string }
    | null;

export function usePropertyActions() {
    const { checkAuth } = useAuthContext();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pendingAction, setPendingAction] =
        useState<PendingAction>(null);

    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
    const favoriteStates = Object.fromEntries(
        Array.from(favoriteIds).map(id => [id, true])
    );


    const [favoriteLoading, setFavoriteLoading] = useState<Record<string, boolean>>(
        {}
    );
    useEffect(() => {
        if (!checkAuth()) return;

        userDashboardService.getFavoriteProperties().then((res) => {
            if (!res.success || !res.data) return;

            const ids = res.data.map((p) => p.id);
            setFavoriteIds(new Set(ids));
        });
    }, [checkAuth]);



    const handleFavoriteClick = async (property: Property) => {
        if (!checkAuth()) return;

        if (favoriteLoading[property.id]) return;

        setFavoriteLoading(prev => ({ ...prev, [property.id]: true }));

        try {
            await homeService.toggleFavorite(property.id);

            setFavoriteIds(prev => {
                const next = new Set(prev);
                next.has(property.id)
                    ? next.delete(property.id)
                    : next.add(property.id);
                return next;
            });
        } finally {
            setFavoriteLoading(prev => ({ ...prev, [property.id]: false }));
        }
    };


    const handleShareClick = async (property: Property) => {
        const shareUrl = `${window.location.origin}/property-details/${property.id}`;
        const shareText = `Check out ${property.projectName} at ${property.location}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: property.projectName,
                    text: shareText,
                    url: shareUrl,
                });
            } catch {
                // user cancelled
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert("Link copied to clipboard!");
            } catch {
                prompt("Copy this link:", shareUrl);
            }
        }
    };

    const handleAuthSuccess = (property?: Property) => {
        if (!pendingAction || !property) return;

        if (pendingAction.type === "favorite") {
            handleFavoriteClick(property);
        }

        setPendingAction(null);
        setShowAuthModal(false);
    };



    return {
        favoriteStates,
        favoriteLoading,
        showAuthModal,
        handleFavoriteClick,
        handleShareClick,
        handleAuthSuccess,
        setShowAuthModal,
    };

}
