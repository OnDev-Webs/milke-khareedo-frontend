"use client";

import { useState } from "react";
import { type GroupBuy } from "@/lib/api/services/home.service";
import { useAuthContext } from "@/contexts/AuthContext";
import { homeService } from "@/lib/api/services/home.service";
import AuthModal from "@/components/auth/AuthModal";
import Image from "next/image";

interface PDPGroupProgressStatusProps {
  groupBuy: GroupBuy;
  propertyId: string;
  isJoinGroup: boolean;
  isAuthenticated: boolean;
  onJoinGroupChange: (isJoinGroup: boolean) => void;
  onRefresh: () => void;
}

export default function PDPGroupProgressStatus({
  groupBuy,
  propertyId,
  isJoinGroup,
  isAuthenticated,
  onJoinGroupChange,
  onRefresh,
}: PDPGroupProgressStatusProps) {
  const { checkAuth } = useAuthContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const joined = groupBuy.currentGroupMembersCount;
  const required = groupBuy.minGroupMembers;
  const pct = Math.min(100, Math.round((joined / required) * 100));
  const radius = 48;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const handleJoinGroup = async () => {
    if (!checkAuth()) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await homeService.joinGroup(propertyId);
      if (response.success) {
        onJoinGroupChange(response.data.isJoinGroup);
        onRefresh();
      }
    } catch (error) {
      console.error("Error joining group:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="">
        <div className="mx-auto container rounded-2xl bg-white p-6 border border-primary">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <svg height={radius * 2} width={radius * 2} className="block">
                <circle
                  stroke="#F1F1F4"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="#111827"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(-90 ${radius} ${radius})`}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {groupBuy.progressText}
                </div>
              </div>
            </div>

            <p className="mt-1 text-center text-sm text-gray-500">
              {groupBuy.message}
            </p>
          </div>

          {groupBuy.members && groupBuy.members.length > 0 && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-gray-700">
                Joined the Group
              </h4>

              <div className="mt-3 overflow-hidden pb-2">
                <div className="flex -space-x-12">
                  {groupBuy.members.slice(0, 5).map((member) => (
                    <div
                      key={member.userId}
                      className="shrink-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        {member.profilePhoto ? (
                          <Image
                            src={member.profilePhoto}
                            alt={member.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-700">
                            {member.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {member.propertyTypeInterest}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gray-800"
                  style={{ width: `${pct}%` }}
                  aria-hidden
                />
              </div>
            </div>
          )}

          <div className="mt-5">
            <button
              onClick={handleJoinGroup}
              disabled={isJoinGroup || isLoading}
              className={`w-full rounded-full border px-6 py-3 text-sm font-semibold shadow-sm transition-all ${
                isJoinGroup
                  ? "border-[#1C4692] bg-white text-[#1C4692] cursor-default"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
              aria-label={isJoinGroup ? "Already Joined" : "Join Group Buy"}
            >
              {isLoading ? "Joining..." : isJoinGroup ? "Joined" : "Join Group Buy"}
            </button>
          </div>
        </div>
      </section>
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            handleJoinGroup();
          }}
        />
      )}
    </>
  );
}
