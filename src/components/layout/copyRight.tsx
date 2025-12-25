"use client";

import Link from "next/link";

export default function CopyRight() {
  return (
    <div className="border-t border-white/10 bg-[#FFFFFF] py-6">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-[#B7B7B7] sm:flex-row">
          <p>© Copyright 2025 MILKE KHEREEDO</p>
          <div className="flex items-center gap-2">
            <Link
              href="/terms-of-use"
              className="transition-colors"
            >
              Terms of use
            </Link>
            <span>|</span>
            <Link
              href="/privacy-policy"
              className="transition-colors"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
