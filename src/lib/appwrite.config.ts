import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
  NEXT_PUBLIC_MEDIMANAGE_API_KEY: MEDIMANAGE_API_KEY,
  NEXT_PUBLIC_MEDIMANAGE_DATABASE_ID: MEDIMANAGE_DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID: PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_DOCTOR_COLLECTION_ID: DOCTOR_COLLECTION_ID,
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID: APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_MEDIMANAGE_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

console.log("end", process.env);

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("669bccc000078266065f")
  .setKey(
    "934f8ad9761a95488a3cb2096fc35e6d838e4a7f9b51b01ec108a39f36e93036c60d62e16e2eb4885fa03e49dd2a692a30221d9a0409ac969d2da70a726ef7127d662858245c61e9774b4cd4e922fd8c3e7103a3b14c679a21b8f3509d279e11ef54c1bbafc54a97e06b3a4b61c4c8609d0ef67f2158fdfb4cc68bb26c11ca26"
  );

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
