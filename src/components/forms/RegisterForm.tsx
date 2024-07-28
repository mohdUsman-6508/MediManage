"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import patientSignupFormSchema from "@/schemas/patientSignupFormSchema";

import CustomFormField from "../CustomFormField";
import CustomSubmitButton from "../CustomSubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./Patient";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  genderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";

import Image from "next/image";
import FileUploader from "../FileUploader";
import { PatientFormValidation } from "@/schemas/validationSchemas";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      fullname: user ? user.fullname : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof PatientFormValidation>> = async (
    data
  ) => {
    setIsLoading(true);
    // let formData;

    // if (
    //   data.identificationDocument &&
    //   data.identificationDocument?.length > 0
    // ) {
    //   const blobFile = new Blob([data.identificationDocument[0]], {
    //     type: data.identificationDocument[0].type,
    //   });

    //   formData = new FormData();
    //   formData.append("blobFile", blobFile);
    //   formData.append("fileName", data.identificationDocument[0].name);
    // }

    try {
      const patientData = {
        ...data,
        userId: user.$id,
        birthDate: new Date(data.birthDate),
        // identificationDocument: formData,
      };
      // @ts-ignore
      const newPatient = await registerPatient(patientData);
      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <section className=" mb-12 space-y-4">
        <h1 className="header">Complete Your Profile</h1>
        <p className="text-dark-700">
          Help Us Personalize Your Healthcare Experience
        </p>
      </section>

      <section className="space-y-6">
        <div className="mb-9 space-y-1"></div>
        <h2 className="sub-header">Personal Information</h2>
      </section>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="fullname"
          label="Fullname"
          placeholder="Ajay Kumar"
          iconSrc="/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {genderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="H.no.312, New Delhi, 110011"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="Electronics Engineer"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Gaurdian's name"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Phone number"
            placeholder="+919922334411"
            iconSrc="/icons/phone.svg"
            iconAlt="phone"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1"></div>
          <h2 className="sub-header">Medical Information</h2>
        </section>

        <FormField
          control={form.control}
          name="primaryPhysician"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark-600">
                Primary care physician
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full p-4">
                    <SelectValue placeholder="Select primary physician" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-300">
                    {Doctors.map((doctor, i) => (
                      <SelectItem key={i} value={doctor.name}>
                        <div className="flex items-center justify-center gap-3">
                          <Image
                            src={doctor.image}
                            height={32}
                            width={32}
                            alt={doctor.name}
                          />
                          <p>{doctor.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="LIC"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="HA0321123"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies(if any)"
            placeholder="Milk, Nuts"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current medication"
            placeholder="Paracetamol 300mg, Calpol 100mg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family medical history(if relevent)"
            placeholder="Mother had asthama"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past medical history"
            placeholder="Maleria in childhood"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1"></div>
          <h2 className="sub-header">Identification and Verification</h2>
        </section>

        <FormField
          control={form.control}
          name="identificationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark-600">
                Identification Type
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full p-4">
                    <SelectValue placeholder="Select identification type" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-300">
                    {IdentificationTypes.map((type, i) => (
                      <SelectItem key={i} value={type}>
                        <p>{type}</p>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Identification Number"
          placeholder="9878 4874 8874"
        />

        {/* <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocumentID"
          label="Scanned Copy of Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        /> */}

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition."
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to the use and disclosure of my health
            information for treatment purposes."
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I acknowledge that I have reviewed and agree to the
            privacy policy"
        />

        <CustomSubmitButton isLoading={isLoading}>Register</CustomSubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
