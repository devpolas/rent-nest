import { getAllPropertyDetails } from "@/lib/actions/property.actions";

export default async function Home() {
  const allPropertiesDetails = await getAllPropertyDetails({
    detailsAction: "categories",
  });
  console.log(allPropertiesDetails.data);
  return <div>hello rent nest</div>;
}
