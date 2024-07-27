"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  databases,
  MEDIMANAGE_DATABASE_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  console.log("appointmentdata", appointmentData);
  try {
    const newPatient = await databases.createDocument(
      "669bcfe6001223f07551",
      "669bd0f4002d97ce8c12",
      ID.unique(),
      {
        ...appointmentData,
      }
    );

    console.log("user created :", newPatient);
    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      MEDIMANAGE_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {}
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      MEDIMANAGE_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.documents.reduce((acc, appointment) => {
      switch (appointment.status) {
        case "scheduled":
          acc.scheduledCount += 1;
          break;
        case "pending":
          acc.pendingCount += 1;
          break;
        case "cancelled":
          acc.cancelledCount += 1;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    console.log("DATA ::::::", data);

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      MEDIMANAGE_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updateAppointment) {
      throw new Error("Appointment not found!");
    }

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log("Error occured in updating appointment:", error);
  }
};
