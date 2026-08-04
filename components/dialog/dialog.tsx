"use client";

import LoadingSpinner from "@/components/spinner/loading-spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

interface ReusableDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTitle: string;
  dialogDescription?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  isSubmittingText?: string;
  submitText: string;
  cancelText: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function ReusableDialog({
  isOpen,
  onOpenChange,
  dialogTitle,
  dialogDescription,
  onSubmit,
  isSubmitting = false,
  isSubmittingText,
  submitText,
  cancelText,
  children,
  size = "md",
}: ReusableDialogProps) {
  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={isSubmitting ? undefined : onOpenChange}
    >
      <DialogContent
        className={`
          ${sizeClasses[size]}
          border-brand/10
          shadow-xl
        `}
      >
        <form onSubmit={onSubmit} className='space-y-6'>
          <DialogHeader className='space-y-2'>
            <DialogTitle className='font-semibold text-foreground text-xl'>
              {dialogTitle}
            </DialogTitle>

            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>

          <FieldGroup className='space-y-4'>{children}</FieldGroup>

          <DialogFooter className='sm:flex-row flex-col-reverse sm:justify-end gap-3'>
            <DialogClose asChild>
              <Button
                type='button'
                variant='outline'
                disabled={isSubmitting}
                className='hover:bg-brand/5 hover:border-brand/30'
              >
                {cancelText}
              </Button>
            </DialogClose>

            <Button type='submit' variant='brand' disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpinner text={isSubmittingText} />
              ) : (
                submitText
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
