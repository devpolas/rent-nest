import DashboardPropertiesDetails from "@/components/dashboard/property/property-details";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <DashboardPropertiesDetails id={id} />;
}
