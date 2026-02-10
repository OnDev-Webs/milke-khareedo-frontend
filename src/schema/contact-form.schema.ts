// import * as z from "zod";

// export const contactFormSchema = z.object({
//   firstName: z.string().min(2, "First name is required"),
//   lastName: z.string().optional().or(z.literal("")),
//   phone: z.string().min(10, "Phone number is required"),
//   email: z.string().email("Invalid email"),
//   description: z.string().optional(),
// });


import * as z from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().optional().or(z.literal("")),

  phone: z
    .string()
    .transform((value) => value.replace(/\s+/g, "")) // remove spaces
    .refine(
      (value) => /^(\+91)?[6-9]\d{9}$/.test(value),
      "Phone number must be a valid 10-digit Indian number"
    ),

  email: z.string().email("Invalid email"),
  description: z.string().optional(),
});