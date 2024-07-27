/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";

const page = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <div className="flex item-center gap-3">
          <Link href="/">
            <Image
              src="/image/logoheart.png"
              height={100}
              width={100}
              alt="mediManage logo"
              className=" h-8 w-fit"
            />
          </Link>
          <span className="text-white font-extrabold text-2xl">MediManage</span>
        </div>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700 ">
            Efficiently Manage Your Schedule and Provide Excellent Care
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount}
            label="Scheduled appointments"
            icon="/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount}
            label="Pending appointments"
            icon="/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount}
            label="Cancelled appointments"
            icon="/icons/cancelled.svg"
          />
        </section>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={appointments.documents} />
        </div>
      </main>
    </div>
  );
};

export default page;
