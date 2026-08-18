"use client";

import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ActionButton from "@/components/button/action-button";
import { useMakePayment } from "@/hooks";

interface RentalRequestPaymentButtonProps {
  rentRequestId: string;
  variant?: "action" | "button";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function RentalRequestPaymentButton({
  rentRequestId,
  variant = "action",
  size = "lg",
  className,
}: RentalRequestPaymentButtonProps) {
  const paymentMutation = useMakePayment();

  async function handlePayment() {
    if (!rentRequestId.trim()) {
      toast.error("Rental request ID is required.");
      return;
    }

    try {
      const response = await paymentMutation.mutateAsync({
        rentRequestId,
      });

      if (!response.success) {
        toast.error(response.message || "Unable to start payment.");
        return;
      }

      const url = response.data?.url;

      if (!url) {
        toast.error("Payment session URL was not returned.");
        return;
      }

      window.location.assign(url);
    } catch {
      toast.error("Unable to start payment. Please try again.");
    }
  }

  if (variant === "button") {
    return (
      <Button
        type='button'
        size={size}
        className={className}
        disabled={paymentMutation.isPending}
        onClick={handlePayment}
      >
        <CreditCard className='mr-2 size-4' />

        {paymentMutation.isPending ? "Processing..." : "Pay Now"}
      </Button>
    );
  }

  return (
    <ActionButton
      type='button'
      size={size}
      className={className}
      isLoading={paymentMutation.isPending}
      disabled={paymentMutation.isPending}
      loadingText='Processing...'
      onClick={handlePayment}
    >
      <CreditCard className='mr-2 size-4' />
      Pay Now
    </ActionButton>
  );
}
