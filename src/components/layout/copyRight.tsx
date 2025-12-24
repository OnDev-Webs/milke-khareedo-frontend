"use client";

import Link from "next/link";

export default function CopyRight() {
  return (
    <div className="border-t border-white/10 bg-[#2b2b2b] py-6">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 sm:flex-row">
          <p>© Copyright 2025 MILKE KHEREEDO</p>
          <div className="flex items-center gap-2">
            <Link
              href="/terms-of-use"
              className="transition-colors hover:text-white"
            >
              Terms of use
            </Link>
            <span>|</span>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
