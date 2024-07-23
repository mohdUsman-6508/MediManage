// // pages/api/registerPatient.ts
// import * as sdk from "node-appwrite";
// import { NextApiRequest, NextApiResponse } from "next";
// import { ID } from "node-appwrite";
// import { InputFile } from "node-appwrite/file";
// const client = new sdk.Client();

// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("669bccc000078266065f")
//   .setKey(
//     "934f8ad9761a95488a3cb2096fc35e6d838e4a7f9b51b01ec108a39f36e93036c60d62e16e2eb4885fa03e49dd2a692a30221d9a0409ac969d2da70a726ef7127d662858245c61e9774b4cd4e922fd8c3e7103a3b14c679a21b8f3509d279e11ef54c1bbafc54a97e06b3a4b61c4c8609d0ef67f2158fdfb4cc68bb26c11ca26"
//   );

// const databases = new sdk.Databases(client);
// const storage = new sdk.Storage(client);

// export async function POST(request: NextApiRequest, response: NextApiResponse) {
//   try {
//     const { identificationDocument, ...patient } = await request.json();
//     let file;
//     if (identificationDocument) {
//       const buffer = Buffer.from(identificationDocument.blobFile, "base64");
//       const inputFile = InputFile.fromBuffer(
//         buffer,
//         identificationDocument.fileName
//       );

//       file = await storage.createFile(
//         "669bd182003127e603e2",
//         ID.unique(),
//         inputFile
//       );
//     }

//     const newPatient = await databases.createDocument(
//       "669bcfe6001223f07551",
//       "669bd03c00087086377d",
//       ID.unique(),
//       {
//         identificationDocumentId: file?.$id || null,
//         identificationDocumentURL: file
//           ? `https://cloud.appwrite.io/v1/storage/buckets/669bd182003127e603e2/files/${file.$id}/view?project=669bccc000078266065f`
//           : null,
//         ...patient,
//       }
//     );

//     response.status(201).json(newPatient);
//   } catch (error) {
//     console.error("An error occurred while creating a new patient:", error);
//     response.status(500).json({ error: "Failed to register patient" });
//   }
// }
