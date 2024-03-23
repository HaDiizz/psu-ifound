import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
      required_error: "Latitude is required.",
      invalid_type_error: "Latitude must be a number",
    })
    .nonnegative("Latitude must be positive number"),
  lng: z
    .number({
      required_error: "Longitude is required.",
      invalid_type_error: "Longitude must be a number",
    })
    .nonnegative("Longitude must be positive number"),
  image: z
    .any()
    .refine((file) => {
      return file?.length == 1;
    }, "Image is required.")
    .refine((file) => {
      return file?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const FormLostItemSchema = z.object({
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
    .max(100, { message: "Maximum length is 100 characters." }),
  subLocation: z
    .string()
    .max(100, { message: "Maximum length is 100 characters." }),
  contact: z
    .string()
    .nonempty("Contact is required.")
    .max(50, { message: "Maximum length is 50 characters." }),
  image: z
    .any()
    .refine((file) => {
      return file?.length == 1;
    }, "Image is required.")
    .refine((file) => {
      return file?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const EditFormLostItemSchema = z.object({
  status: z.string().nonempty("Status is required."),
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
    .max(100, { message: "Maximum length is 100 characters." }),
  subLocation: z
    .string()
    .max(100, { message: "Maximum length is 100 characters." }),
  contact: z
    .string()
    .nonempty("Contact is required.")
    .max(50, { message: "Maximum length is 50 characters." }),
});
