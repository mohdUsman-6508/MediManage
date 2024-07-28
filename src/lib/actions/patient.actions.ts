"use server";

import { ID, Query } from "node-appwrite";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.fullname
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log("Error get user:", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      "669bcfe6001223f07551",
      "669bd03c00087086377d",
      [Query.equal("userId", userId)]
    );
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.log("Error get user:", error);
  }
};

export const registerPatient = async ({
  // identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // https://appwrite.io/docs/references/cloud/client-web/storage#createFile

    // if (identificationDocument) {
    // const inputFile = InputFile.fromBuffer(
    //   identificationDocument?.get("blobFile") as Blob,
    //   identificationDocument?.get("fileName") as string
    // );

    // file = await storage.createFile(
    //   "669bd182003127e603e2",
    //   ID.unique(),
    //   inputFile
    // );
    // }

    //  https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      "669bcfe6001223f07551",
      "669bd03c00087086377d",
      ID.unique(),
      {
        // identificationDocumentId: file?.$id ? file.$id : null,
        // identificationDocumentURL: file?.$id
        // ? `https://cloud.appwrite.io/v1/storage/buckets/669bd182003127e603e2/files/${file.$id}/view??project=669bccc000078266065f`
        // : null,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// src/lib/actions/patient.actions.ts

// export const registerPatient = async (patientData: RegisterUserParams) => {
//   console.log("registerPatine", patientData);

//   try {
//     const response = await fetch("/api/registerPatient", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(patientData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to register patient");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("An error occurred while creating a new patient:", error);
//     throw error;
//   }
// };
