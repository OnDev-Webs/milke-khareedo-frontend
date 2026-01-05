"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/api/hooks/useApi";
import { userDashboardService } from "@/lib/api/services/userDashboard.service";
import type { UserProfileApi, UpdateProfilePayload } from "@/lib/api/services/userDashboard.service";

export default function ProfilePage() {
  const [form, setForm] = useState<UpdateProfilePayload>({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const { data, loading } = useApi<UserProfileApi>(() =>
    userDashboardService.getUserProfile()
  );

  /* ================= HYDRATE FROM BACKEND ================= */
  useEffect(() => {
    if (!data) return;

    setForm({
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      address: data.address ?? "",
      pincode: data.pincode ?? "",
      city: data.city ?? "",
      state: data.state ?? "",
      country: data.country ?? "",
    });
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await userDashboardService.updateUserProfile(form);
  };

  if (loading) return null;

  return (
    <div className="rounded-[24px] bg-white px-5 py-8 sm:px-10 sm:py-10 shadow">
      <h2 className="mb-8 text-[22px] font-semibold">My Profile</h2>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <FieldInput
          label="First Name *"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />

        <FieldInput
          label="Last Name *"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />

        {/* READ ONLY */}
        <FieldInput label="Email Address *" value={data?.email} disabled />
        <FieldInput label="Mobile Number *" value={data?.phone} disabled />

        <FieldInput
          label="Full Address *"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="md:col-span-2"
        />

        <FieldInput
          label="Pin code *"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <FieldSelect
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />

        <FieldSelect
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
        />

        <FieldSelect
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
        />
      </div>

      <div className="mt-12">
        <button
          onClick={handleSave}
          className="rounded-full bg-[#1C4692] px-12 py-4 text-sm font-semibold text-white"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function FieldInput({
  label,
  name,
  value,
  onChange,
  disabled = false,
  className = "",
}: {
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-4 top-[-9px] bg-white px-2 text-xs text-gray-400">
        {label}
      </span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-14 w-full rounded-[10px] border px-4 text-sm focus:border-[#1C4692] focus:outline-none disabled:bg-gray-100"
      />
    </div>
  );
}

function FieldSelect({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-[-9px] bg-white px-2 text-xs text-gray-400">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-14 w-full rounded-[10px] border px-4 text-sm focus:border-[#1C4692] focus:outline-none"
      >
        <option value="">Select {label}</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Telangana">Telangana</option>
        <option value="India">India</option>
      </select>
    </div>
  );
}
