"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import { useAuthContext } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { IoPerson, IoChevronDown } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import {
  Building2,
  Globe,
  HeartIcon,
  LucideCircleUserRound,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import CompareOverlay from "../home/compare/CompareOverlay";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname?.startsWith("/dashboard");
  const { isAuthenticated, user, logout } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenCompare = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setShowCompare(true);
  };

  const handleCloseCompare = () => {
    closeTimerRef.current = setTimeout(() => {
      setShowCompare(false);
    }, 200);
  };

  return (
    <header className="w-full bg-white relative z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-0">
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="MILKE KHEREEDO logo"
              width={216}
              height={52}
              className="h-8 w-auto sm:h-10 lg:h-[52px]"
            />
          </Link>

          {/* Navigation Links */}
          {!isDashboard && (
            <nav className="hidden items-center gap-8 text-gray-600 lg:flex xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative pb-1 text-sm font-normal transition-colors xl:text-base ${
                    isActive(link.href)
                      ? "font-semibold text-[#1C4692]"
                      : "hover:text-[#1C4692]"
                  }`}
                >
                  {link.label}
                  {/* {isActive(link.href) && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#1C4692]" />
                  )} */}
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            {!isDashboard && (
              <div className="relative">
                <button
                  type="button"
                  aria-label="Compare"
                  onMouseEnter={handleOpenCompare}
                  onMouseLeave={handleCloseCompare}
                  onClick={() => setShowCompare((v) => !v)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3F6FF] hover:bg-gray-100 transition"
                >
                  <Image
                    src="/images/convertshape.svg"
                    alt="Compare"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </button>
                {showCompare && (
                  <div
                    className="absolute right-0 top-14 z-50"
                    onMouseEnter={handleOpenCompare}
                    onMouseLeave={handleCloseCompare}
                  >
                    <CompareOverlay />
                  </div>
                )}
              </div>
            )}

            {/* Profile / Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#1C4692] text-white"
                  aria-label="Profile menu"
                >
                  {user?.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.name || "Profile"}
                      width={44}
                      height={44}
                      unoptimized
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <LucideCircleUserRound className="h-5 w-5" />
                  )}
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
                    <IoChevronDown className="h-3 w-3 text-gray-700" />
                  </span>
                </button>

                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-14 z-50 w-[280px] rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
                      {/* Profile Header */}
                      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                          {user?.profileImage ? (
                            <Image
                              src={user.profileImage}
                              alt={user.name || "Profile"}
                              width={40}
                              height={40}
                              unoptimized
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <LucideCircleUserRound className="h-full w-full p-2 text-gray-500" />
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user?.countryCode} {user?.phoneNumber}
                          </p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="px-3 py-3 space-y-2">
                        {[
                          {
                            label: "My Properties",
                            href: "/dashboard/viewed-properties",
                            icon: Building2,
                          },
                          {
                            label: "My Favorite",
                            href: "/dashboard/favorites",
                            icon: HeartIcon,
                          },
                          {
                            label: "Site visits",
                            href: "/dashboard/site-visits",
                            icon: Globe,
                          },
                          {
                            label: "Compare",
                            href: "/compare",
                            icon: "compare",
                          },
                          {
                            label: "My Searches",
                            href: "/dashboard/searches",
                            icon: Search,
                          },
                          {
                            label: "My Preference",
                            href: "/dashboard/preferences",
                            icon: SlidersHorizontal,
                          },
                        ].map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setProfileDropdownOpen(false)}
                              className="
          flex items-center gap-3
          rounded-xl
          px-3 py-3
          text-sm font-medium text-gray-800
          bg-[#f6faffb4]
          transition
        "
                            >
                              {/* Icon container */}
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ">
                                {item.icon === "compare" ? (
                                  <Image
                                    src="/images/convert.svg"
                                    alt="Compare"
                                    width={16}
                                    height={16}
                                  />
                                ) : (
                                  <Icon className="h-4 w-4 text-gray-700" />
                                )}
                              </div>

                              {item.label}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Logout */}
                      <div className="px-4 pb-4">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                            router.push("/");
                          }}
                          className="w-full rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              !isDashboard && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="rounded-full bg-[#1C4692] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1c4692e6] lg:px-7.5 lg:py-2.5 lg:text-base"
                >
                  Sign In
                </button>
              )
            )}

            {/* Mobile Menu */}
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 lg:hidden"
            >
              <HiOutlineMenu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && !isDashboard && (
          <div className="border-t border-gray-100 bg-white pb-4 lg:hidden">
            <nav className="flex flex-col px-4 pt-3 text-gray-700">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-2.5 text-sm ${
                    isActive(link.href) ? "font-semibold text-[#1C4692]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                {!isDashboard && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <Image
                      src="/images/convertshape.svg"
                      alt="Compare"
                      width={18}
                      height={18}
                    />
                  </div>
                )}
                {isAuthenticated ? (
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setOpen(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1C4692] hover:bg-[#1c4692e6] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <IoPerson className="h-5 w-5" />
                    Profile
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      setShowAuthModal(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1C4692] hover:bg-[#1c4692e6] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <IoPerson className="h-5 w-5" />
                    Sign In
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </header>
  );
}
