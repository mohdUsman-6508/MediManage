"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Appointment, Patient } from "@/types/appwrite.types";
import { Doctors } from "@/constants";
import Image from "next/image";
import { AppointmentModal } from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.fullname}</p>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[110px">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => <p>{formatDateTime(row.original.schedule).dateTime}</p>,
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor!.image}
            width={100}
            height={100}
            alt={doctor!.name}
            className="size-8"
          />
          <p className="whitespace-nowrap">{doctor!.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={row.original.patient.$id}
            userId={row.original.userId}
            appointment={row.original}
          />
          <AppointmentModal
            type="cancel"
            patientId={row.original.patient.$id}
            userId={row.original.userId}
            appointment={row.original}
          />
        </div>
      );
    },
  },
];
