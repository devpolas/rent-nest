import { Calendar, Phone, ShieldCheck, UserRound } from "lucide-react";
import type { MeResponse } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileItem from "./profile-item";

type Props = {
  user: MeResponse;
};

export default function ProfileInformation({ user }: Props) {
  return (
    <Card className='glass-card'>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent className='gap-5 grid sm:grid-cols-2'>
        <ProfileItem
          icon={Phone}
          label='Phone'
          value={user.phone ?? "Not provided"}
        />

        <ProfileItem
          icon={Calendar}
          label='Joined'
          value={new Date(user.createdAt).toLocaleDateString()}
        />

        <ProfileItem icon={ShieldCheck} label='Status' value={user.status} />

        <ProfileItem icon={UserRound} label='Role' value={user.role} />
      </CardContent>
    </Card>
  );
}
