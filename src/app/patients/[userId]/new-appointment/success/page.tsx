import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Sentry from "@sentry/nextjs";
import { getUser } from "@/lib/actions/patient.actions";

const page = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const user = await getUser(userId);
  Sentry.metrics.set("user_view_success", user.fullname);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href={"/"} className="flex item-center gap-3">
          <Image
            src="/image/logoheart.png"
            height={1000}
            width={1000}
            alt="mediManage logo"
            className="mb-12 h-10 w-fit"
          />
          <span className="text-white font-extrabold text-3xl">MediManage</span>
        </Link>

        <section className="flex flex-col item-center">
          <Image
            src={"/gifs/success.gif"}
            height={300}
            width={280}
            alt="success"
          />
        </section>

        <h2 className="header mb-6 max-w-[600px] text-center">
          Your <span className="text-green-500"> appointment request {""}</span>
          has been successfully submitted!
        </h2>
        <p className="text-dark-600">
          Thank you for choosing MediManage. We look forward to seeing you!
        </p>
        <section className="flex items-center justify-center gap-4">
          <p className="text-dark-700">Requested appointed details:</p>
          <div className="flex items-center gap-3 my-10">
            <Image
              src={doctor?.image!}
              width={25}
              height={25}
              alt={doctor?.name!}
            />
            <p className="whitespace-nowrap text-slate-100 ">
              Dr. {doctor?.name}
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="copyright">©️ 2024 MediManage</p>
      </div>
    </div>
  );
};

export default page;
