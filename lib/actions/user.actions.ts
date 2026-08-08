import {
  AdminUserInputType,
  AdminUserSchema,
  ProfileInputType,
  ProfileSchema,
  SocialProfileCreateInput,
  SocialProfileCreateSchema,
  SocialProfileUpdateInput,
  SocialProfileUpdateSchema,
  UserUpdateInputType,
  UserUpdateSchema,
} from "@/schemas/user.schema";
import { handleApiError } from "@/utils/handle-api-error";
import axiosInstance from "../axios/axios";
import { ApiResponse } from "@/types/response";
import { MeResponse, UserWithProfile } from "@/types/user";
import { errorResponse } from "@/utils/api-response";
import { handleZodError } from "@/utils/handle-zod-errors";
import { Profile } from "@/types/profile";
import { SocialProfile } from "@/types/social-profile";

// user itself
export async function getMe(): Promise<
  ApiResponse<{ user: MeResponse } | null>
> {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateMe({
  payload,
}: {
  payload: UserUpdateInputType;
}): Promise<ApiResponse<{ user: UserWithProfile } | null>> {
  try {
    const parsed = UserUpdateSchema.safeParse(payload);
    if (parsed.error) {
      return errorResponse(handleZodError(parsed.error) || "Invalid Input");
    }
    const response = await axiosInstance.patch("/users/me", parsed.data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteMe(): Promise<ApiResponse<null>> {
  try {
    const response = await axiosInstance.delete("/users/me");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

//user with profile create or update
export async function createOrUpdateProfile({
  payload,
}: {
  payload: ProfileInputType;
}): Promise<ApiResponse<{ profile: Profile } | null>> {
  try {
    const parsed = ProfileSchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid Input");
    }

    const response = await axiosInstance.post("/profiles", parsed.data);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// user with social profile
export async function createSocialProfile({
  payload,
}: {
  payload: SocialProfileCreateInput;
}): Promise<ApiResponse<{ socialProfile: SocialProfile } | null>> {
  try {
    const parsed = SocialProfileCreateSchema.safeParse(payload);
    if (parsed.error) {
      return errorResponse(handleZodError(parsed.error) || "Invalid Input");
    }
    const response = await axiosInstance.post("/social-profiles", parsed.data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateSocialProfile({
  id,
  payload,
}: {
  id: string;
  payload: SocialProfileUpdateInput;
}): Promise<ApiResponse<{ socialProfile: SocialProfile } | null>> {
  try {
    const parsed = SocialProfileUpdateSchema.safeParse(payload);
    if (parsed.error) {
      return errorResponse(handleZodError(parsed.error) || "Invalid Input");
    }
    const response = await axiosInstance.patch(
      `/social-profiles/${id}`,
      parsed.data,
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteSocialProfile({
  id,
}: {
  id: string;
}): Promise<ApiResponse<null>> {
  try {
    const response = await axiosInstance.delete(`/social-profiles/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getUserById({
  id,
}: {
  id: string;
}): Promise<ApiResponse<{ user: UserWithProfile } | null>> {
  try {
    if (!id) {
      return errorResponse("User ID is required");
    }
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
export async function updateUserById({
  id,
  payload,
}: {
  id: string;
  payload: AdminUserInputType;
}): Promise<ApiResponse<{ user: UserWithProfile } | null>> {
  try {
    if (!id) {
      return errorResponse("User ID is required");
    }
    const parsed = AdminUserSchema.safeParse(payload);
    if (parsed.error) {
      return errorResponse(handleZodError(parsed.error) || "Invalid Input");
    }
    const response = await axiosInstance.patch(`/users/${id}`, parsed.data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getAllUsers(): Promise<
  ApiResponse<{ users: UserWithProfile[] } | null>
> {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteUserById({
  id,
}: {
  id: string;
}): Promise<ApiResponse<null>> {
  try {
    if (!id) {
      return errorResponse("User ID is required");
    }
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
