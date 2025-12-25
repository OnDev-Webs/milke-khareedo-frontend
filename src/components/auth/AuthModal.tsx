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

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
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
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
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
    const pastedData = e.clipboardData.getData("text").slice(0, 6).replace(/\D/g, "");
    if (pastedData.length > 0) {
      setOtp(pastedData);
      // Focus last input
      const lastIndex = Math.min(pastedData.length - 1, 5);
      otpInputRefs.current[lastIndex]?.focus();
    }
  };

  // Handle backspace in OTP
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-6xl rounded-2xl bg-[#1a1a1a] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            aria-label="Close"
          >
            <IoClose className="h-6 w-6" />
          </button>

          <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Left Side - Auth Form */}
            <div className="flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
              {/* Logo */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f15a29]">
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
                  <h2 className="mb-2 text-4xl font-bold text-white">Welcome</h2>
                  <p className="mb-8 text-gray-400">
                    Enter your mobile number to get started
                  </p>

                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <CountryCodeSelector
                        value={countryCode}
                        onChange={setCountryCode}
                      />
                      <input
                        type="text"
                        value={formatPhoneNumber(phoneNumber)}
                        onChange={handlePhoneChange}
                        placeholder="000 000 0000"
                        className="flex-1 rounded-lg border border-gray-600 bg-[#2a2a2a] px-4 py-3 text-white placeholder-gray-500 focus:border-[#f15a29] focus:outline-none"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 text-sm text-red-500">{error}</div>
                  )}

                  <button
                    onClick={handleSendOTP}
                    disabled={loading || phoneNumber.length !== 10}
                    className="w-full rounded-lg bg-[#f15a29] px-6 py-3 text-lg font-bold text-white hover:bg-[#e14f20] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "CONTINUE"}
                  </button>

                  <p className="mt-6 text-xs text-gray-400">
                    By continuing, you agree to our{" "}
                    <a href="/terms" className="text-[#f15a29] hover:underline">
                      Terms & Conditions
                    </a>
                  </p>
                </>
              ) : (
                <>
                  {/* OTP Screen */}
                  <h2 className="mb-2 text-4xl font-bold text-white">Enter OTP</h2>
                  <p className="mb-8 text-gray-400">
                    We&apos;ve sent a verification code to {countryCode} {formatPhoneNumber(phoneNumber)}
                  </p>

                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Verification Code <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={otp[index] || ""}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onPaste={handleOtpPaste}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="h-14 w-14 rounded-lg border border-gray-600 bg-[#2a2a2a] text-center text-xl font-bold text-white focus:border-[#f15a29] focus:outline-none"
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
                    className="w-full rounded-lg bg-[#f15a29] px-6 py-3 text-lg font-bold text-white hover:bg-[#e14f20] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Verifying..." : "VERIFY OTP"}
                  </button>

                  <div className="mt-6 text-center text-sm text-gray-400">
                    Didn&apos;t receive the code?{" "}
                    {resendTimer > 0 ? (
                      <span className="text-[#f15a29]">Resend in {resendTimer}s</span>
                    ) : (
                      <button
                        onClick={handleResendOTP}
                        disabled={loading}
                        className="text-[#f15a29] hover:underline disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Right Side - Features */}
            <div className="hidden md:flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-[#1a1a1a] to-[#252525] relative overflow-hidden">
              {/* Background Image Placeholder - You can add actual image here */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full bg-gradient-to-br from-[#f15a29]/20 to-transparent" />
              </div>

              <div className="relative z-10">
                <h3 className="mb-8 text-3xl font-bold text-white">
                  How are we different{" "}
                  <span className="inline-block h-3 w-3 bg-[#f15a29]"></span>
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      ),
                      text: "Buy together. Save more money",
                    },
                    {
                      icon: (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      text: "Direct access to verified projects",
                    },
                    {
                      icon: (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ),
                      text: "Better pricing through group demand",
                    },
                    {
                      icon: (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      ),
                      text: "Dedicated relationship manager to guide you",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f15a29]/20 text-white">
                        {feature.icon}
                      </div>
                      <p className="text-white">{feature.text}</p>
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

