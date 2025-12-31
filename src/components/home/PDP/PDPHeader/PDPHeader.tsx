import upPrice from "@/assets/upPrice.svg"
import { PropertyDetailResponseType } from "@/lib/api";
import Image from "next/image"

export default function PDPHeader({ property }: { property?: PropertyDetailResponseType | null }) {
  return (
    <section className="py-8">
      <div className="container mx-auto p-7 bg-white rounded-[30px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.05)] outline -outline-offset-1 outline-zinc-100 flex flex-col justify-center items-center gap-2.5">
        <div className="self-stretch flex flex-col justify-center items-start gap-3.5">
              <div className="self-stretch inline-flex justify-between items-center">
            <div className="w-full max-w-[570px] inline-flex flex-col justify-start items-start gap-5">
              <div className="self-stretch justify-start text-blue-900 text-5xl font-bold ">{property?.projectName || 'Project Name'}</div>
              <div className="self-stretch justify-start text-black text-xl font-normal ">{property?.location || 'Location'}</div>
            </div>
            <div className="flex-1 p-5 bg-indigo-50 rounded-4xl inline-flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-center items-center gap-2.5">
                <div className="self-stretch inline-flex justify-between items-end">
                  <div className="size- inline-flex flex-col justify-start items-start gap-2.5">
                    <div className="justify-start text-black text-base font-medium ">Starting Price</div>
                    <div className="justify-start text-black text-4xl font-bold ">{property?.startingPrice?.formatted || '—'}</div>
                  </div>
                  <div className="self-stretch inline-flex flex-col justify-between items-end">
                    <div className="justify-start text-black text-base font-medium ">Starting Developer price</div>
                    <div className="justify-start text-neutral-600 text-2xl font-semibold  line-through">{property?.developerPrice || ''}</div>
                  </div>
                </div>
                <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                  <div className="flex-1 px-2.5 py-1.5 bg-white rounded-[60px] inline-flex flex-col justify-center items-start gap-2.5">
                    <div className="size- inline-flex justify-center items-center gap-[5px]">
                      <Image src={upPrice} alt="Up Price" width={21} height={21} />
                      <div className="text-center justify-start text-lime-600 text-sm font-medium ">Up to 63.28 L off</div>
                    </div>
                  </div>
                  <div className="text-center justify-start text-red-500 text-sm font-normal ">Get upto 12% discount on this property</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
