import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  from: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  text: yup
    .string()
    .required("Message is required")
    .min(5, "Message must be at least 5 characters"),
});
