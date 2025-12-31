"use client";

import React, { useState, useMemo, useCallback } from "react";
import { type SimilarProject } from "@/lib/api/services/home.service";
import PropertyCard from "@/components/cards/PropertyCard";
import { type Property } from "@/lib/api/services/home.service";
import { useCompare } from "@/contexts/CompareContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { homeService } from "@/lib/api/services/home.service";
import AuthModal from "@/components/auth/AuthModal";
import getPropertyImages from "@/utils/getPropertyImages";

interface PDPSimilarProjectsProps {
  similarProjects: SimilarProject[];
}

export default function PDPSimilarProjects({ similarProjects }: PDPSimilarProjectsProps) {
  const { clearAndAddToCompare } = useCompare();
  const { isAuthenticated, checkAuth } = useAuthContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [favoriteStates, setFavoriteStates] = useState<Record<string, boolean>>({});
  const [favoriteLoading, setFavoriteLoading] = useState<Record<string, boolean>>({});
  const [joinGroupStates, setJoinGroupStates] = useState<Record<string, boolean>>({});
  const [joinGroupLoading, setJoinGroupLoading] = useState<Record<string, boolean>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);

  // Convert SimilarProject to Property format
  const convertedProperties = useMemo(() => {
    return similarProjects.map((sp): Property => ({
      id: sp.id,
      projectId: sp.projectId,
      projectName: sp.projectName,
      location: sp.location,
      latitude: sp.latitude,
      longitude: sp.longitude,
      image: sp.imageUrl || (sp.images && sp.images.length > 0 ? sp.images[0] : null),
      images: sp.images || [],
      lastDayToJoin: "",
      groupSize: sp.groupSize,
      groupSizeFormatted: `${sp.groupSize} Members`,
      openingLeft: 0,
      openingFormatted: sp.status,
      targetPrice: sp.targetPrice,
      developerPrice: sp.disclaimerPrice,
      discount: null,
      offerPrice: null,
      discountPercentage: sp.discountPercentage,
      configurations: [sp.configuration],
      configurationsFormatted: sp.configuration,
      possessionStatus: "",
      developer: "",
      leadCount: 0,
      reraId: "",
      description: "",
      relationshipManager: "",
      isFavorite: favoriteStates[sp.id] || false,
      isJoinGroup: joinGroupStates[sp.id] || false,
    }));
  }, [similarProjects, favoriteStates, joinGroupStates]);

  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return dateString;
    }
  }, []);

  const handleFavoriteClick = useCallback(async (property: Property) => {
    if (!checkAuth()) {
      setShowAuthModal(true);
      return;
    }

    setFavoriteLoading((prev) => ({ ...prev, [property.id]: true }));
    try {
      const response = await homeService.toggleFavorite(property.id);
      if (response.success && response.data) {
        const favoriteData = response.data;
        setFavoriteStates((prev) => ({ ...prev, [property.id]: favoriteData.isFavorite }));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setFavoriteLoading((prev) => ({ ...prev, [property.id]: false }));
    }
  }, [checkAuth]);

  const handleCompareClick = useCallback((property: Property) => {
    clearAndAddToCompare({
      id: property.id,
      title: property.projectName,
      price: property.targetPrice?.formatted || "",
      location: property.location,
      image: property.image ?? undefined,
      developer: property.developer || "",
    });
  }, [clearAndAddToCompare]);

  const handleShareClick = useCallback((property: Property) => {
    if (navigator.share) {
      navigator.share({
        title: property.projectName,
        text: `Check out ${property.projectName} at ${property.location}`,
        url: `${window.location.origin}/property-details/${property.id}`,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/property-details/${property.id}`);
    }
  }, []);

  const handleJoinGroupClick = useCallback(async (property: Property) => {
    if (!checkAuth()) {
      setShowAuthModal(true);
      return;
    }

    setJoinGroupLoading((prev) => ({ ...prev, [property.id]: true }));
    try {
      const response = await homeService.joinGroup(property.id);
      if (response.success && response.data) {
        const joinGroupData = response.data;
        setJoinGroupStates((prev) => ({ ...prev, [property.id]: joinGroupData.isJoinGroup }));
      }
    } catch (error) {
      console.error("Error joining group:", error);
    } finally {
      setJoinGroupLoading((prev) => ({ ...prev, [property.id]: false }));
    }
  }, [checkAuth]);

  if (!similarProjects || similarProjects.length === 0) {
    return null;
  }

  return (
    <>
      <section className="w-full bg-white py-10">
        <div className="mx-auto container">
          <h3 className="mb-6 font-semibold text-3xl">Similar Projects</h3>

          <div className="overflow-x-auto pb-4 md:overflow-visible">
            <div className="flex gap-6 px-2 md:grid md:grid-cols-3 md:gap-6 md:px-0">
              {convertedProperties.map((property) => {
                const images = getPropertyImages(property);
                const currentIdx = currentImageIndex[property.id] || 0;
                const currentImg = images[currentIdx] || property.image || null;

                return (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favoriteStates[property.id] || false}
                    isLoading={favoriteLoading[property.id] || false}
                    isJoinGroup={joinGroupStates[property.id] || false}
                    isJoinGroupLoading={joinGroupLoading[property.id] || false}
                    images={images}
                    currentIndex={currentIdx}
                    hasMultipleImages={images.length > 1}
                    currentImage={currentImg}
                    isHovered={hoveredProperty === property.id}
                    onMouseEnter={() => setHoveredProperty(property.id)}
                    onMouseLeave={() => setHoveredProperty(null)}
                    onFavoriteClick={handleFavoriteClick}
                    onCompareClick={handleCompareClick}
                    onShareClick={handleShareClick}
                    onJoinGroupClick={handleJoinGroupClick}
                    onGoToImage={(index) => {
                      setCurrentImageIndex((prev) => ({ ...prev, [property.id]: index }));
                    }}
                    onGoToNextImage={(total) => {
                      setCurrentImageIndex((prev) => ({
                        ...prev,
                        [property.id]: ((prev[property.id] || 0) + 1) % total,
                      }));
                    }}
                    onGoToPreviousImage={(total) => {
                      setCurrentImageIndex((prev) => ({
                        ...prev,
                        [property.id]: ((prev[property.id] || 0) - 1 + total) % total,
                      }));
                    }}
                    formatDate={formatDate}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}
