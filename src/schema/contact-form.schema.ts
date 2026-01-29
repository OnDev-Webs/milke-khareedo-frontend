import * as z from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email"),
  description: z.string().optional(),
});
