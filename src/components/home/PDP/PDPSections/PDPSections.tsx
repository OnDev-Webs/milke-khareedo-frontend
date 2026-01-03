"use client";

import { useEffect, useRef, useState } from "react";

interface PDPSectionsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const sections = [
  { id: "property-details", title: "Property Details" },
  { id: "highlights", title: "Highlights" },
  { id: "amenities", title: "Amenities" },
  { id: "layout-plan", title: "Layout Plan" },
  { id: "connectivity", title: "Connectivity" },
  { id: "about-developer", title: "About developer" },
];

export default function PDPSections({ activeTab, onTabChange }: PDPSectionsProps) {
  const [activeSection, setActiveSection] = useState(activeTab || "Property Details");
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
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
    <section className="sticky top-0 z-40 bg-white border-b border-[#F8F8F8] shadow-sm">
      <div className="container mx-auto">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {sections.map((section) => {
            const isActive = activeSection === section.title;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id, section.title)}
                className={`px-3.5 py-4 text-lg font-semibold whitespace-nowrap transition-all duration-300 ease-in-out inline-flex justify-center items-center gap-2.5 ${
                  isActive
                    ? "text-blue-900 bg-gradient-to-b from-white via-indigo-50/50 to-indigo-50/80 border-b-2 border-blue-900"
                    : "text-gray-700 hover:text-blue-900 hover:bg-indigo-50/30 border-b-2 border-transparent"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {section.title}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
