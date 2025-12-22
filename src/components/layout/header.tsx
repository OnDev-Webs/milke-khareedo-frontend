"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/property-archive" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Property", href: "/property-details" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="w-full border-gray-100 bg-white px-30">
      <div className="w-300 mx-auto ">
        <div className=" flex items-center justify-between py-7.5">
          <Link href="/public" className="flex items-center gap-2">
            <div className="text-heading-primary-text flex flex-col leading-none font-semibold text-[40px]">
              Logo
            </div>
          </Link>

          <nav className="hidden items-center gap-10  text-gray-600 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 transition-colors ${
                  isActive(link.href) ? "text-black" : "hover:text-black"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-0 bottom-0.5 h-0.5 bg-[#f15a29]" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/signin"
              className="rounded-full bg-[#f15a29] px-7.5 py-2.5  font-semibold text-white shadow-sm hover:bg-[#e14f20] text-xl"
            >
              Sign In
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center justify-center rounded-md border border-gray-200 p-2 lg:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <span className="flex flex-col gap-[5px]">
              <span className="h-0.5 w-5 rounded bg-gray-800" />
              <span className="h-0.5 w-5 rounded bg-gray-800" />
              <span className="h-0.5 w-5 rounded bg-gray-800" />
            </span>
          </button>
        </div>

        {open && (
          <div className="border-t border-gray-100 bg-white pb-3 lg:hidden">
            <nav className="flex flex-col px-4 pt-2  text-gray-700">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-2 ${
                    isActive(link.href) ? "font-semibold text-black" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex flex-col gap-2">
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-full bg-[#f15a29] px-4 py-2 text-center  font-semibold text-white shadow-sm"
                >
                  Sign In
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
