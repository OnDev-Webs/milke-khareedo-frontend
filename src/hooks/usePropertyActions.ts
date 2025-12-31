"use client";

import { useCallback, useState } from "react";
import { homeService, type Property } from "@/lib/api/services/home.service";
import { useAuthContext } from "@/contexts/AuthContext";

type PendingAction =
    | { type: "favorite"; propertyId: string }
    | null;

export function usePropertyActions() {
    const { checkAuth } = useAuthContext();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pendingAction, setPendingAction] =
        useState<PendingAction>(null);

    const [favoriteStates, setFavoriteStates] = useState<Record<string, boolean>>(
        {}
    );

    const [favoriteLoading, setFavoriteLoading] = useState<Record<string, boolean>>(
        {}
    );

    const initFavorites = useCallback(
        (properties: { id: string; isFavorite?: boolean }[]) => {
            const map: Record<string, boolean> = {};
            properties.forEach((p) => {
                if (p.isFavorite) map[p.id] = true;
            });
            setFavoriteStates(map);
        },
        []
    );

    const handleFavoriteClick = async (property: Property) => {
        if (!checkAuth()) return;

        setFavoriteLoading((prev) => ({ ...prev, [property.id]: true }));

        try {
            const response = await homeService.toggleFavorite(property.id);

            if (response?.success && response.data?.isFavorite !== undefined) {
                setFavoriteStates((prev) => ({
                    ...prev,
                    [property.id]: response.data.isFavorite,
                }));
            }
        } finally {
            setFavoriteLoading((prev) => ({ ...prev, [property.id]: false }));
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
        initFavorites,
        setFavoriteStates,
        handleFavoriteClick,
        handleShareClick,
        handleAuthSuccess,
        setShowAuthModal,
    };

}
