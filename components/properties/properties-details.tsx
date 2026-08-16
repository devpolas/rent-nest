"use client";

import Loading from "@/app/loading";
import { useProperty, usePropertyReviews } from "@/hooks";
import PropertyDetails from "../property/property-details";

export default function PropertyDetail({ id }: { id: string }) {
  const { data, isLoading } = useProperty(id);
  const { data: propertyReviews, isLoading: propertyReviewLoading } =
    usePropertyReviews(id);

  if (isLoading || propertyReviewLoading) {
    return <Loading />;
  }

  if (!data || !data.success || !data.data) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>
          {data?.message ?? "Properties not found"}
        </p>
      </div>
    );
  }

  const property = data?.data?.property ?? [];
  const reviews = propertyReviews?.data?.reviews ?? [];

  return (
    <section className='mx-auto p-4 container'>
      <PropertyDetails property={property} reviews={reviews} />
    </section>
  );
}
