"use client";

import Loading from "@/app/loading";
import { useProperty, usePropertyReviews } from "@/hooks";
import PropertyDetails from "../property/property-details";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PropertyDetail({ id }: { id: string }) {
  const router = useRouter();
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
    <section className='space-y-4 mx-auto p-4 container'>
      <Button
        variant='ghost'
        size='sm'
        className='-ml-2'
        onClick={() => router.back()}
      >
        <ArrowLeft className='mr-2 size-4' />
        Back to Properties
      </Button>
      <PropertyDetails property={property} reviews={reviews} />
    </section>
  );
}
