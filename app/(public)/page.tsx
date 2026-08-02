import { getAllPropertyDetails } from "@/lib/actions/property.actions";

export default async function Home() {
  const allProperties = await getAllPropertyDetails({
    detailsAction: "categories",
  });
  console.log(allProperties);
  return <div>hello rent nest</div>;
}
