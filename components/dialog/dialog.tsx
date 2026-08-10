"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ReusableDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting?: boolean;
  isSubmittingText?: string;
  children: React.ReactNode;
}

export function ReusableDialog({
  isOpen,
  onOpenChange,
  isSubmitting = false,
  children,
}: ReusableDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={isSubmitting ? undefined : onOpenChange}
    >
      <DialogContent className='shadow-xl border-brand/10 overflow-y-auto glass-brand'>
        <span className='p-4'>{children}</span>
      </DialogContent>
    </Dialog>
  );
}
