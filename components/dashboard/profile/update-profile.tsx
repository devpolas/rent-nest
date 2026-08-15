"use client";

import { useCreateOrUpdateProfile } from "@/hooks";
import { ProfileInputType } from "@/schemas/user.schema";
import { MeResponse } from "@/types/user";
import { toast } from "sonner";
import ProfileUpdateForm from "./from/profile-from";

const DEFAULT_VALUES: Partial<ProfileInputType> = {
  bio: "",
  birthdate: undefined,
};

export default function UpdateProfile({
  user,
  handleClose,
}: {
  user: MeResponse;
  handleClose: () => void;
}) {
  const { mutateAsync, isPending } = useCreateOrUpdateProfile();

  async function onSubmit(data: ProfileInputType) {
    try {
      const response = await mutateAsync({
        payload: data,
      });

      if (response.success) {
        toast.success(response.message ?? "Profile updated successfully");
        handleClose?.();
        return;
      }

      toast.error(response.message ?? "Failed to update profile");
    } catch {
      toast.error("Something went wrong");
    }
  }

  const defaultValues: Partial<ProfileInputType> = user.profile
    ? {
        bio: user.profile.bio ?? "",
        birthdate: user.profile.birthdate
          ? new Date(user.profile.birthdate)
          : undefined,
      }
    : DEFAULT_VALUES;

  return (
    <ProfileUpdateForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
