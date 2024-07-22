export const genderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  fullname: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Aadhar Card",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Aadhar Card",
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Social Security Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/image/dr-green.png",
    name: "Amaan Khan",
  },
  {
    image: "/image/dr-cameron.png",
    name: "Laxmi Kumari",
  },

  {
    image: "/image/dr-peter.png",
    name: "Leonardo",
  },
  {
    image: "/image/dr-powell.png",
    name: "Fatima ",
  },
  {
    image: "/image/dr-remirez.png",
    name: "Max Sword",
  },
  {
    image: "/image/dr-lee.png",
    name: "Jesicca ",
  },
  {
    image: "/image/dr-cruz.png",
    name: "Alaya Paul",
  },
  {
    image: "/image/dr-sharma.png",
    name: "Hakeem",
  },
];

export const StatusIcon = {
  scheduled: "/icons/check.svg",
  pending: "/icons/pending.svg",
  cancelled: "/icons/cancelled.svg",
};
