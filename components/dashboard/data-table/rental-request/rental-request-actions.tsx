"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { UserRole } from "@/types/enum";
import type { RentalRequestResponse } from "@/types/rental-request";

import useAuth from "@/hooks/auth/use-auth";
import {
  useDeleteRentalRequest,
  useUpdateRentalRequestByOwner,
  useUpdateRentalRequestByTenant,
} from "@/hooks";

import { ReusableDialog } from "@/components/dialog/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ActionButton from "@/components/button/action-button";

import RentalRequestUpdateForm from "./rental-request-update-form";
import RentalRequestStatusForm from "./rental-request-status-form";

interface RentalRequestActionsProps {
  rentalRequest: RentalRequestResponse;
}

export default function RentalRequestActions({
  rentalRequest,
}: RentalRequestActionsProps) {
  const { user, isLoading } = useAuth();

  const [updateDialog, setUpdateDialog] = useState(false);
  const [statusDialog, setStatusDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const tenantUpdateMutation = useUpdateRentalRequestByTenant();
  const ownerUpdateMutation = useUpdateRentalRequestByOwner();
  const deleteMutation = useDeleteRentalRequest();

  if (isLoading || !user) {
    return null;
  }

  const isTenant = user.role === UserRole.TENANT;
  const isLandlord = user.role === UserRole.LANDLORD;
  const isAdmin = user.role === UserRole.ADMIN;

  const canManageStatus = isLandlord || isAdmin;

  const isActive = rentalRequest.status === "ACTIVE";
  const isCompleted = rentalRequest.status === "COMPLETED";

  const canEdit = isTenant && !isActive && !isCompleted;
  const canDelete = !isActive && !isCompleted;

  const rentalPath = isAdmin
    ? `/dashboard/admin/rental-requests/${rentalRequest.id}`
    : isLandlord
      ? `/dashboard/landlord/rental-requests/${rentalRequest.id}`
      : `/dashboard/tenant/rental-requests/${rentalRequest.id}`;

  async function handleTenantUpdate(
    data: Parameters<typeof tenantUpdateMutation.mutateAsync>[0]["payload"],
  ) {
    try {
      const response = await tenantUpdateMutation.mutateAsync({
        id: rentalRequest.id,
        payload: data,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to update rental request.");
        return;
      }

      toast.success(response.message || "Rental request updated.");
      setUpdateDialog(false);
    } catch {
      toast.error("Failed to update rental request.");
    }
  }

  async function handleStatusUpdate(
    data: Parameters<typeof ownerUpdateMutation.mutateAsync>[0]["payload"],
  ) {
    try {
      const response = await ownerUpdateMutation.mutateAsync({
        id: rentalRequest.id,
        payload: data,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to update rental status.");
        return;
      }

      toast.success(response.message || "Rental status updated.");
      setStatusDialog(false);
    } catch {
      toast.error("Failed to update rental status.");
    }
  }

  async function handleDelete() {
    try {
      const response = await deleteMutation.mutateAsync({
        id: rentalRequest.id,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to delete rental request.");
        return;
      }

      toast.success(response.message || "Rental request deleted.");

      setDeleteDialog(false);
    } catch {
      toast.error("Failed to delete rental request.");
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='p-0 size-8'
            aria-label='Open rental request actions'
          >
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-48'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href={rentalPath}>
              <Eye className='size-4 text-muted-foreground' />
              <span>View</span>
            </Link>
          </DropdownMenuItem>

          {isTenant && (
            <>
              {(canEdit || canDelete) && <DropdownMenuSeparator />}

              {canEdit && (
                <DropdownMenuItem onClick={() => setUpdateDialog(true)}>
                  <Edit className='size-4 text-brand' />
                  <span>Edit request</span>
                </DropdownMenuItem>
              )}

              {canDelete && (
                <DropdownMenuItem
                  variant='destructive'
                  onClick={() => setDeleteDialog(true)}
                >
                  <Trash2 className='size-4' />
                  <span>Delete request</span>
                </DropdownMenuItem>
              )}
            </>
          )}

          {canManageStatus && (
            <>
              {(canDelete || !isCompleted) && <DropdownMenuSeparator />}

              {!isCompleted && (
                <DropdownMenuItem onClick={() => setStatusDialog(true)}>
                  {rentalRequest.status === "APPROVED" ? (
                    <CheckCircle2 className='size-4 text-brand-success' />
                  ) : (
                    <Edit className='size-4 text-brand' />
                  )}

                  <span>Update status</span>
                </DropdownMenuItem>
              )}

              {canDelete && (
                <DropdownMenuItem
                  variant='destructive'
                  onClick={() => setDeleteDialog(true)}
                >
                  <Trash2 className='size-4' />
                  <span>Delete request</span>
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isTenant && canEdit && (
        <ReusableDialog
          isOpen={updateDialog}
          onOpenChange={setUpdateDialog}
          isSubmitting={tenantUpdateMutation.isPending}
        >
          <RentalRequestUpdateForm
            defaultValues={{
              message: rentalRequest.message,
              moveInDate: new Date(rentalRequest.moveInDate),
              leaseDays: rentalRequest.leaseDays,
            }}
            isPending={tenantUpdateMutation.isPending}
            onSubmit={handleTenantUpdate}
          />
        </ReusableDialog>
      )}

      {canManageStatus && !isCompleted && (
        <ReusableDialog
          isOpen={statusDialog}
          onOpenChange={setStatusDialog}
          isSubmitting={ownerUpdateMutation.isPending}
        >
          <RentalRequestStatusForm
            defaultStatus={rentalRequest.status}
            isPending={ownerUpdateMutation.isPending}
            onSubmit={handleStatusUpdate}
          />
        </ReusableDialog>
      )}

      {canDelete && (
        <ReusableDialog
          isOpen={deleteDialog}
          onOpenChange={setDeleteDialog}
          isSubmitting={deleteMutation.isPending}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleDelete();
            }}
          >
            <Card className='border-destructive/20'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Trash2 className='size-5 text-destructive' />
                  Delete Rental Request
                </CardTitle>

                <CardDescription>
                  Are you sure you want to delete this rental request? This
                  action cannot be undone.
                </CardDescription>

                <CardAction>
                  <ActionButton
                    type='submit'
                    variant='destructive'
                    disabled={deleteMutation.isPending}
                    isLoading={deleteMutation.isPending}
                    loadingText='Deleting...'
                  >
                    Delete Request
                  </ActionButton>
                </CardAction>
              </CardHeader>

              <CardContent className='space-y-2'>
                <p className='text-muted-foreground text-sm'>
                  Property:{" "}
                  <span className='font-medium text-foreground'>
                    {rentalRequest.property.title}
                  </span>
                </p>

                <p className='text-muted-foreground text-sm'>
                  Current status:{" "}
                  <span className='font-medium text-foreground capitalize'>
                    {rentalRequest.status.toLowerCase().replaceAll("_", " ")}
                  </span>
                </p>
              </CardContent>
            </Card>
          </form>
        </ReusableDialog>
      )}
    </>
  );
}
