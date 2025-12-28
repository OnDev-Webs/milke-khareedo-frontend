"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/schema/contact-form.schema";
import { type z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      description: "",
    },
  });

  function handleFormSubmit(values: ContactFormValues) {
    console.log("values", values);
  }

  return (
    <Form {...form}>
      <form
        className={className ?? "space-y-4"}
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 text-black text-[13px]">
                  First name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 text-black text-[13px]">
                  Last name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 text-black text-[13px]">
                  Phone <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="000 000 0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 text-black text-[13px]">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full relative">
              <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 text-black text-[13px]">
                Note <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Enter here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-[#1C4692] hover:bg-[#1c4692e6] text-white font-semibold text-lg"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}
