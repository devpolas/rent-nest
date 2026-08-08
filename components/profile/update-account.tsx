"use client";
import { toast } from "sonner";

import { UserInputType } from "@/schemas/user.schema";
import { MeResponse } from "@/types/user";
import { useUpdateMe } from "@/hooks";
import AccountUpdateForm from "./from/account-update-from";

export default function UpdateAccount({
  user,
  handleClose,
}: {
  user: MeResponse;
  handleClose: () => void;
}) {
  const { mutateAsync, isPending } = useUpdateMe();

  async function onSubmit(data: UserInputType) {
    try {
      const response = await mutateAsync({
        payload: data,
      });

      if (response.success) {
        toast.success(response.message ?? "Account updated successfully");
        handleClose?.();
        return;
      }

      toast.error(response.message ?? "Failed to update account");
    } catch {
      toast.error("Something went wrong");
    }
  }

  const defaultValues: Partial<UserInputType> = {
    name: user.name ?? "",
    phone: user.phone ?? "",
  };

  return (
    <AccountUpdateForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      isPending={isPending}
    />
  );
}
