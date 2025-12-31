import type { PropertyDetailResponseType } from "@/lib/api/services/home.service";
import Link from "next/link";

export default function PDPSupport({ property }: { property?: PropertyDetailResponseType | null }) {
  return (
    <div className="w-full container rounded-3xl bg-white border border-[#F3F3F3] p-[20px] text-center mx-auto">
      <p className="text-lg font-semibold text-gray-800">
        Hi, I am here to Answer <br /> all your queries.
      </p>

      <div className="w-full mx-auto h-48 relative mt-[15px]">
        <img className="w-full h-48 left-0 top-0 absolute rounded-[20px]" src="https://placehold.co/347x187" />
        <div className="size- px-2.5 py-2 left-[20px] top-[123px] absolute bg-stone-300/60 rounded-[10px] backdrop-blur-md inline-flex justify-center items-center gap-[5px]">
          <div className="bg-white size-[30px] rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2844 4.3205L12.3921 6.69988C12.5439 7.02646 12.959 7.35563 13.3148 7.42106L15.4305 7.8382C16.7853 8.10232 17.0699 9.09586 16.0688 10.0458L14.3639 11.6544C14.0792 11.924 13.9034 12.4641 13.9833 12.8488L14.3968 14.9118C14.7216 16.5404 13.8448 17.1448 12.4403 16.2578L10.4784 15.0187C10.1211 14.7922 9.52928 14.7802 9.16469 14.981L7.13607 16.1003C5.68395 16.9003 4.84121 16.248 5.25996 14.6422L5.79448 12.6102C5.89431 12.2304 5.75717 11.6811 5.48725 11.3967L3.86772 9.69026C2.92307 8.68713 3.26431 7.71214 4.62981 7.52435L6.76183 7.23266C7.12185 7.18047 7.55556 6.88443 7.72298 6.56409L8.96693 4.24813C9.64557 3.00092 10.6866 3.03284 11.2844 4.3205Z" fill="#FF9F31" />
            </svg>
          </div>
          <div className="justify-start text-white text-lg font-medium">5 Start Rating</div>
        </div>
      </div>

      <div className="self-stretch inline-flex justify-between items-start w-full py-[15px]">
        <div className="inline-flex flex-col justify-start items-start gap-[5px]">
          <div className="self-stretch justify-start text-black text-xl font-semibold ">Gauswami Goli</div>
          <div className="self-stretch justify-center text-black text-sm font-normal  leading-4">Relationship Manager</div>
        </div>
        <div className="size- flex justify-start items-center gap-[5px]">
          <Link href={`tel:${property?.relationshipManager?.phone ?? ""}`} className="size- px-2.5 py-2 bg-lime-600 rounded-[110px] flex justify-center items-center gap-[5px]">
            <div data-svg-wrapper className="relative">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.72705 1.83333C3.84349 1.83336 3.95555 1.85822 4.05029 1.90364V1.90462L4.05713 1.90755C4.15618 1.95326 4.23722 2.01772 4.30225 2.11165L4.30615 2.11555L5.85205 4.29622L5.854 4.29915C5.9558 4.44054 6.02171 4.5592 6.06396 4.66243L6.06689 4.67024C6.1074 4.76476 6.12061 4.83737 6.12061 4.8802C6.12057 4.93945 6.10357 5.0103 6.05322 5.09309L6.04932 5.09993L6.04443 5.10774C5.98569 5.21153 5.89046 5.33592 5.75342 5.47298L5.74658 5.47981L5.24658 5.99934C5.07174 6.17418 4.99365 6.39252 4.99365 6.62044C4.99369 6.72095 5.0073 6.80881 5.02881 6.89485L5.03564 6.9222L5.04541 6.94856C5.05973 6.98674 5.07447 7.02037 5.08252 7.03938C5.09006 7.05721 5.09182 7.06356 5.09229 7.06477L5.10693 7.10677L5.12744 7.14583C5.27107 7.40915 5.503 7.72621 5.80518 8.08333L5.80908 8.08723C6.11408 8.43967 6.4409 8.80108 6.79639 9.16341L6.80029 9.16731C6.83854 9.20555 6.87757 9.24328 6.91162 9.27571C6.94731 9.3097 6.97816 9.33835 7.00635 9.36653L7.01123 9.37141C7.08051 9.43906 7.08038 9.54523 7.01318 9.61263L5.77979 10.846C5.71706 10.9087 5.61486 10.9154 5.53955 10.845C5.50094 10.8067 5.46288 10.7708 5.4292 10.7386L5.32666 10.64C4.65779 9.96443 4.05455 9.25707 3.51709 8.51888C3.05503 7.87619 2.67652 7.23909 2.38623 6.61263L2.26709 6.34407C1.97499 5.63401 1.8335 4.97383 1.8335 4.3597C1.83353 3.96578 1.90285 3.59602 2.0376 3.25911L2.03857 3.25618C2.17 2.9222 2.37998 2.60954 2.68311 2.32356L2.69092 2.31673C3.04211 1.97102 3.3883 1.83333 3.72705 1.83333Z" fill="white" stroke="white" />
                <path d="M11.0933 9.86C11.1466 9.86 11.2162 9.87102 11.311 9.90981C11.4155 9.9526 11.5374 10.0194 11.6851 10.1198L13.8833 11.6813L13.8882 11.6842C13.993 11.7568 14.0472 11.8258 14.0786 11.8932C14.125 12.011 14.147 12.1126 14.147 12.2204C14.1469 12.3474 14.123 12.4827 14.0757 12.6159C14.0557 12.6692 14.0454 12.6979 14.0327 12.7233L14.0278 12.733C13.9343 12.931 13.8142 13.1159 13.6558 13.2907C13.3858 13.5882 13.0993 13.7945 12.7866 13.9303L12.7251 13.9567C12.3918 14.0923 12.0289 14.1666 11.6333 14.1666C11.0324 14.1666 10.3722 14.0256 9.65576 13.7204C8.92862 13.4105 8.19588 12.9909 7.46436 12.4586H7.46533C7.35789 12.3787 7.25266 12.3003 7.1499 12.2223L8.64111 10.7311C8.71095 10.7743 8.77678 10.8155 8.84131 10.8493L8.86377 10.861L8.88721 10.8707C8.8906 10.8721 8.89811 10.8756 8.91943 10.8854C8.93765 10.8937 8.96632 10.9066 8.99658 10.9196L9.00732 10.9245L9.01807 10.9284C9.1443 10.9756 9.26125 10.987 9.35986 10.987C9.61181 10.987 9.82317 10.8899 9.98486 10.7291L10.4907 10.2291L10.4937 10.2272C10.6401 10.0807 10.759 9.99103 10.8511 9.94301L10.8657 9.9352L10.8794 9.92738C10.9642 9.87577 11.0291 9.86 11.0933 9.86Z" fill="white" stroke="white" />
              </svg>
            </div>
            <div className="justify-start text-white text-sm font-medium ">Call</div>
          </Link>
          <Link href={`mailto:${property?.relationshipManager?.email ?? ""}`} className="size- px-2.5 py-2 bg-white rounded-[110px] outline -outline-offset-1 outline-zinc-100 flex justify-center items-center gap-[5px]">
            <div data-svg-wrapper className="relative">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.6665 2.83333H11.3335C12.2568 2.83333 12.9497 3.06442 13.4097 3.49153C13.8629 3.91241 14.1664 4.59516 14.1665 5.66634V10.3333C14.1665 11.4046 13.8629 12.0872 13.4097 12.5081C12.9497 12.9353 12.2568 13.1663 11.3335 13.1663H4.6665C3.74331 13.1663 3.05029 12.9352 2.59033 12.5081C2.13717 12.0872 1.8335 11.4045 1.8335 10.3333V5.66634C1.83356 4.59524 2.13713 3.91242 2.59033 3.49153C3.05029 3.06443 3.74331 2.83338 4.6665 2.83333ZM12.1069 5.37141C11.7624 4.93286 11.1298 4.87686 10.7085 5.21614L8.62158 6.88313H8.62061C8.47194 7.00245 8.24667 7.07845 7.99658 7.07845C7.74666 7.0784 7.52215 7.00236 7.37354 6.88313H7.37256L5.28564 5.21614H5.28467C4.84646 4.86346 4.22291 4.95584 3.88525 5.37141L3.87939 5.37923C3.54682 5.80524 3.61196 6.43495 4.03857 6.78157L4.0415 6.78352L6.12451 8.44661V8.44759C6.65978 8.88393 7.34304 9.08626 8.00049 9.08626C8.65987 9.08619 9.33362 8.883 9.87256 8.45052L11.9575 6.78352L11.9585 6.7845L11.9624 6.78157C12.3854 6.43785 12.4536 5.8128 12.1177 5.38509H12.1187C12.1167 5.38255 12.1147 5.37978 12.1128 5.37727C12.1112 5.37533 12.1095 5.37335 12.1079 5.37141H12.1069Z" fill="black" stroke="black" />
              </svg>
            </div>
            <div className="justify-start text-black text-sm font-medium ">Email</div>
          </Link>
        </div>
      </div>

      <button
        className="rounded-full w-full bg-[#1C4692] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1c4692e6] lg:px-7.5 lg:py-2.5 lg:text-base">
        Book A Visit
      </button>
    </div>
  );
}
