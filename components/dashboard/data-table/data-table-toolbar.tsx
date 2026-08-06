"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function DataTableToolbar({ value, onChange }: Props) {
  return (
    <div className='flex items-center py-4'>
      <Input
        placeholder='Search...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='max-w-sm'
      />
    </div>
  );
}
