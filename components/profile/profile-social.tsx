import { Globe } from "lucide-react";
import type { MeResponse } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Large, Muted } from "@/components/typography/typography";

type Props = {
  user: MeResponse;
};

export default function ProfileSocial({ user }: Props) {
  const socials = user.profile?.socialProfiles;

  return (
    <Card className='glass-card'>
      <CardHeader>
        <CardTitle>Social Profiles</CardTitle>
      </CardHeader>

      <CardContent className='space-y-3'>
        {socials?.length ? (
          socials.map((social) => (
            <div
              key={social.id}
              className='flex justify-between items-center p-4 rounded-xl glass'
            >
              <div className='flex items-center gap-3'>
                <Globe className='size-5 text-brand' />
                <Large>{social.platform}</Large>
              </div>
              <Button variant='outline'>Visit</Button>
            </div>
          ))
        ) : (
          <Muted>No social profiles connected.</Muted>
        )}
      </CardContent>
    </Card>
  );
}
