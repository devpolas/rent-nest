import type { MeResponse } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "./star-card";

type Props = {
  user: MeResponse;
};

export default function LandlordOverview({ user }: Props) {
  return (
    <Card className='glass-card'>
      <CardHeader>
        <CardTitle>Landlord Overview</CardTitle>
      </CardHeader>

      <CardContent className='gap-4 grid grid-cols-2'>
        <StatCard label='Properties' value={user.property ?? 0} />
        <StatCard label='Requests' value={user.landlordRentalRequests ?? 0} />
      </CardContent>
    </Card>
  );
}
