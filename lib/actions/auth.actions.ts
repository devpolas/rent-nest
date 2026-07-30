import { SignupPayload, SignupSchema } from "@/schemas/auth.schema";
import { handleZodError } from "@/utils/handle-zod-errors";
import axiosInstance from "../axios";
import type { ApiResponse } from "@/types/response";
import type { User } from "@/types/user";
import axios from "axios";

export async function signup(
  payload: SignupPayload,
): Promise<ApiResponse<User | null>> {
  try {
    const parse = SignupSchema.safeParse(payload);

    if (!parse.success) {
      return {
        success: false,
        message: handleZodError(parse.error) || "Invalid input",
        statusCode: 400,
      };
    }

    const { name, email, password, confirmPassword, role } = parse.data;

    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
        statusCode: 400,
      };
    }

    const response = await axiosInstance.post<ApiResponse<User>>("/signup", {
      name,
      email,
      password,
      confirmPassword,
      role,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiResponse<null>>(error)) {
      return (
        error.response?.data ?? {
          success: false,
          message: "Something went wrong",
          statusCode: 500,
        }
      );
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      statusCode: 500,
    };
  }
}
