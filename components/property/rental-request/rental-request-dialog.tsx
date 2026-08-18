"use client";

import { ReusableDialog } from "@/components/dialog/dialog";
import RentalRequest from "./rental-request";

interface PropertyRentalRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: string;
  propertyTitle: string;
  rent: number;
}

export default function PropertyRentalRequestDialog({
  open,
  onOpenChange,
  propertyId,
  propertyTitle,
  rent,
}: PropertyRentalRequestDialogProps) {
  return (
    <ReusableDialog isOpen={open} onOpenChange={onOpenChange}>
      <RentalRequest
        propertyId={propertyId}
        propertyTitle={propertyTitle}
        rent={rent}
        handleClose={() => onOpenChange(false)}
      />
    </ReusableDialog>
  );
}
