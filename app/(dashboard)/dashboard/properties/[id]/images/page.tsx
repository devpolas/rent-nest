import PropertyImagesPage from "@/components/dashboard/property/property-images/property-images-page";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <PropertyImagesPage propertyId={id} />;
}
