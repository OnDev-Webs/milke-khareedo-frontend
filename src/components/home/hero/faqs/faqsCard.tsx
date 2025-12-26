"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  data: {
    id: number;
    title: string;
    desciption: string;
  };
};

export default function FAQSCard({ data }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-250 max-w-250 max-md:w-[150%] mx-10px rounded-4xl bg-[#FFFFFF] shadow-md">
      {/* Header */}
      <div
        className="flex justify-between items-center py-6 px-8 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-[#000] font-semibold text-[20px] md:text-[24px] leading-[100%]">
          {data?.title}
        </h2>

        <div className="text-[#FF765E]">
          {open ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {open && (
        <div className="px-8 pb-6">
          <p className="text-[#8C8C8C] font-medium text-[16px] md:text-[18px] leading-7">
            {data?.desciption}
          </p>
        </div>
      )}
    </div>
  );
}
