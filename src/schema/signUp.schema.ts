import { z } from "zod";

export const signUpSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(64, { message: "Password cannot exceed 64 characters" }),
    username: z.string().min(1, { message: "Username is required" }),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    middle_name: z.string().optional(),
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>["body"];
