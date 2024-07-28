/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import { useParams } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
const page = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_new_appointment", patient.fullname);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[888px] flex-1 flex-col py-10">
          <div className="flex item-center gap-3">
            <Image
              src="/image/logoheart.png"
              height={1000}
              width={1000}
              alt="mediManage logo"
              className="mb-12 h-10 w-fit"
            />
            <span className="text-white font-extrabold text-3xl">
              MediManage
            </span>
          </div>
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <div className="flex justify-between mt-20 text-14-regular">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 MediManage
            </p>
          </div>
        </div>
      </section>
      <Image
        src="/image/sa.jpeg"
        alt="nurse-welcoming"
        width={560}
        height={560}
        className="side-img max-w-[25%] rounded-lg opacity-50"
      />
    </div>
  );
};

export default page;
