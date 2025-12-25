"use client";

import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@/lib/api/hooks/useApi";
import { homeService, type EMICalculatorResponse } from "@/lib/api/services/home.service";
import { HiLightBulb } from "react-icons/hi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/navigation";

// Partner logos data (placeholder - replace with actual data)
const partnerLogos = [
  { name: "Partner 1", logo: "🔷" },
  { name: "Partner 2", logo: "M" },
  { name: "Norte", logo: "Norte" },
  { name: "iQ Credit Union", logo: "iQ" },
  { name: "Partner 5", logo: "🔵" },
  { name: "Partner 6", logo: "O" },
  { name: "Partner 7", logo: "W" },
];

export default function CalculateSave() {
  const router = useRouter();

  // Default values - starting with ₹ 3.6 Crore (36000000) as per reference image
  const [loanAmount, setLoanAmount] = useState(36000000); // ₹ 3.6 Crore
  const [rateOfInterest, setRateOfInterest] = useState(8.9);
  const [loanTenure, setLoanTenure] = useState(60); // 60 months
  const [currency, setCurrency] = useState("INR");

  // EMI Calculation result state
  const [emiData, setEmiData] = useState<EMICalculatorResponse | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Slider ranges - ₹30 lakh to ₹50 crore
  const loanAmountRange = { min: 3000000, max: 500000000 }; // ₹ 30 Lakh to ₹ 50 Crore
  const rateRange = { min: 7, max: 11 };
  const tenureRange = { min: 12, max: 60 };

  // Calculate slider percentages
  const loanAmountPercent = ((loanAmount - loanAmountRange.min) / (loanAmountRange.max - loanAmountRange.min)) * 100;
  const ratePercent = ((rateOfInterest - rateRange.min) / (rateRange.max - rateRange.min)) * 100;
  const tenurePercent = ((loanTenure - tenureRange.min) / (tenureRange.max - tenureRange.min)) * 100;

  // Format loan amount for display
  const formatLoanAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹ ${(amount / 10000000).toFixed(1)} Crore`;
    } else if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹ ${(amount / 1000).toFixed(0)}k`;
    }
  };

  // EMI calculation mutation
  const { mutate: calculateEMI, loading: calculating, data: emiResponseData } = useMutation<
    EMICalculatorResponse,
    { loanAmount: string; rateOfInterest: number; loanTenure: number }
  >(
    async (params) => {
      return homeService.calculateEMI(params);
    }
  );

  // Update emiData when API response changes
  useEffect(() => {
    if (emiResponseData) {
      setEmiData(emiResponseData);
    }
  }, [emiResponseData]);

  // Calculate EMI when values change
  const handleCalculateEMI = useCallback(async () => {
    setIsCalculating(true);
    try {
      await calculateEMI({
        loanAmount: loanAmount.toString(),
        rateOfInterest,
        loanTenure,
      });
    } catch (error) {
      console.error("Error calculating EMI:", error);
    } finally {
      setIsCalculating(false);
    }
  }, [loanAmount, rateOfInterest, loanTenure, calculateEMI]);

  // Initial calculation on mount
  useEffect(() => {
    handleCalculateEMI();
  }, []);

  // Calculate EMI when inputs change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculateEMI();
    }, 300);
    return () => clearTimeout(timer);
  }, [loanAmount, rateOfInterest, loanTenure]);

  // Handle reset
  const handleReset = () => {
    setLoanAmount(36000000);
    setRateOfInterest(8.9);
    setLoanTenure(60);
    setCurrency("INR");
  };

  // Handle Get Loan button - redirect to Contact Us
  const handleGetLoan = () => {
    router.push("/contact");
  };

  // Get pie chart percentages from API response
  const principalPercentage = emiData?.emiBreakdown?.principalPercentage || 80.5;
  const interestPercentage = emiData?.emiBreakdown?.interestPercentage || 19.5;

  return (
    <section className="w-full bg-[#383331] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-white p-6 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
          <div className="grid gap-8 md:grid-cols-2">
            {/* ================= LEFT SIDE ================= */}
            <div className="flex flex-col gap-8">
              {/* Circular Chart and EMI Result */}
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Circular Pie Chart */}
                <div className="relative flex-shrink-0 h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(#38BA50 0% ${principalPercentage}%, #FFA322 ${principalPercentage}% 100%)`,
                    }}>
                  </div>
                  <div className="absolute inset-[12%] flex flex-col items-center justify-center rounded-full bg-white text-center shadow-sm">
                    <p className="text-base sm:text-lg md:text-xl font-bold text-black leading-tight px-2">
                      {emiData?.monthlyEMI?.formatted || "₹ 7,47,873.00"}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 px-2">Your Monthly EMI</p>
                  </div>
                </div>

                {/* EMI Result Breakdown */}
                <div className="flex-1 w-full md:w-auto">
                  <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-black">
                    Calculated EMI Result
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-4 sm:gap-6">
                      <p className="flex items-center gap-2 font-medium text-[#38BA50]">
                        <span>●</span> Principal Amount
                      </p>
                      <span className="font-semibold text-black text-sm sm:text-base">
                        {emiData?.principalAmount?.formatted || "₹ 3,61,11,931.00"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:gap-6">
                      <p className="flex items-center gap-2 font-medium text-[#FFA322]">
                        <span>●</span> Total Interest
                      </p>
                      <span className="font-semibold text-black text-sm sm:text-base">
                        + {emiData?.totalInterest?.formatted || "₹ 87,60,442.00"}
                      </span>
                    </div>
                  </div>
                  <div className="my-3 sm:my-4 h-px w-full bg-gray-200" />
                  <div className="flex items-center justify-between gap-4 sm:gap-6">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-base sm:text-lg font-semibold text-black">
                      {emiData?.totalAmountPayable?.formatted || "₹ 4,48,72,373.00"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Partner Logos Section */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-12 sm:gap-20">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-50 transition-colors">
                    <IoChevronBack className="h-5 w-5" />
                  </button>
                  <p className="text-base sm:text-lg font-semibold text-black">9.5%</p>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-50 transition-colors">
                    <IoChevronForward className="h-5 w-5" />
                  </button>
                </div>

                {/* Partner Logos */}
                <div className="relative flex items-center gap-3 flex-wrap justify-center pb-1">
                  {partnerLogos.slice(0, 4).map((partner, idx) => (
                    <div
                      key={idx}
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 ${idx === 0
                        ? "bg-blue-50 border-blue-300 text-blue-600"
                        : "bg-gray-100 border-gray-200 text-gray-600"
                        } text-xs font-semibold`}>
                      {partner.logo}
                      {/* Indicator dot below first logo */}
                      {idx === 0 && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="space-y-6 sm:space-y-8">
              {/* Loan Amount Slider */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6 mb-2">
                  <h4 className="font-semibold text-black text-sm sm:text-base">
                    Loan Amount
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-black bg-gray-100 px-3 py-1 rounded">
                      {formatLoanAmount(loanAmount)} {currency}
                    </span>
                  </div>
                </div>

                <div className="relative mt-2">
                  <input
                    type="range"
                    min={loanAmountRange.min}
                    max={loanAmountRange.max}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #FF765E 0%, #FF765E ${loanAmountPercent}%, #E5E7EB ${loanAmountPercent}%, #E5E7EB 100%)`,
                    }}
                  />
                  <style jsx>{`
                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #374151;
                      cursor: pointer;
                      border: 3px solid white;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    }
                    .slider::-moz-range-thumb {
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #374151;
                      cursor: pointer;
                      border: 3px solid white;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    }
                  `}</style>
                </div>

                <div className="mt-1 sm:mt-2 flex justify-between text-xs sm:text-sm text-gray-500">
                  <span>₹ 30L</span>
                  <span>₹ 1Cr</span>
                  <span>₹ 10Cr</span>
                  <span>₹ 20Cr</span>
                  <span>₹ 30Cr</span>
                  <span>₹ 50Cr</span>
                </div>
              </div>

              {/* Rate of Interest Slider */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6 mb-2">
                  <h4 className="font-semibold text-black text-sm sm:text-base">
                    Rate of Interest <span className="text-[10px]">(%P.A)</span>
                  </h4>
                  <button className="bg-[#FF765E] text-white font-semibold px-3 py-1 rounded text-sm sm:text-base">
                    {rateOfInterest.toFixed(1)} %
                  </button>
                </div>

                <div className="relative mt-2">
                  <input
                    type="range"
                    min={rateRange.min}
                    max={rateRange.max}
                    step={0.1}
                    value={rateOfInterest}
                    onChange={(e) => setRateOfInterest(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #FF765E 0%, #FF765E ${ratePercent}%, #E5E7EB ${ratePercent}%, #E5E7EB 100%)`,
                    }}
                  />
                </div>

                <div className="mt-1 sm:mt-2 flex justify-between text-xs sm:text-sm text-gray-500">
                  <span>7%</span>
                  <span>8%</span>
                  <span>9%</span>
                  <span>10%</span>
                  <span>11%</span>
                </div>
              </div>

              {/* Loan Tenure Slider */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6 mb-2">
                  <h4 className="font-semibold text-black text-sm sm:text-base">Loan Tenure</h4>
                  <button className="bg-[#FF765E] text-white font-semibold px-3 py-1 rounded text-sm sm:text-base">
                    {loanTenure} Months
                  </button>
                </div>

                <div className="relative mt-2">
                  <input
                    type="range"
                    min={tenureRange.min}
                    max={tenureRange.max}
                    step={6}
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #FF765E 0%, #FF765E ${tenurePercent}%, #E5E7EB ${tenurePercent}%, #E5E7EB 100%)`,
                    }}
                  />
                </div>

                <div className="mt-1 sm:mt-2 flex justify-between text-xs sm:text-sm text-gray-500">
                  <span>12m</span>
                  <span>24m</span>
                  <span>36m</span>
                  <span>48m</span>
                  <span>60m</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <HiLightBulb className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p>
                  {emiData?.disclaimer || "Calculated EMI result is indicative only."}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleReset}
                  className="rounded-full border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 w-full sm:w-auto hover:bg-gray-50 transition-colors">
                  Reset
                </button>
                <button
                  onClick={handleGetLoan}
                  disabled={isCalculating || calculating}
                  className="rounded-full bg-[#FF765E] px-6 py-3 text-sm font-semibold text-white w-full sm:w-auto hover:bg-[#e86b50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Get a Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
