import PropertyManagementPage from "@/components/dashboard/property/details/property-management-page";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <PropertyManagementPage propertyId={id} />;
}
