"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/api/hooks/useApi";
import { userDashboardService } from "@/lib/api/services/userDashboard.service";
import type { UserProfileApi, UpdateProfilePayload } from "@/lib/api/services/userDashboard.service";
import { getCities, getCountries, getStates } from "@/lib/location";

export default function ProfilePage() {

    const [form, setForm] = useState<UpdateProfilePayload>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        countryCode: "+91",
        address: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
    });

    const [countries] = useState(getCountries());
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    const { data, loading } = useApi<UserProfileApi>(() =>
        userDashboardService.getUserProfile()
    );

    useEffect(() => {
        if (!data) return;

        setForm({
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            email: data.email ?? "",
            phoneNumber: data.phoneNumber ?? "",
            countryCode: "+91",

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

        if(PhoneInput.length < 10){
            alert("Please enter a valid phone number");
        }
        await userDashboardService.updateUserProfile(form);
    };


    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryCode = e.target.value;

        setForm((prev) => ({
            ...prev,
            country: countryCode,
            state: "",
            city: "",
        }));

        setStates(getStates(countryCode));
        setCities([]);
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const stateCode = e.target.value;

        setForm((prev) => ({
            ...prev,
            state: stateCode,
            city: "",
        }));

        setCities(getCities(form.country, stateCode));
    };


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

                <FieldInput
                    label="Email Address *"
                    name="email"
                    value={form.email}
                    onChange={handleChange}

                />

                <PhoneInput
                    label="Mobile Number *"
                    countryCode={form.countryCode}
                    phoneNumber={form.phoneNumber}
                    onChange={(value) =>
                        setForm((prev) => ({ ...prev, phoneNumber: value }))
                    }
                />



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
                    onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "");
                        if (digitsOnly.length <= 6) {
                            setForm((prev) => ({ ...prev, pincode: digitsOnly }));
                        }
                    }}
                />




                <FieldSelect
                    label="Country"
                    name="country"
                    value={form.country}
                    onChange={handleCountryChange}
                >
                    {countries.map((c) => (
                        <option key={c.isoCode} value={c.isoCode}>
                            {c.name}
                        </option>
                    ))}
                </FieldSelect>


                <FieldSelect
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={handleStateChange}
                >
                    {states.map((s) => (
                        <option key={s.isoCode} value={s.isoCode}>
                            {s.name}
                        </option>
                    ))}
                </FieldSelect>


                <FieldSelect
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                >
                    {cities.map((c) => (
                        <option key={c.name} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </FieldSelect>

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

function PhoneInput({
    label,
    countryCode,
    phoneNumber,
    onChange,
}: {
    label: string;
    countryCode: string;
    phoneNumber: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="relative">
            <span className="absolute left-4 top-[-9px] bg-white px-2 text-xs text-gray-400">
                {label}
            </span>

            <div className="">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    {countryCode}
                </span>

                <input
                    value={phoneNumber}
                    onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "");
                        if (digitsOnly.length <= 10) {
                            onChange(digitsOnly);
                        }
                    }}
                    placeholder="Enter mobile number"
                    className="h-14 w-full rounded-[10px] border pl-16 pr-4 text-sm focus:border-[#1C4692] focus:outline-none"
                />
            </div>
        </div>
    );
}


function FieldSelect({
  label,
  name,
  value,
  onChange,
  children,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
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
        {children}
      </select>
    </div>
  );
}

