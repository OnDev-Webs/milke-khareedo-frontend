"use client";

import Image from "next/image";
import { Heart, Share2, Phone } from "lucide-react";

type PropertyCardProps = {
  image: string;
  title: string;
  location: string;
  groupSize: number;
  openingLeft: number;
  targetPrice: string;
  developerPrice: string;
};

export default function PropertyCard({
  image,
  title,
  location,
  groupSize,
  openingLeft,
  targetPrice,
  developerPrice,
}: PropertyCardProps) {
  return (
    <div className="flex flex-col rounded-4xl bg-[#f8fbff] p-4 shadow-sm">
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src={image}
          alt={title}
          width={400}
          height={260}
          className="h-[180px] w-full object-cover"
        />

        <span className="absolute left-3 top-3 rounded-md bg-white px-3 py-1 text-xs font-medium">
          Last Day to join: 31st Jun, 2026
        </span>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <IconButton icon={<Heart size={16} />} />
          <IconButton icon={<Share2 size={16} />} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-gray-500">{location}</p>
          </div>

          <button className="flex items-center gap-1 rounded-full bg-[#5fb946] px-3 py-1 text-xs text-white">
            <Phone size={14} /> Call
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <StatBox label="Group Size" value={`${groupSize} Members`} />
          <StatBox label="Opening"  value={`${openingLeft} Left`} />
        </div>

        <div>
          <p className="text-xs text-gray-500">Target Price</p>
          <p className="text-lg font-semibold">{targetPrice}</p>

          <p className="text-xs text-gray-400 line-through">
            {developerPrice}
          </p>

          <p className="mt-1 text-xs text-green-600">
            Up to 63.28% off
          </p>

          <p className="mt-1 text-xs text-red-500">
            Get upto 12% discount on this property
          </p>
        </div>

        {/* CTA */}
        <button className="mt-2 rounded-full bg-[#ff7a59] py-2 text-sm font-semibold text-white">
          View Details
        </button>
      </div>
    </div>
  );
}


function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="rounded-full bg-white p-2 shadow">
      {icon}
    </button>
  );
}

type StatBoxProps = {
  label: string;
  value: string;
  className?: string;
};

 function StatBox({
  label,
  value,
  className = "bg-[#EBEBEB]",
}: StatBoxProps) {
  return (
    <div
      className={`rounded-xl px-4 py-3 text-center ${className}`}
    >
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}

