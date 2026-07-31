import * as z from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(3, "name at least 3 characters")
      .max(255, "name should be 255 characters or less"),
    email: z
      .email("invalid email address")
      .max(255, "email address should be 255 characters or less"),
    password: z
      .string()
      .min(8, "password at least 8 characters")
      .max(32, "password should be 32 characters or less"),
    confirmPassword: z.string(),
    role: z.enum(["TENANT", "LANDLORD"], "role should be 'TENANT', 'LANDLORD'"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    error: "passwords are doesn't match",
  });

export const SigninSchema = z.object({
  email: z
    .email("invalid email address")
    .max(255, "email address should be 255 characters or less"),
  password: z
    .string()
    .min(8, "password at least 8 characters")
    .max(32, "password should be 32 characters or less"),
});

export const VerifyEmailSchema = z.object({
  email: z.email(),
  token: z.string(),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be 30 characters or less"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupPayload = z.input<typeof SignupSchema>;
export type SigninPayload = z.input<typeof SigninSchema>;
export type VerifyEmailPayload = z.input<typeof VerifyEmailSchema>;
export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;
