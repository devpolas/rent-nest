import { CheckCircle2, Circle, ImageIcon, MapPin, Pencil } from "lucide-react";
import type { PropertyManagementResponse } from "@/types/property";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  property: PropertyManagementResponse;
};

type SetupItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  complete: boolean;
};

function SetupItem({ icon, title, description, complete }: SetupItemProps) {
  return (
    <div className='flex items-start gap-3 p-4 border rounded-lg'>
      <div
        className={`mt-0.5 shrink-0 rounded-full p-2 ${
          complete
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {icon}
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2'>
          <p className='font-medium text-sm'>{title}</p>

          {complete ? (
            <CheckCircle2 className='size-4 text-primary' />
          ) : (
            <Circle className='size-4 text-muted-foreground' />
          )}
        </div>

        <p className='mt-1 text-muted-foreground text-xs'>{description}</p>
      </div>
    </div>
  );
}

export default function PropertySetupProgress({ property }: Props) {
  const hasImages = property.images.length > 0;
  const hasLocation = !!property.location;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property setup</CardTitle>

        <CardDescription>
          Complete the remaining information to make your property ready for
          tenants.
        </CardDescription>
      </CardHeader>

      <CardContent className='gap-4 grid md:grid-cols-3'>
        <SetupItem
          icon={<Pencil className='size-4' />}
          title='Basic information'
          description='Property details are complete.'
          complete
        />

        <SetupItem
          icon={<ImageIcon className='size-4' />}
          title='Photos'
          description={
            hasImages
              ? `${property.images.length} photo${
                  property.images.length === 1 ? "" : "s"
                } added.`
              : "Add photos to showcase your property."
          }
          complete={hasImages}
        />

        <SetupItem
          icon={<MapPin className='size-4' />}
          title='Location'
          description={
            hasLocation
              ? "Property location has been added."
              : "Add a location so tenants can find it."
          }
          complete={hasLocation}
        />
      </CardContent>
    </Card>
  );
}
