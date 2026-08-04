import {
  Building2,
  Home,
  Hotel,
  Landmark,
  Store,
  Warehouse,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Heading2, Lead } from "@/components/typography/typography";

import CategoryCard from "./category-card";

const categories = [
  { id: 1, icon: Building2, name: "Apartments", count: "620+ listings" },
  { id: 2, icon: Home, name: "Houses", count: "410+ listings" },
  { id: 3, icon: Hotel, name: "Villas", count: "180+ listings" },
  { id: 4, icon: Landmark, name: "Offices", count: "140+ listings" },
  { id: 5, icon: Store, name: "Commercial", count: "95+ listings" },
  { id: 6, icon: Warehouse, name: "Studios", count: "70+ listings" },
];

export default function CategorySection() {
  return (
    <section className='mx-auto px-4 py-20 container'>
      <div className='mx-auto mb-12 max-w-2xl text-center'>
        <Badge className='bg-brand/10 mb-4 text-brand'>Browse by type</Badge>

        <Heading2 className='border-0'>Explore Property Categories</Heading2>

        <Lead className='mt-3'>
          Whatever you are looking for, find the right space across our curated
          property categories.
        </Lead>
      </div>

      <div className='gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            name={category.name}
            count={category.count}
          />
        ))}
      </div>
    </section>
  );
}
