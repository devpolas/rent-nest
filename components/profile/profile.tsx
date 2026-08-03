import { MeResponse } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heading2, Large, Muted, Paragraph } from "../typography/typography";
import { Badge } from "../ui/badge";
import {
  Calendar,
  Globe,
  KeyRound,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Button } from "../ui/button";
import ProfileItem from "./profile-item";
import StatCard from "./star-card";

export default function Profile({ profile }: { profile: MeResponse }) {
  return (
    <div className='space-y-8 mx-auto py-10 container'>
      {/* Profile Header */}
      <Card className='bg-brand-surface border-border overflow-hidden'>
        <div className='relative bg-brand h-32' />

        <CardContent className='relative p-6'>
          <div className='flex md:flex-row flex-col md:items-end gap-5 -mt-20'>
            <Avatar className='shadow-lg border-4 border-background size-32'>
              <AvatarImage src={profile.avatar ?? ""} alt={profile.name} />
              <AvatarFallback>RN</AvatarFallback>
            </Avatar>

            <div className='flex-1 space-y-2'>
              <div className='flex flex-wrap items-center gap-3'>
                <Heading2 className='pb-0 border-0'>{profile.name}</Heading2>

                <Badge className='bg-brand-success text-brand-success-foreground'>
                  {profile.role}
                </Badge>
              </div>

              <div className='flex items-center gap-2 text-brand-muted'>
                <Mail className='size-4' />

                <Muted>{profile.email}</Muted>
              </div>

              <div className='flex items-center gap-2 text-brand-muted'>
                <MapPin className='size-4' />

                <Muted>{profile.location ?? "Location not added"}</Muted>
              </div>
            </div>

            <Button className='bg-brand hover:bg-brand/90 text-brand-foreground'>
              <Pencil className='mr-2 size-4' />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className='gap-8 grid lg:grid-cols-3'>
        {/* Left */}
        <div className='space-y-8 lg:col-span-2'>
          {/* About */}
          <Card className='bg-brand-surface'>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>

            <CardContent>
              <Paragraph>{profile.bio ?? "No bio added yet."}</Paragraph>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className='bg-brand-surface'>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>

            <CardContent className='gap-5 grid sm:grid-cols-2'>
              <ProfileItem
                icon={Phone}
                label='Phone'
                value={profile.phone ?? "Not provided"}
              />

              <ProfileItem
                icon={Calendar}
                label='Joined'
                value={profile.createdAt}
              />

              <ProfileItem
                icon={ShieldCheck}
                label='Account Status'
                value={profile.status}
              />

              <ProfileItem icon={UserRound} label='Role' value={profile.role} />
            </CardContent>
          </Card>

          {/* Social Profiles */}
          <Card className='bg-brand-surface'>
            <CardHeader>
              <CardTitle>Social Profiles</CardTitle>
            </CardHeader>

            <CardContent className='space-y-3'>
              {profile.socialProfiles?.length ? (
                profile.socialProfiles.map((social) => (
                  <div
                    key={social.id}
                    className='flex justify-between items-center p-4 border border-border rounded-xl'
                  >
                    <div className='flex items-center gap-3'>
                      <Globe className='size-5 text-brand' />

                      <Large>{social.platform}</Large>
                    </div>

                    <Button variant='outline'>Visit</Button>
                  </div>
                ))
              ) : (
                <Muted>No social profile connected.</Muted>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <aside className='space-y-6'>
          {/* Account Card */}
          <Card className='bg-brand-surface border-border'>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>

            <CardContent className='space-y-4'>
              <Button variant='outline' className='w-full'>
                <KeyRound className='mr-2 size-4' />
                Change Password
              </Button>

              <Button variant='outline' className='w-full'>
                <LogOut className='mr-2 size-4' />
                Logout
              </Button>
            </CardContent>
          </Card>

          {/* Landlord Stats */}
          {profile.role === "LANDLORD" && (
            <Card className='bg-brand-surface'>
              <CardHeader>
                <CardTitle>Landlord Overview</CardTitle>
              </CardHeader>

              <CardContent className='gap-4 grid grid-cols-2'>
                <StatCard label='Properties' value={profile.propertyCount} />
                <StatCard label='Requests' value={profile.requestCount} />
              </CardContent>
            </Card>
          )}

          {/* Tenant Stats */}
          {profile.role === "TENANT" && (
            <Card className='bg-brand-surface'>
              <CardHeader>
                <CardTitle>Tenant Activity</CardTitle>
              </CardHeader>

              <CardContent className='gap-4 grid grid-cols-2'>
                <StatCard label='Requests' value={profile.requestCount} />
                <StatCard label='Favorites' value={profile.favoriteCount} />
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
