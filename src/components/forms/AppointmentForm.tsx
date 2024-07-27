"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import patientSignupFormSchema from "@/schemas/patientSignupFormSchema";
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
import CustomFormField from "../CustomFormField";
import CustomSubmitButton from "../CustomSubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { CreateAppointmentSchema } from "@/schemas/validationSchemas";
import { Doctors } from "@/constants";
import Image from "next/image";
import { FormFieldType } from "./Patient";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";

interface AppointmentParams {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}

const AppointmentForm = ({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: AppointmentParams) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  let btnText = "Create Appointment";
  switch (type) {
    case "schedule":
      btnText = "Schedule Appointment";
      break;
    case "cancel":
      btnText = "Cancel Appointment";
      break;
  }

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof CreateAppointmentSchema>) {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: data.primaryPhysician,
          schedule: new Date(data.schedule),
          note: data.note,
          status: status as Status,
          reason: data.reason,
        };
        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: data?.primaryPhysician,
            schedule: new Date(data?.schedule),
            status: status as Status,
            cancellationReason: data?.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" ">
      <Form {...form}>
        {type === "create" && (
          <section className=" mb-12 space-y-4">
            <h1 className="header"> Schedule Your Appointment</h1>
            <p className="text-dark-700">
              Take the Next Step Towards Better Health with MediManage
            </p>
          </section>
        )}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-10"
        >
          {type !== "cancel" && (
            <>
              <FormField
                control={form.control}
                name="primaryPhysician"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-600">Doctor</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                  fieldType={FormFieldType.TEXTAREA}
                  name="reason"
                  label="Reason for appointment"
                  placeholder="Monthly check-up"
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.TEXTAREA}
                  name="note"
                  label="Additional comment/notes"
                  placeholder="Prefer morning appointment, if possible"
                />
              </div>
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.DATE_PICKER}
                name="schedule"
                label="Expected appointment date"
                showTimeSelect
                dateFormat="MM/dd/yyyy - h:mm aa"
              />
            </>
          )}

          {type == "cancel" && (
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="cancellationReason"
              label="Reason for cancellation"
              placeholder="Enter reason for cancellation"
            />
          )}
          <CustomSubmitButton
            isLoading={isLoading}
            className={`${
              type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
            } w-full`}
          >
            {btnText}
          </CustomSubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
