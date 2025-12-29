"use client";

import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { authService } from "@/lib/api/services/auth.service";
import { useAuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import CountryCodeSelector from "./CountryCodeSelector";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type AuthStep = "phone" | "otp";

const features = [
  {
    icon: "/images/home.png",
    text: "Buy together. Save more money",
  },
  {
    icon: "/images/home1.png",
    text: "Direct access to verified projects",
  },
  {
    icon: "/images/home2.png",
    text: "Better pricing through group demand",
  },
  {
    icon: "/images/home3.png",
    text: "Dedicated relationship manager to guide you",
  },
];

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const { login } = useAuthContext();
  const [step, setStep] = useState<AuthStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Format phone number for display
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 10)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
  };

  // Handle phone number input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError(null);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only numbers

    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join("").slice(0, 6));
    setError(null);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .replace(/\D/g, "");
    if (pastedData.length > 0) {
      setOtp(pastedData);
      // Focus last input
      const lastIndex = Math.min(pastedData.length - 1, 5);
      otpInputRefs.current[lastIndex]?.focus();
    }
  };

  // Handle backspace in OTP
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Send OTP (Login/Register)
  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authService.loginOrRegister({
        phoneNumber,
        countryCode,
      });

      if (response.success) {
        setStep("otp");
        setResendTimer(60); // Start 60 second timer
      } else {
        setError(response.message || response.error || "Failed to send OTP");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authService.verifyOTP({
        phoneNumber,
        countryCode,
        otp,
      });

      if (response.success && response.data) {
        // Store token and user data
        login(response.data.token, response.data.user);
        onSuccess?.();
        handleClose();
      } else {
        setError(response.message || response.error || "Invalid OTP");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setError(null);

    try {
      const response = await authService.resendOTP({
        phoneNumber,
        countryCode,
        type: "login",
      });

      if (response.success) {
        setResendTimer(60); // Reset timer
        setOtp(""); // Clear OTP
        otpInputRefs.current[0]?.focus();
      } else {
        setError(response.message || response.error || "Failed to resend OTP");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Reset state when modal closes
  const handleClose = () => {
    setStep("phone");
    setPhoneNumber("");
    setOtp("");
    setError(null);
    setResendTimer(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className="relative w-full max-w-md md:max-w-3xl rounded-2xl bg-[#1a1a1a] shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#1C4692] text-white hover:bg-[#1c4692e6] transition-colors"
            aria-label="Close"
          >
            <IoClose className="h-6 w-6" />
          </button>

          <div className="flex flex-col md:grid md:grid-cols-2">
            {/* Left Side - Auth Form */}
            <div className="flex flex-col justify-center p-8 md:p-6 bg-[#303A44] my-4 ms-4 rounded-lg">
              {/* Logo */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1C4692]">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12h18M3 6h18M3 18h18"
                    />
                  </svg>
                </div>
                <div className="text-white">
                  <div className="text-lg font-bold">MILKE</div>
                  <div className="text-lg font-bold">KHEREEDO</div>
                </div>
              </div>

              {step === "phone" ? (
                <>
                  {/* Phone Number Screen */}
                  <h2 className="mb-2 text-[25px] font-bold text-white">
                    Welcome
                  </h2>
                  <p className="mb-6 text-white text-[14px]">
                    Enter your mobile number to get started
                  </p>

                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-1">
                      <CountryCodeSelector
                        value={countryCode}
                        onChange={setCountryCode}
                      />
                      <input
                        type="text"
                        value={formatPhoneNumber(phoneNumber)}
                        onChange={handlePhoneChange}
                        placeholder="000 000 0000"
                        className="flex-1 rounded-lg border border-gray-600 bg-[#2a2a2a] px-3 py-3 text-white placeholder-gray-500 focus:border-[#1C4692] focus:outline-none"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 text-sm text-red-500">{error}</div>
                  )}

                  <button
                    onClick={handleSendOTP}
                    disabled={loading || phoneNumber.length !== 10}
                    className="w-full rounded-full bg-[#1C4692] px-6 py-3 text-[12px] font-semibold text-white hover:bg-[#1c4692e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "CONTINUE"}
                  </button>

                  <p className="mt-6 text-[12px] text-[white] text-center mx-4">
                    By continuing, you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-[white] font-bold hover:underline"
                    >
                      Terms & Conditions
                    </a>
                  </p>
                </>
              ) : (
                <>
                  {/* OTP Screen */}
                  <h2 className="mb-2 text-[25px] font-bold text-white">
                    Enter OTP
                  </h2>
                  <p className="mb-4 text-white text-[14px]">
                    We&apos;ve sent a verification code to {countryCode}{" "}
                    {formatPhoneNumber(phoneNumber)}
                  </p>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Verification Code <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpInputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={otp[index] || ""}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onPaste={handleOtpPaste}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="h-12 w-12 rounded-lg border border-gray-600 bg-[#2a2a2a] text-center text-xl font-bold text-white focus:border-[#1C4692] focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 text-sm text-red-500">{error}</div>
                  )}

                  <button
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.length !== 6}
                    className="w-full rounded-lg bg-[#1C4692] px-6 py-3 text-[12px] font-semibold text-white hover:bg-[#1c4692e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Verifying..." : "VERIFY OTP"}
                  </button>

                  <div className="mt-6 text-center text-sm text-[#FFFFFF]">
                    Didn&apos;t receive the code?{" "}
                    {resendTimer > 0 ? (
                      <span className="text-[#747474]">
                        Resend in {resendTimer}s
                      </span>
                    ) : (
                      <button
                        onClick={handleResendOTP}
                        disabled={loading}
                        className="text-[#1C4692] hover:underline disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Right Side - Features */}
            <div className="flex flex-col justify-center p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/auth.jpg"
                  alt="Background"
                  fill
                  className="h-full w-full object-cover opacity-20"
                />
              </div>

              <div className="relative z-10">
                <h3 className="mb-8 text-[24px] font-semibold text-white">
                  How are we different{" "}
                  <span className="inline-block h-3 w-3 bg-[#1C4692]"></span>
                </h3>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                        <Image
                          src={feature.icon}
                          alt="feature icon"
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      </div>

                      <p className="text-white text-[16px]">{feature.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
