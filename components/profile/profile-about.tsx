import type { MeResponse } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Paragraph } from "@/components/typography/typography";

type Props = {
  user: MeResponse;
};

export default function ProfileAbout({ user }: Props) {
  return (
    <Card className='glass-card'>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>

      <CardContent>
        <Paragraph>{user.profile?.bio ?? "No bio added yet."}</Paragraph>
      </CardContent>
    </Card>
  );
}
