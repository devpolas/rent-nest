"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { UserRole } from "@/types/enum";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useAuth from "@/hooks/auth/use-auth";
import { ReusableDialog } from "@/components/dialog/dialog";

import type { PropertyStatus } from "@/types/enum";
import { useAdminUpdateProperty } from "@/hooks";
import UpdatePropertyStatusForm from "./property-status-form";

interface PropertyActionsProps {
  propertyId: string;
  status?: PropertyStatus;
  onDelete?: (propertyId: string) => void;
}

export function PropertyActions({
  propertyId,
  status,
  onDelete,
}: PropertyActionsProps) {
  const { user, isLoading } = useAuth();

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const adminUpdateMutation = useAdminUpdateProperty();

  if (isLoading || !user) {
    return null;
  }

  const role = user.role;

  const isLandlord = role === UserRole.LANDLORD;
  const isAdmin = role === UserRole.ADMIN;

  const propertyPath = isAdmin
    ? `/dashboard/admin/properties/${propertyId}`
    : `/dashboard/landlord/properties/${propertyId}`;

  async function handleStatusUpdate(data: {
    status?: PropertyStatus;
    landlordId?: string;
  }) {
    if (!data.status) {
      return;
    }

    await adminUpdateMutation.mutateAsync({
      id: propertyId,
      payload: {
        status: data.status,
      },
    });

    setIsStatusDialogOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='p-0 size-8'
            aria-label='Open property actions'
          >
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* Common */}
          <DropdownMenuItem asChild>
            <Link href={propertyPath}>View details</Link>
          </DropdownMenuItem>

          {/* LANDLORD */}
          {isLandlord && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`${propertyPath}/edit`}>Edit property</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant='destructive'
                onClick={() => onDelete?.(propertyId)}
              >
                Delete property
              </DropdownMenuItem>
            </>
          )}

          {/* ADMIN */}
          {isAdmin && (
            <>
              <DropdownMenuItem onClick={() => setIsStatusDialogOpen(true)}>
                Change status
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`${propertyPath}/edit`}>Manage property</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href={`${propertyPath}/reviews`}>View reviews</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ADMIN STATUS DIALOG */}
      {isAdmin && (
        <ReusableDialog
          isOpen={isStatusDialogOpen}
          onOpenChange={setIsStatusDialogOpen}
          isSubmitting={adminUpdateMutation.isPending}
        >
          <UpdatePropertyStatusForm
            defaultStatus={status}
            isPending={adminUpdateMutation.isPending}
            onSubmit={handleStatusUpdate}
          />
        </ReusableDialog>
      )}
    </>
  );
}
