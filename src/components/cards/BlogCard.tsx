import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

interface BlogCardProps {
  image: StaticImageData | string;
  date: string;
  title: string;
  description: string;
  buttonText?: string;
  href: string;
  className?: string;
}

export default function BlogCard({
  image,
  date,
  title,
  description,
  buttonText = "Read More",
  href,
  className = "",
}: BlogCardProps) {
  return (
    <div
      className={`inline-flex flex-col items-start self-stretch ${className}`}
    >
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-tl-4xl rounded-tr-4xl"
        />
      </div>

      {/* Content */}
      <div className="self-stretch p-3.5 bg-white rounded-bl-4xl rounded-br-4xl shadow-[0px_4px_50px_0px_rgba(0,0,0,0.10)] flex flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <span className="text-neutral-400 text-sm font-medium">{date}</span>

          <h3 className="text-black text-2xl font-semibold">{title}</h3>

          <p className="text-neutral-700 text-sm font-medium leading-6">
            {description}
          </p>
        </div>

        <Link
          href={href}
          className="px-7 py-2.5 bg-[#1C4692] hover:bg-[#1c4692e6] rounded-[110px] inline-flex justify-center items-center text-white text-lg font-semibold w-fit"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
