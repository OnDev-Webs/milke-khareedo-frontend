"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import CompareIcon from "./CompareIcon";
import { useAuthContext } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { IoPerson, IoChevronDown } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/property-archive" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname?.startsWith("/dashboard");
  const { isAuthenticated, user, logout } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
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
                  className={`relative pb-1 text-sm transition-colors xl:text-base ${isActive(link.href)
                      ? "font-semibold text-[#1C4692]"
                      : "hover:text-[#1C4692]"
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#1C4692]" />
                  )}
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            {!isDashboard && <CompareIcon />}

            {/* Profile / Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#1C4692] text-white transition-colors hover:bg-[#e14f20]"
                  aria-label="Profile menu"
                >
                  {user?.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.name || "Profile"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <IoPerson className="h-5 w-5" />
                  )}
                  <IoChevronDown className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5" />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-12 z-50 min-w-[200px] rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="border-b border-gray-100 px-4 py-2">
                        <p className="text-sm font-medium text-gray-800">
                          {user?.name || "User"}
                        </p>
                        {user?.phoneNumber && (
                          <p className="text-xs text-gray-500">
                            {user.countryCode} {user.phoneNumber}
                          </p>
                        )}
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                          router.push("/");
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              !isDashboard && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="rounded-full bg-[#1C4692] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e14f20] lg:px-7.5 lg:py-2.5 lg:text-base"
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
                  className={`py-2.5 text-sm ${isActive(link.href) ? "font-semibold text-[#1C4692]" : ""
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                {!isDashboard && <CompareIcon />}
                {isAuthenticated ? (
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setOpen(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1C4692] px-4 py-2.5 text-sm font-semibold text-white"
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
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1C4692] px-4 py-2.5 text-sm font-semibold text-white"
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
