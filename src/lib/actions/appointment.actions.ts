"use server";

import { ID } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  databases,
  MEDIMANAGE_DATABASE_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";

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
