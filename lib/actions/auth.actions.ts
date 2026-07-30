import { SignupPayload, SignupSchema } from "@/schemas/auth.schema";
import { handleZodError } from "@/utils/handle-zod-errors";
import axiosInstance from "../axios";
import type { ApiResponse } from "@/types/response";
import type { User } from "@/types/user";
import { errorResponse } from "@/utils/api-response";
import { handleApiError } from "@/utils/handle-api-error";

export async function signup(
  payload: SignupPayload,
): Promise<ApiResponse<User | null>> {
  try {
    const parse = SignupSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input", 400);
    }

    const { name, email, password, confirmPassword, role } = parse.data;

    if (password !== confirmPassword) {
      return errorResponse("Passwords do not match", 400);
    }

    const response = await axiosInstance.post<ApiResponse<null>>("/signup", {
      name,
      email,
      password,
      confirmPassword,
      role,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
