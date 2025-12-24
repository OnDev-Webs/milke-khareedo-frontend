type Props = {
  data: {
    id: number;
    title: string;
    desciption: string;
    img: string;
  };
};

export default function FAQSCard({ data }: Props) {
  return (
    <div className="w-250 max-w-250 rounded-4xl bg-[#FFFFFF]">
      <div className="flex justify-between items-center py-8.5 px-10">
        <div className="">
          <h2 className="text-[#828282] py-1 font-semibold text-4xl leading-[100%]">
            {data?.title}
          </h2>
          <p className="text-[#9795B5] py-1 font-normal text-xl leading-8">
            {data?.desciption}
          </p>
        </div>
        <div className=" size-12.5 bg-[#D9D9D9] rounded-2xl flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 text-gray-400"
          >
            <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
            <circle cx="9" cy="8" r="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
