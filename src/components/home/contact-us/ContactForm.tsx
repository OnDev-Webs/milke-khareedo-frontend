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
                <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 font-normal text-black text-[13px]">
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter here" {...field} className="h-12 border border-[#262626] placeholder:text-[#BABABA] placeholder:text-[16px]" />
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
                <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 font-normal text-black text-[13px]">
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter here" {...field} className="h-12 border border-[#262626] placeholder:text-[#BABABA] placeholder:text-[16px]" />
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
                <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 font-normal text-black text-[13px]">
                  Phone Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="+91 000 000 0000" {...field} className="h-12 border border-[#262626] placeholder:text-[#BABABA] placeholder:text-[16px]" />
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
                <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 font-normal text-black text-[13px]">
                  Email ID<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter Email" {...field} className="h-12 border border-[#262626] placeholder:text-[#BABABA] placeholder:text-[16px]" />
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
              <FormLabel className="absolute left-3 -top-2.5 bg-white px-1 font-normal text-black text-[13px]">
                Notes <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Enter here" {...field} className="h-24 border border-[#262626] placeholder:text-[#BABABA] placeholder:text-[16px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="w-full py-[10px] rounded-full bg-[#1C4692] text-white font-semibold text-[16px] mb-4"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}
