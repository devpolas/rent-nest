import type { MeResponse } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "./star-card";

type Props = {
  user: MeResponse;
};

export default function TenantOverview({ user }: Props) {
  return (
    <Card className='glass-card'>
      <CardHeader>
        <CardTitle>Tenant Activity</CardTitle>
      </CardHeader>

      <CardContent className='gap-4 grid grid-cols-2'>
        {/* <StatCard label='Requests' value={user.requestCount ?? 0} /> */}
        {/* <StatCard label='Favorites' value={user.favoriteCount ?? 0} /> */}
      </CardContent>
    </Card>
  );
}
