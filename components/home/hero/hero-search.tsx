import { Search, MapPin, Home, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Caption } from "@/components/typography/typography";

export default function HeroSearch() {
  return (
    <div className='shadow-xl p-3 rounded-3xl glass'>
      <div className='gap-3 grid md:grid-cols-[1fr_1fr_1fr_auto]'>
        {/* Location */}
        <SearchField icon={MapPin} placeholder='Location' />

        {/* Property Type */}
        <SearchField icon={Home} placeholder='Property Type' />

        {/* Budget */}
        <SearchField icon={Wallet} placeholder='Budget' />

        <Button
          variant='brand'
          className='px-6 rounded-2xl h-12'
        >
          <Search className='mr-2 size-5' />
          Search
        </Button>
      </div>
    </div>
  );
}

type SearchFieldProps = {
  icon: React.ElementType;
  placeholder: string;
};

function SearchField({ icon: Icon, placeholder }: SearchFieldProps) {
  return (
    <div className='flex items-center gap-3 bg-background/40 pr-2 pl-4 rounded-2xl'>
      <Icon className='size-5 text-brand' />

      <Input
        placeholder={placeholder}
        className='bg-transparent shadow-none border-0 focus-visible:ring-0 h-12'
      />
    </div>
  );
}
