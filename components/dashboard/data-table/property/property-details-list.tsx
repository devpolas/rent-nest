"use client";

import * as React from "react";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ReusableDialog } from "@/components/dialog/dialog";
import { Heading3, Lead, Muted } from "@/components/typography/typography";

interface PropertyDetailsListProps<T extends { id: string }> {
  title: string;
  details: T[];
  getName: (item: T) => string;
}

export function PropertyDetailsList<T extends { id: string }>({
  title,
  details,
  getName,
}: PropertyDetailsListProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={() => setIsOpen(true)}
      >
        <Eye className='size-4' />
        {title}
      </Button>

      <ReusableDialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <div className='flex justify-center'>
          <div className='space-y-4'>
            <Heading3 className='text-lg md:text-xl'>Property {title}</Heading3>
            {details.length > 0 ? (
              <div className='space-y-2 grid grid-cols-1 md:grid-cols-2'>
                {details.map((item, i) => (
                  <Lead key={item.id} className='block'>
                    {i + 1}. {getName(item)}
                  </Lead>
                ))}
              </div>
            ) : (
              <Muted> No {title.toLowerCase()} available. </Muted>
            )}
          </div>
        </div>
      </ReusableDialog>
    </>
  );
}
