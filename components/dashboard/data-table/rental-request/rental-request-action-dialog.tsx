"use client";

import type {
  RentalRequestAdminAndOwnerUpdateType,
  RentalRequestTenantUpdateType,
} from "@/schemas/rental.schema";
import { UserRole } from "@/types/enum";
import type { RentalRequestResponse } from "@/types/rental-request";

import { ReusableDialog } from "@/components/dialog/dialog";
import RentalRequestUpdateForm from "./rental-request-update-form";
import RentalRequestStatusForm from "./rental-request-status-form";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ActionButton from "@/components/button/action-button";
import { Trash2 } from "lucide-react";

interface RentalRequestActionDialogProps {
  type: "tenant-update" | "status-update" | "delete";

  open: boolean;

  onOpenChange: (open: boolean) => void;

  rentalRequest: RentalRequestResponse;

  role: UserRole;

  isPending?: boolean;

  onTenantUpdate?: (
    data: RentalRequestTenantUpdateType,
  ) => void | Promise<void>;

  onStatusUpdate?: (
    data: RentalRequestAdminAndOwnerUpdateType,
  ) => void | Promise<void>;

  onDelete?: () => void | Promise<void>;
}

export default function RentalRequestActionDialog({
  type,
  open,
  onOpenChange,
  rentalRequest,
  role,
  isPending = false,
  onTenantUpdate,
  onStatusUpdate,
  onDelete,
}: RentalRequestActionDialogProps) {
  /*
   * ============================================================
   * TENANT UPDATE
   * ============================================================
   */

  if (type === "tenant-update") {
    // Only tenant should be able to use this dialog.
    if (role !== UserRole.TENANT) {
      return null;
    }

    return (
      <ReusableDialog
        isOpen={open}
        onOpenChange={onOpenChange}
        isSubmitting={isPending}
      >
        <RentalRequestUpdateForm
          isPending={isPending}
          onSubmit={async (data) => {
            await onTenantUpdate?.(data);
          }}
          defaultValues={{
            message: rentalRequest.message,
            moveInDate: new Date(rentalRequest.moveInDate),
            leaseDays: rentalRequest.leaseDays,
          }}
        />
      </ReusableDialog>
    );
  }

  /*
   * ============================================================
   * LANDLORD / ADMIN STATUS UPDATE
   * ============================================================
   */

  if (type === "status-update") {
    if (role !== UserRole.LANDLORD && role !== UserRole.ADMIN) {
      return null;
    }

    return (
      <ReusableDialog
        isOpen={open}
        onOpenChange={onOpenChange}
        isSubmitting={isPending}
      >
        <RentalRequestStatusForm
          defaultStatus={rentalRequest.status}
          isPending={isPending}
          onSubmit={async (data) => {
            await onStatusUpdate?.(data);
          }}
        />
      </ReusableDialog>
    );
  }

  /*
   * ============================================================
   * DELETE
   * ============================================================
   */

  return (
    <ReusableDialog
      isOpen={open}
      onOpenChange={onOpenChange}
      isSubmitting={isPending}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void onDelete?.();
        }}
      >
        <Card className='border-destructive/20'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Trash2 className='size-5 text-destructive' />
              Delete
            </CardTitle>

            <CardDescription>
              Are you sure you want to delete this rental request? This action
              cannot be undone.
            </CardDescription>

            <CardAction>
              <ActionButton
                type='submit'
                variant='destructive'
                isLoading={isPending}
                disabled={isPending}
                loadingText='Deleting...'
              >
                Delete Request
              </ActionButton>
            </CardAction>
          </CardHeader>

          <CardContent>
            <div className='space-y-2 text-sm'>
              <p className='text-muted-foreground'>
                Property:{" "}
                <span className='font-medium text-foreground'>
                  {rentalRequest.property.title}
                </span>
              </p>

              <p className='text-muted-foreground'>
                Current status:{" "}
                <span className='font-medium text-foreground capitalize'>
                  {rentalRequest.status.toLowerCase().replaceAll("_", " ")}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </ReusableDialog>
  );
}
