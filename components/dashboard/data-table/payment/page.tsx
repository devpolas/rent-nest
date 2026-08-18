"use client";

import { useSearchParams } from "next/navigation";

import Loading from "@/app/loading";
import { usePaymentHistories } from "@/hooks";
import PaymentTable from "./payment-table";
import { paymentHistoryColumns } from "./payment-columns";
import PaymentSuccess from "../../payments/payment-success";

export default function DashboardPaymentHistoryTable() {
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  const sessionId = searchParams.get("session_id");

  // ============================================================
  // STRIPE PAYMENT SUCCESS
  // ============================================================

  if (status === "success" && sessionId) {
    return (
      <div className='flex justify-center items-center p-4 w-full h-full'>
        <PaymentSuccess sessionId={sessionId} />;
      </div>
    );
  }

  // ============================================================
  // PAYMENT HISTORY
  // ============================================================

  return <PaymentHistoryTable />;
}

function PaymentHistoryTable() {
  const {
    data: paymentResponse,
    isLoading,
    isError,
    error,
  } = usePaymentHistories();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !paymentResponse?.success) {
    return (
      <div className='flex justify-center items-center h-full min-h-[400px]'>
        <p className='text-muted-foreground'>
          {error instanceof Error
            ? error.message
            : (paymentResponse?.message ?? "Failed to load payment history.")}
        </p>
      </div>
    );
  }

  const paymentHistory = paymentResponse.data?.paymentHistory ?? [];

  if (paymentHistory.length === 0) {
    return (
      <div className='flex justify-center items-center h-full min-h-[400px]'>
        <div className='text-center'>
          <h2 className='font-semibold text-lg'>No payment history</h2>

          <p className='mt-1 text-muted-foreground text-sm'>
            You haven&apos;t completed any rental payments yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <PaymentTable data={paymentHistory} columns={paymentHistoryColumns} />
    </div>
  );
}
