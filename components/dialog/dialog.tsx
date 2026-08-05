"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
interface ReusableDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting?: boolean;
  isSubmittingText?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function ReusableDialog({
  isOpen,
  onOpenChange,
  isSubmitting = false,
  children,
  size = "md",
}: ReusableDialogProps) {
  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
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
        {children}
      </DialogContent>
    </Dialog>
  );
}
