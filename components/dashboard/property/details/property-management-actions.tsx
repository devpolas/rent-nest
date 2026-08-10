"use client";

import { Edit, ImagePlus, MapPin, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import type { PropertyManagementResponse } from "@/types/property";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  property: PropertyManagementResponse;
  onManageLocation: () => void;
};

export default function PropertyManagementActions({
  property,
  onManageLocation,
}: Props) {
  const router = useRouter();
  const propertyBasePath = `/dashboard/properties/${property.id}`;

  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='outline'
        onClick={() => router.push(`${propertyBasePath}/edit`)}
      >
        <Edit className='mr-2 size-4' />
        Edit Property
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon' aria-label='More actions'>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-48'>
          <DropdownMenuItem
            onClick={() => router.push(`${propertyBasePath}/images`)}
          >
            <ImagePlus className='mr-2 size-4' />
            Manage Photos
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onManageLocation()}>
            <MapPin className='mr-2 size-4' />
            Manage Location
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(property.id)}
          >
            Copy Property ID
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
