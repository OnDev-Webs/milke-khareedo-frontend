"use client";

import Image from "next/image";
import { Heart, Share2, Phone, Repeat } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward, IoHeart } from "react-icons/io5";
import { useState } from "react";
import { FaPhoneAlt, FaShare } from "react-icons/fa";

type PropertyCardProps = {
    id: string;
    images: string[];
    title: string;
    location: string;
    groupSize: number;
    openingLeft: number;
    targetPrice: string;
    developerPrice: string;
    showDiscount?: boolean;
    discountPercentage?: string;
    lastViewedAt?: string;
    lastDayToJoin?: string;

    onFavoriteClick?: (property: {
        id: string;
        projectName: string;
        location: string;
    }) => void;

    onShareClick?: (property: {
        id: string;
        projectName: string;
        location: string;
    }) => void;

    isFavorite?: boolean;
    isFavoriteLoading?: boolean;

};


export default function PropertyCard({
    id,
    images,
    title,
    location,
    groupSize,
    openingLeft,
    targetPrice,
    developerPrice,
    showDiscount = false,
    discountPercentage,
    lastViewedAt,
    lastDayToJoin,
    onFavoriteClick,
    onShareClick,
    isFavorite = false,
    isFavoriteLoading = false,
}: PropertyCardProps) {

    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const hasMultipleImages = images.length > 1;
    const actionBtn =
        "flex h-9 w-9 items-center font-black justify-center rounded-full bg-white shadow-md";


    return (
        <div
            onClick={() => router.push(`/property-details/${id}`)}
            className="group flex flex-col rounded-4xl bg-white p-4 shadow-sm cursor-pointer"
        >


            <div className="relative aspect-[5/3.5] w-full overflow-hidden rounded-3xl">
                <Image
                    src={images[currentIndex]}
                    alt={title}
                    fill
                    className="object-cover"
                />
                {hasMultipleImages && (
                    <>
                        {/* LEFT */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(
                                    (prev) => (prev - 1 + images.length) % images.length
                                );
                            }}
                            className="
        absolute left-4 bottom-6
        h-9 w-9 flex items-center justify-center
        rounded-full bg-white/95 text-gray-700
        shadow-lg border border-gray-200
        transition-all duration-300
        opacity-0 scale-90 pointer-events-none
        group-hover:opacity-100
        group-hover:scale-100
        group-hover:pointer-events-auto
      "
                            aria-label="Previous image"
                        >
                            <IoChevronBack className="h-5 w-5" />
                        </button>

                        {/* RIGHT */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(
                                    (prev) => (prev + 1) % images.length
                                );
                            }}
                            className="
        absolute right-4 bottom-6
        h-9 w-9 flex items-center justify-center
        rounded-full bg-white/95 text-gray-700
        shadow-lg border border-gray-200
        transition-all duration-300
        opacity-0 scale-90 pointer-events-none
        group-hover:opacity-100
        group-hover:scale-100
        group-hover:pointer-events-auto
      "
                            aria-label="Next image"
                        >
                            <IoChevronForward className="h-5 w-5" />
                        </button>
                    </>
                )}


                {lastDayToJoin && (
                    <span className="
  absolute left-3 top-3
  rounded-lg bg-white/95
  px-3 py-1.5
  text-xs font-medium text-black
  shadow-md
">
                        {lastDayToJoin}
                    </span>

                )}



                <div
                    className="
    absolute right-3 top-3 z-20
    flex flex-col gap-2
    opacity-0 -translate-y-1.5 pointer-events-none
    transition-all duration-300
    group-hover:opacity-100
    group-hover:translate-y-0
    group-hover:pointer-events-auto
  "
                >



                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavoriteClick?.({ id, projectName: title, location });
                        }}
                        disabled={isFavoriteLoading}
                        className={actionBtn}
                    >
                        <IoHeart
                            size={16}
                            fill={isFavorite ? "red" : "none"}
                            stroke={isFavorite ? "red" : "black"}
                            strokeWidth={32}
                        />
                    </button>



                    <button className={actionBtn} aria-label="Add to compare">
                        <Image
                            src="/images/convert.svg"
                            alt="Compare"
                            width={16}
                            height={16}
                        />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onShareClick?.({ id, projectName: title, location });
                        }}
                        className={actionBtn}
                    >
                        <Image
                            src="/images/Share.svg"
                            alt="Share"
                            width={16}
                            height={16}
                        />
                    </button>


                </div>

                <div
                    className="
    absolute bottom-3 left-1/2 -translate-x-1/2
    flex gap-1.5 z-20
    opacity-0 pointer-events-none
    transition-opacity duration-300
    group-hover:opacity-100
    group-hover:pointer-events-auto
  "
                >
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`
      h-1.5 w-1.5 rounded-full
      ${index === currentIndex ? "bg-white" : "bg-white/50"}
    `}
                        />
                    ))}

                </div>

            </div>

            <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold">{title}</h3>
                        <p
                            className="text-sm text-gray-600 truncate max-w-[220px]"
                            title={location}
                        >
                            {location}
                        </p>
                    </div>

                    <button className="flex items-center gap-1 rounded-full bg-[#66AE39] px-3 py-2  text-white">
                        <Image
                            src="/images/call.svg"
                            alt="Compare"
                            width={12}
                            height={12}
                            className="h-4.5 w-5"
                        /> <span className="text-md"> Call</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <StatBox label="Group Size" value={`${groupSize} Members`} />
                    <StatBox label="Opening" value={`${openingLeft} Left`} />
                </div>

                <div className="rounded-2xl bg-[#F7FAFF] p-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-900">Target Price</p>
                            <p className="text-lg font-extrabold text-gray-900">
                                {targetPrice}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-900">Developer price</p>
                            <p className="text-md text-gray-700 line-through">
                                {developerPrice}
                            </p>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm text-[#66AE39]">
                        <Image
                            src="/images/Frame.svg"
                            alt="Compare"
                            width={12}
                            height={12}
                            className="h-4.5 w-5"
                        />
                        <span>Up to {discountPercentage} off</span>
                    </div>

                    {showDiscount ? (
                        <p className="mt-1 text-sm text-red-500">
                            Get up to {discountPercentage} discount on this property
                        </p>
                    ) : (
                        lastViewedAt && (
                            <p className="mt-3 text-xs text-red-500">
                                Last viewed on {new Date(lastViewedAt).toLocaleString()}
                            </p>
                        )
                    )}

                </div>

                <button
                    onClick={() => router.push(`/property-details/${id}`)}
                    className="mt-2 rounded-full bg-[#1C4692] hover:bg-[#1c4692e6] py-3 text-[16px] font-semibold text-white">
                    View Details
                </button>
            </div>
        </div>
    );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
    return <button className="rounded-full bg-white p-2 shadow">{icon}</button>;
}

type StatBoxProps = {
    label: string;
    value: string;
    className?: string;
};

function StatBox({ label, value, className = "bg-[#F7FAFF]" }: StatBoxProps) {
    const [number, text] = value.split(" ");

    return (
        <div className={`rounded-xl px-4 py-3 text-center ${className}`}>
            <p className="text-md font-semibold text-gray-900">{label}</p>

            <p className="mt-1 text-sm">
                <span className="font-bold text-xl text-[#1C4692]">{number}</span>{" "}
                <span className="text-gray-600 ">{text}</span>
            </p>
        </div>
    );
}




