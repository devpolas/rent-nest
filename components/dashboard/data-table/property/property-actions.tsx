"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Settings2,
  RefreshCw,
  Star,
  Trash2,
} from "lucide-react";

import { UserRole, type PropertyStatus } from "@/types/enum";
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

import ActionButton from "@/components/button/action-button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAdminUpdateProperty, useDeleteProperty } from "@/hooks";
import UpdatePropertyStatusForm from "./property-status-form";

interface PropertyActionsProps {
  propertyId: string;
  status?: PropertyStatus;
}

export function PropertyActions({ propertyId, status }: PropertyActionsProps) {
  const { user, isLoading } = useAuth();

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const adminUpdateMutation = useAdminUpdateProperty();
  const deleteMutation = useDeleteProperty();

  if (isLoading || !user) {
    return null;
  }

  const role = user.role;

  const isLandlord = role === UserRole.LANDLORD;
  const isAdmin = role === UserRole.ADMIN;

  const propertyPath = isAdmin
    ? `/dashboard/admin/properties/${propertyId}`
    : `/dashboard/landlord/properties/${propertyId}`;

  async function handleStatusUpdate({ status }: { status?: PropertyStatus }) {
    if (!status) return;

    await adminUpdateMutation.mutateAsync({
      id: propertyId,
      payload: {
        status,
      },
    });

    setIsStatusDialogOpen(false);
  }

  async function handleDelete() {
    await deleteMutation.mutateAsync({
      id: propertyId,
    });

    setIsDeleteDialogOpen(false);
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

        <DropdownMenuContent align='end' className='w-48'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* COMMON */}
          <DropdownMenuItem asChild>
            <Link href={propertyPath} className='w-full'>
              <Eye className='size-4 text-muted-foreground shrink-0' />
              <span>Details</span>
            </Link>
          </DropdownMenuItem>

          {/* LANDLORD */}
          {isLandlord && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`${propertyPath}/edit`} className='w-full'>
                  <Pencil className='size-4 text-blue-500 shrink-0' />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant='destructive'
                onClick={() => setIsDeleteDialogOpen(true)}
                className='w-full'
              >
                <Trash2 className='size-4 shrink-0' />
                <span>Delete</span>
              </DropdownMenuItem>
            </>
          )}

          {/* ADMIN */}
          {isAdmin && (
            <>
              <DropdownMenuItem
                onClick={() => setIsStatusDialogOpen(true)}
                className='w-full'
              >
                <RefreshCw className='size-4 text-amber-500 shrink-0' />
                <span>Change status</span>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`${propertyPath}/edit`} className='w-full'>
                  <Settings2 className='size-4 text-blue-500 shrink-0' />
                  <span>Manage</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href={`${propertyPath}/reviews`} className='w-full'>
                  <Star className='size-4 text-yellow-500 shrink-0' />
                  <span>Reviews</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ADMIN — CHANGE STATUS */}
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

      {/* LANDLORD — DELETE */}
      {isLandlord && (
        <ReusableDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
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
                <CardTitle>Delete Property</CardTitle>

                <CardDescription>
                  Are you sure you want to delete this property? This action
                  cannot be undone.
                </CardDescription>

                <CardAction>
                  <ActionButton
                    type='submit'
                    variant='destructive'
                    disabled={deleteMutation.isPending}
                    isLoading={deleteMutation.isPending}
                    loadingText='Deleting...'
                  >
                    Delete
                  </ActionButton>
                </CardAction>
              </CardHeader>

              <CardContent>
                <p className='text-muted-foreground text-sm'>
                  All property-related data may be affected by this action.
                </p>
              </CardContent>
            </Card>
          </form>
        </ReusableDialog>
      )}
    </>
  );
}
