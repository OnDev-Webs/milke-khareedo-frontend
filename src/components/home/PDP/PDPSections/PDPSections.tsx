"use client";

import { useEffect, useRef, useState } from "react";
import { IoHeart, IoHeartOutline, IoShareSocialOutline } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
interface PDPSectionsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onFavoriteClick?: () => void;
  onCompareClick?: () => void;
  onShareClick?: () => void;
  isFavorite?: boolean;
}

const sections = [
  { id: "property-details", title: "Property Details" },
  { id: "highlights", title: "Highlights" },
  { id: "amenities", title: "Amenities" },
  { id: "layout-plan", title: "Layout Plan" },
  { id: "connectivity", title: "Connectivity" },
  { id: "about-developer", title: "About developer" },
];

export default function PDPSections({
  activeTab,
  onTabChange,
  onFavoriteClick,
  onCompareClick,
  onShareClick,
  isFavorite,
}: PDPSectionsProps) {

  const [activeSection, setActiveSection] = useState(activeTab || "Property Details");
  const [isScrolling, setIsScrolling] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string, title: string) => {
    setIsScrolling(true);
    const element = document.getElementById(sectionId);

    if (element) {
      // Calculate offset for sticky header/nav
      // Header height (~80px) + Navigation bar height (~60px) + some padding
      const headerOffset = 160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Update active section immediately for better UX
      setActiveSection(title);
      if (onTabChange) {
        onTabChange(title);
      }

      // Smooth scroll
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });

      // Reset scrolling flag after animation completes (smooth scroll typically takes 500-800ms)
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  // Set up Intersection Observer to detect which section is in view
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Only update if not manually scrolling
        if (isScrolling) return;

        // Find the section that's most visible in the viewport
        let maxVisible = 0;
        let mostVisibleSection: string | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Calculate how much of the section is visible
            const visibleRatio = entry.intersectionRatio;
            if (visibleRatio > maxVisible) {
              maxVisible = visibleRatio;
              const sectionTitle = sections.find(
                (s) => s.id === entry.target.id
              )?.title;
              if (sectionTitle) {
                mostVisibleSection = sectionTitle;
              }
            }
          }
        });

        // Update active section if we found one that's significantly visible
        if (mostVisibleSection && mostVisibleSection !== activeSection && maxVisible > 0.1) {
          setActiveSection(mostVisibleSection);
          if (onTabChange) {
            onTabChange(mostVisibleSection);
          }
        }
      },
      {
        root: null,
        rootMargin: "-180px 0px -60% 0px", // Account for sticky header + nav (~160px) + some buffer
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], // More granular thresholds for better detection
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isScrolling, activeSection, onTabChange]);

  // Sync with external activeTab prop
  useEffect(() => {
    if (activeTab && activeTab !== activeSection) {
      setActiveSection(activeTab);
    }
  }, [activeTab]);
  

  return (
    <section className="sticky top-0 z-40 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between border-b-2 border-[#F8F8F8]">
          {/* LEFT – MENU */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {sections.map((section) => {
              const isActive = activeSection === section.title;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id, section.title)}
                  className={`px-3.5 py-4 text-[18px] font-semibold whitespace-nowrap ${isActive
                    ? "text-[#1C4692] border-b-2 border-[#1C4692] font-semibold bg-[linear-gradient(180deg,#FFFFFF_0%,#EEF4FF80_50%,#EEF4FFCC_80%)]"
                    : "text-[#6D6D6D] font-normal"
                    }`}>
                  {section.title}
                </button>
              );
            })}
          </div>

          {/* RIGHT – WORKING ICONS */}
          <div className="hidden md:flex items-center gap-3 pr-4">
            <button
              onClick={onFavoriteClick}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#EEF4FF]"
            >
              {isFavorite ? <IoHeart size={18}/> : <IoHeartOutline />}
            </button>

            <button
              onClick={onCompareClick}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#EEF4FF]"
            >
              <MdCompareArrows size={18} />
            </button>

            <button
              onClick={onShareClick}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#EEF4FF]"
            >
              <IoShareSocialOutline size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
