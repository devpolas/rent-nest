"use client";
import { usePaymentHistories } from "@/hooks";
import Loading from "@/app/loading";
import PaymentTable from "./payment-table";
import { paymentHistoryColumns } from "./payment-columns";

export default function DashboardPaymentHistoryTable() {
  const { data: paymentResponse, isLoading } = usePaymentHistories();

  if (isLoading) {
    return <Loading />;
  }

  if (!paymentResponse || !paymentResponse.success || !paymentResponse.data) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>
          {paymentResponse?.message ?? "Properties not found"}
        </p>
      </div>
    );
  }
  const paymentHistory = paymentResponse?.data?.paymentHistory ?? [];

  return (
    <div className='p-4'>
      <PaymentTable data={paymentHistory} columns={paymentHistoryColumns} />
    </div>
  );
}
