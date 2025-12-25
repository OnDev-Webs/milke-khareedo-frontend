"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#2b2b2b] text-white">
      <div className="mx-auto container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image
                src={Logo}
                alt="MILKE KHEREEDO logo"
                width={200}
                height={50}
                className="h-auto w-auto"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-white/90 lg:text-base">
              Buying property shouldn't feel confusing or lonely. We help buyers
              come together, understand pricing clearly, and make confident
              decisions — without pressure.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FF765E] transition-colors hover:bg-gray-200"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FF765E] transition-colors hover:bg-gray-200"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FF765E] transition-colors hover:bg-gray-200"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FF765E] transition-colors hover:bg-gray-200"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Columns - Navigation Links */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
            {/* Explore Column */}
            <div>
              <h3 className="mb-4 text-base font-bold uppercase tracking-wide lg:text-lg">
                Explore
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/property-archive"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    href="/group-buying"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Group Buying
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-studies"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Articles
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Buyers Column */}
            <div>
              <h3 className="mb-4 text-base font-bold uppercase tracking-wide lg:text-lg">
                For Buyers
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/first-time-buyers"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    First-Time Buyers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing-value"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Pricing & Value
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    FAQ's
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="mb-4 text-base font-bold uppercase tracking-wide lg:text-lg">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base pe-20"
                  >
                    About Milke Khareedo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-approach"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Our Approach
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-use"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-white/80 transition-colors hover:text-white lg:text-base"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
