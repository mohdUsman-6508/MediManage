import { z } from "zod";

const phoneNumberRegex =
  /^\+?(\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const FormData = z.object({
  fullname: z
    .string()
    .min(2, "Name must be atleast 2 characters.")
    .max(32, "Name must be atmost 32 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().regex(phoneNumberRegex, {
    message: "Invalid phone number format",
  }),
});

export default FormData;
