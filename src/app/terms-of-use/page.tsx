"use client";

import Heading from "@/components/typography/heading";

export default function Page() {
  // Get current date in DD/MM/YYYY format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <section className="pt-10 pb-[100px]">
        <div className="container mx-auto">
          <div className="inline-flex flex-col justify-start items-start gap-7">
            <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
              <Heading
                variant={"h3"}
                className="justify-start text-black font-semibold"
              >
                TERMS & CONDITIONS
              </Heading>
              <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="self-stretch justify-start text-zinc-500 text-lg font-medium leading-8">
                <p className="mb-6">
                  <strong>Last updated: {getCurrentDate()}</strong>
                </p>
                <p className="mb-6">
                  Welcome to Milke Khareedo.
                </p>
                <p className="mb-6">
                  By accessing or using our website, platform, or services, you agree to the following terms. Please read them carefully. If you do not agree, kindly refrain from using our services.
                </p>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>1. About Milke Khareedo</strong>
                  </p>
                  <p>
                    Milke Khareedo is a group-buying platform designed to help property buyers come together and access better pricing and benefits than individual buying. We do not sell property directly and do not act as a builder or developer.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>2. Nature of Our Service</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We help buyers discover properties, form buyer groups, and understand potential pricing advantages.</li>
                    <li>All property purchases are made directly between the buyer and the developer/builder.</li>
                    <li>Final pricing, availability, approvals, and agreements are solely determined by the developer.</li>
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>3. No Guarantee of Pricing or Savings</strong>
                  </p>
                  <p>
                    While group buying can lead to better pricing, Milke Khareedo does not guarantee specific discounts, savings, or outcomes. Benefits may vary based on demand, project, and builder policies.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>4. No Brokerage or Forced Commitment</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Joining a buyer group does not obligate you to purchase.</li>
                    <li>You are free to proceed or not proceed at any stage.</li>
                    <li>We do not force decisions, urgency, or commitments.</li>
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>5. Information Accuracy</strong>
                  </p>
                  <p>
                    We strive to provide accurate and updated information. However, property details such as pricing, availability, timelines, and specifications are subject to change by developers without notice.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>6. User Responsibilities</strong>
                  </p>
                  <p className="mb-2">You agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate contact and personal information</li>
                    <li>Use the platform only for lawful purposes</li>
                    <li>Not misuse or attempt to manipulate group-buying processes</li>
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>7. Third-Party Relationships</strong>
                  </p>
                  <p>
                    Milke Khareedo may connect you with developers, agents, or service providers. We are not responsible for third-party actions, representations, or agreements.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>8. Limitation of Liability</strong>
                  </p>
                  <p className="mb-2">Milke Khareedo is not liable for:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Financial decisions made by users</li>
                    <li>Disputes between buyers and developers</li>
                    <li>Delays, cancellations, or changes by builders</li>
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>9. Intellectual Property</strong>
                  </p>
                  <p>
                    All content, branding, and materials on this website belong to Milke Khareedo and may not be copied or reused without permission.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>10. Changes to Terms</strong>
                  </p>
                  <p>
                    We may update these terms from time to time. Continued use of the platform implies acceptance of updated terms.
                  </p>
                </div>
                <div className="mb-6">
                  <p className="mb-3">
                    <strong>11. Governing Law</strong>
                  </p>
                  <p>
                    These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Hyderabad, Telangana.
                  </p>
                </div>
                <p className="mt-6">
                  For questions, contact us at:
                  <br />
                  Email: <a href="mailto:support@milkekhereedo.com" className="text-blue-600 hover:underline">support@milkekhereedo.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
