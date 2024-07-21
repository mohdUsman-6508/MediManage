"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import patientSignupFormSchema from "@/schemas/patientSignupFormSchema";
import { Form } from "@/components/ui/form";

import CustomFormField from "../CustomFormField";
import CustomSubmitButton from "../CustomSubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export const enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const Patient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof patientSignupFormSchema>>({
    resolver: zodResolver(patientSignupFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
    },
  });

  const router = useRouter();

  async function onSubmit({
    fullname,
    email,
    phone,
  }: z.infer<typeof patientSignupFormSchema>) {
    setIsLoading(true);
    try {
      const userData = { fullname, email, phone };
      console.log(userData);
      const user = await createUser(userData);
      console.log("user created:", user);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" ">
      <Form {...form}>
        <section className=" mb-12 space-y-4">
          <h1 className="header"> Welcome!</h1>
          <p className="text-dark-700">Join Us for a Healthier Tomorrow</p>
        </section>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-10"
        >
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="fullname"
            label="Fullname"
            placeholder="Ajay Kumar"
            iconSrc="/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="ajaykumar@gmail.com"
            iconSrc="/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label="Phone Number"
            placeholder="9927248977"
            iconSrc="/icons/phone.svg"
            iconAlt="phone"
          />

          <CustomSubmitButton isLoading={isLoading}>
            Get Started
          </CustomSubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default Patient;
