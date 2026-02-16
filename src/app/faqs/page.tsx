"use client";

import FAQSCard from "@/components/home/hero/faqs/faqsCard";

export default function FAQSPage() {
    const faqsData = [
        {
            id: 1,
            title: "What is MilkeKhareedo?",
            desciption:
                "MilkeKhareedo is a group-buying real estate platform where multiple buyers come together to negotiate better prices and benefits directly with trusted developers.",
        },
        {
            id: 2,
            title: "How does group buying help me save money?",
            desciption:
                "When buyers purchase as a group, developers offer better pricing, additional discounts, and reduced charges compared to individual purchases.",
        },
        {
            id: 3,
            title: "Is MilkeKhareedo safe and trustworthy?",
            desciption:
                "Yes. We work only with verified developers and projects. Our team ensures transparency, clear documentation, and end-to-end support for buyers.",
        },
        {
            id: 4,
            title: "Do I have to buy property immediately after registering?",
            desciption:
                "No. Registering with MilkeKhareedo does not force you to buy. You can explore projects, understand pricing, and decide at your own pace.",
        },
        {
            id: 5,
            title: "Are there any extra charges for using MilkeKhareedo?",
            desciption:
                "No hidden charges. Our pricing and services are clearly explained upfront, ensuring complete transparency.",
        },
        {
            id: 6,
            title: "Can first-time homebuyers use MilkeKhareedo?",
            desciption:
                "Absolutely. MilkeKhareedo is ideal for first-time buyers as we guide you through every step of the property buying process.",
        },
        {
            id: 7,
            title: "Which locations do you cover in Hyderabad?",
            desciption:
                "We cover major residential and investment locations across Hyderabad, including IT corridors, emerging areas, and premium developments.",
        },
        {
            id: 8,
            title: "Do you help with home loans and legal support?",
            desciption:
                "Yes. We assist buyers with home loan support, documentation, and basic legal guidance to make the buying process smooth.",
        },
        {
            id: 9,
            title: "Can NRIs buy property through MilkeKhareedo?",
            desciption:
                "Yes. We provide dedicated support for NRIs, including virtual property tours, documentation assistance, and coordination from abroad.",
        },
        {
            id: 10,
            title: "How do I get started with MilkeKhareedo?",
            desciption:
                "Simply register on our website or contact our team. We’ll connect you with ongoing group deals and guide you through the next steps.",
        },
    ];

    return (
        <section className="bg-[#F0F8FF] py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 min-h-screen" id="faqs">
            <div className="mx-auto max-w-[1300px] flex flex-col items-center gap-10">
                {/* Heading */}
                <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-semibold text-black text-center">
                    <span className="relative inline-block text-[#1C4692] pe-2">
                        Questions
                        <svg
                            className="absolute left-0 -bottom-2 w-[130px] sm:w-[150px] md:w-[164px]"
                            viewBox="0 0 228 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2 8.5C60 1.5 170 5.5 226 8.5"
                                stroke="#1C4692"
                                strokeWidth="5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>{" "}
                    Buyers Usually Ask
                </h2>

                {/* FAQ List */}
                <div className="w-full flex flex-col gap-4 sm:gap-5">
                    {faqsData.map((faq) => (
                        <FAQSCard key={faq.id} data={faq} />
                    ))}
                </div>
            </div>
        </section>
    );
}