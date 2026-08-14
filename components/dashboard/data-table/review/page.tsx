"use client";
import { useAllReviews } from "@/hooks";
import Loading from "@/app/loading";
import { reviewColumns } from "./review-columns";
import ReviewTable from "./review-table";

export default function DashboardReviewTable() {
  const { data: reviewResponse, isLoading } = useAllReviews();

  if (isLoading) {
    return <Loading />;
  }

  if (!reviewResponse || !reviewResponse.success || !reviewResponse.data) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>
          {reviewResponse?.message ?? "Reviews not found"}
        </p>
      </div>
    );
  }
  const reviews = reviewResponse?.data?.reviews ?? [];

  return (
    <div className='p-4'>
      <ReviewTable data={reviews} columns={reviewColumns} />
    </div>
  );
}
