import React from "react";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

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
          <RegisterForm user={user} />
          <div className="flex justify-between mt-20 text-14-regular">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 MediManage
            </p>
          </div>
        </div>
      </section>
      <Image
        src="/image/medicines.jpeg"
        alt="nurse-welcoming"
        width={560}
        height={560}
        className="side-img max-w-[25%] rounded-lg opacity-50"
      />
    </div>
  );
};

export default Register;
