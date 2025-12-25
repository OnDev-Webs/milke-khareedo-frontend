import React from "react";

type FloatingFieldProps = {
  label: string;
  required?: boolean;
  labelWidth?: string;
  children: React.ReactNode;
};

export function FloatingField({
  label,
  required,
  labelWidth = "w-20",
  children,
}: FloatingFieldProps) {
  return (
    <div className="relative px-4 rounded-md outline -outline-offset-1 outline-black flex flex-col gap-3">
      {/* Floating label */}
      <div className="absolute left-0 -top-2.5">
        <div className={`${labelWidth} h-5 bg-white rounded-lg -ml-1`} />
        <div className="flex items-center gap-0.5 px-1">
          <span className="text-xs text-black opacity-80">{label}</span>
          {required && (
            <span className="text-xs text-red-600 font-semibold">*</span>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
