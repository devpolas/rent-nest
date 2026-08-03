import type { MeResponse } from "@/types/user";
import LandlordOverview from "./landlord-overview";
import TenantOverview from "./tenant-overview";

type Props = {
  user: MeResponse;
};

export default function RoleOverview({ user }: Props) {
  if (user.role === "LANDLORD") {
    return <LandlordOverview user={user} />;
  }

  if (user.role === "TENANT") {
    return <TenantOverview user={user} />;
  }

  return null;
}
