"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactFormSchema } from "@/schema/contact-form.schema";
import { FloatingField } from "@/components/FloatingField";

type ContactFormValues = {
  fullName: string;
  phone: string;
  email: string;
  description?: string;
};

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      description: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3.5"
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FloatingField label="Full Name" required labelWidth="w-16">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter here"
                    className="border-none p-0 text-base font-medium focus-visible:ring-0"
                  />
                </FormControl>
              </FloatingField>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FloatingField label="Phone Number" required labelWidth="w-24">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="+91 000 000 0000"
                    className="border-none p-0 text-base focus-visible:ring-0"
                  />
                </FormControl>
              </FloatingField>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FloatingField label="Email ID" required labelWidth="w-[61px]">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter here"
                    className="border-none p-0 text-base focus-visible:ring-0"
                  />
                </FormControl>
              </FloatingField>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="h-28">
              <FloatingField label="Description" labelWidth="w-20">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write here"
                    className="border-none p-0 resize-none h-20 focus-visible:ring-0"
                  />
                </FormControl>
              </FloatingField>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
