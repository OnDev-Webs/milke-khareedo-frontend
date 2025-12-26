"use client";

export default function ProfilePage() {
  return (
    <div className="rounded-[24px] bg-white px-5 py-8 sm:px-10 sm:py-10 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h2 className="mb-8 text-[20px] sm:text-[22px] font-semibold text-[#2b2b2b]">
        My Profile
      </h2>

      <form className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <FieldInput label="First Name *" placeholder="Enter first name" />
        <FieldInput label="Last Name *" placeholder="Enter last name" />

        <FieldInput label="Email Address *" value="johndeo123@gmail.com" />
        <FieldInput label="Mobile Number *" value="+91 956 264 5987" />

        <FieldInput
          label="Full Address *"
          placeholder="Enter your Full address"
          className="md:col-span-2"
        />

        <FieldInput label="Pin code *" placeholder="Enter your Pincode" />
        <FieldSelect label="City" placeholder="Select your city" />
        <FieldSelect label="State" placeholder="Select your state" />
        <FieldSelect label="Country" placeholder="Select your country" />
      </form>

      <div className="mt-12">
        <button
          type="submit"
          className="w-full sm:w-auto rounded-full bg-[#ff7a59] px-12 py-4 text-sm font-semibold text-white transition hover:bg-[#ff6844]"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

function FieldInput({
  label,
  placeholder,
  value,
  className = "",
}: {
  label: string;
  placeholder?: string;
  value?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-4 top-[-9px] z-10 bg-white px-2 text-xs text-[#9b9b9b]">
        {label}
      </span>

      <input
        defaultValue={value}
        placeholder={placeholder}
        className="
          h-14
          w-full
          rounded-[10px]
          border
          border-[#d0d0d0]
          px-4
          
          text-sm
          text-[#2b2b2b]
          placeholder:text-[#b5b5b5]
          focus:border-[#ff7a59]
          focus:outline-none
        "
      />
    </div>
  );
}

function FieldSelect({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-[-9px] z-10 bg-white px-2 text-xs text-[#9b9b9b]">
        {label}
      </span>

      <select
        className="
          h-14
          w-full
          appearance-none
          rounded-[10px]
          border
          border-[#d0d0d0]
          px-4
          text-sm
          text-[#9b9b9b]
          focus:border-[#ff7a59]
          focus:outline-none
        "
      >
        <option>{placeholder}</option>
      </select>

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9b9b9b]">
        ▾
      </span>
    </div>
  );
}
