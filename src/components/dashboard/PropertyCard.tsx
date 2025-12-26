"use client";

import Image from "next/image";
import { Heart, Share2, Phone, Repeat } from "lucide-react";

type PropertyCardProps = {
    image: string;
    title: string;
    location: string;
    groupSize: number;
    openingLeft: number;
    targetPrice: string;
    developerPrice: string;
    showDiscount?: boolean;
    lastViewedAt?: string;
};


export default function PropertyCard({
    image,
    title,
    location,
    groupSize,
    openingLeft,
    targetPrice,
    developerPrice,
    showDiscount = false,
    lastViewedAt,
}: PropertyCardProps) {
    return (
        <div className="flex flex-col rounded-4xl bg-white p-4 shadow-sm">
            <div className="relative overflow-hidden rounded-3xl">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={260}
                    className="h-[180px] w-full object-cover"
                />

                <span className="absolute hidden sm:block left-3 top-3 rounded-sm bg-white px-3 py-1 text-xs font-medium">
                    Last Day to join: 31st Jun, 2026
                </span>

                <div className="absolute right-3 top-3 flex flex-col gap-2">
                    <IconButton icon={<Heart size={16} />} />
                    <IconButton icon={<Repeat size={16} />} />
                    <IconButton icon={<Share2 size={16} />} />
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold">{title}</h3>
                        <p className="text-xs text-gray-500">{location}</p>
                    </div>

                    <button className="flex items-center gap-1 rounded-full bg-[#5fb946] px-3 py-2 text-xs text-white">
                        <Phone size={14} /> Call
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <StatBox label="Group Size" value={`${groupSize} Members`} />
                    <StatBox label="Opening" value={`${openingLeft} Left`} />
                </div>

                <div className="rounded-2xl bg-[#F7FAFF] p-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-gray-500">Target Price</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {targetPrice}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-gray-500">Developer price</p>
                            <p className="text-sm text-gray-400 line-through">
                                {developerPrice}
                            </p>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm text-green-600">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs">
                            %
                        </span>
                        <span>Up to 63.28% off</span>
                    </div>

                    {showDiscount && (
                        <>
                            <p className="mt-1 text-sm text-red-500">
                                Get upto 12% discount on this property
                            </p>
                        </>
                    )}

                    {!showDiscount && lastViewedAt && (
                        <p className="mt-3 text-xs text-red-500">
                            Last viewed on {lastViewedAt}
                        </p>
                    )}

                </div>


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
    className = "bg-[#F7FAFF]",
}: StatBoxProps) {
    const [number, text] = value.split(" ");

    return (
        <div className={`rounded-xl px-4 py-3 text-center ${className}`}
        >
            <p className="text-sm font-semibold text-gray-900">
                {label}
            </p>

            <p className="mt-1 text-sm">
                <span className="font-bold text-xl text-[#ff7a59]">
                    {number}
                </span>{" "}
                <span className="text-gray-600">{text}</span>
            </p>
        </div>
    );
}
