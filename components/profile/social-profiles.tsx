import Link from "next/link";
import { ExternalLink, Share2 } from "lucide-react";
import type { SocialProfile } from "@/types/social-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Muted } from "@/components/typography/typography";
import SocialPlatformIcon from "./social-platform-icon";
import {
  getSocialPlatformDescription,
  getSocialPlatformLabel,
} from "./social-platform-label";

type Props = {
  socialProfiles: SocialProfile[];
};

export default function SocialProfiles({ socialProfiles }: Props) {
  return (
    <Card className='glass-card'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Share2 className='size-5 text-brand' />
          Social Profiles
        </CardTitle>
      </CardHeader>

      <CardContent>
        {socialProfiles.length === 0 ? (
          <EmptyState />
        ) : (
          <div className='space-y-4'>
            {socialProfiles.map((social) => (
              <SocialProfileItem key={social.id} social={social} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

type SocialProfileItemProps = {
  social: SocialProfile;
};

function SocialProfileItem({ social }: SocialProfileItemProps) {
  return (
    <Link
      href={social.url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`Visit ${getSocialPlatformLabel(social.platform)}`}
      className='group flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 hover:bg-brand/5 p-4 hover:border-brand/30 rounded-xl transition-all duration-300 glass'
    >
      <div className='flex items-center gap-4 min-w-0'>
        <div className='flex justify-center items-center bg-brand/10 group-hover:bg-brand rounded-xl size-12 text-brand group-hover:text-brand-foreground group-hover:scale-105 transition-all duration-300 shrink-0'>
          <SocialPlatformIcon platform={social.platform} />
        </div>

        <div className='space-y-1 min-w-0'>
          <Label>{getSocialPlatformLabel(social.platform)}</Label>
          <Muted className='truncate'>
            {getSocialPlatformDescription(social.platform)}
          </Muted>
        </div>
      </div>
      <div className='flex items-center self-end sm:self-auto gap-2 text-brand transition-transform group-hover:translate-x-1 duration-300'>
        <span className='font-medium text-sm'>Visit</span>
        <ExternalLink className='size-4' />
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className='flex flex-col items-center py-10 text-center'>
      <div className='bg-brand/10 mb-5 p-4 rounded-full'>
        <Share2 className='size-7 text-brand' />
      </div>

      <Label>No Social Profiles</Label>

      <Muted className='mt-2 max-w-sm'>
        This user hasn&apos;t connected any social profiles yet.
      </Muted>
    </div>
  );
}
