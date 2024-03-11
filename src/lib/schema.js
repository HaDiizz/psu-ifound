import { z } from "zod";

export const FormFoundItemSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required.")
    .max(100, { message: "Maximum length is 100 characters." }),
  detail: z
    .string()
    .nonempty("Detail is required.")
    .max(150, { message: "Maximum length is 150 characters." }),
  location: z
    .string()
    .nonempty("Location is required.")
    .max(100, { message: "Maximum length is 100 characters." }),
  subLocation: z
    .string()
    .max(100, { message: "Maximum length is 100 characters." }),
  contact: z
    .string()
    .nonempty("Contact is required.")
    .max(50, { message: "Maximum length is 50 characters." }),
  lat: z
    .number({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be a number",
    })
    .nonnegative("Latitude must be positive number"),
  lng: z
    .number({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be a number",
    })
    .nonnegative("Longitude must be positive number"),
});
