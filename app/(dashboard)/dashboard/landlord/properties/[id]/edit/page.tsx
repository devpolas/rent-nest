import UpdateProperty from "@/components/dashboard/property/update-property";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <UpdateProperty propertyId={id} />;
}
