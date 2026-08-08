"use client";

import { Mail, Pencil } from "lucide-react";
import { useState } from "react";

import type { MeResponse } from "@/types/user";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Heading2, Muted } from "@/components/typography/typography";

import { ReusableDialog } from "../dialog/dialog";
import UpdateAccount from "./update-account";
import ProfileSocial from "./social-profiles";

type Props = {
  user: MeResponse;
};

export default function ProfileHero({ user }: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const initials = user.name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleOpen() {
    setIsEdit(true);
  }

  function handleClose() {
    setIsEdit(false);
  }
  return (
    <>
      <Card className='pt-0 overflow-hidden glass-card'>
        <div className='h-36 brand-gradient' />
        <CardContent className='relative space-y-5 p-6'>
          <div className='flex md:flex-row flex-col md:items-end gap-4 -mt-20'>
            <Avatar className='shadow-xl border-4 border-background size-32'>
              <AvatarImage src={user.avatar ?? ""} alt={user.name} />

              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className='flex-1 space-y-3'>
              <div className='flex flex-wrap items-center gap-3'>
                <Heading2 className='pb-0 border-0'>{user.name}</Heading2>

                <Badge className='bg-brand-success text-brand-success-foreground'>
                  {user.role}
                </Badge>
              </div>

              <div className='flex items-center gap-2'>
                <Mail className='size-4 text-brand' />
                <Muted>{user.email}</Muted>
              </div>
            </div>

            <Button onClick={handleOpen} variant='brand'>
              <Pencil className='mr-2 size-4' />
              Edit Account
            </Button>
          </div>

          {/* Social profiles */}
          <ProfileSocial user={user} />
        </CardContent>
      </Card>

      {/* Edit account */}
      <ReusableDialog isOpen={isEdit} onOpenChange={handleClose}>
        <UpdateAccount user={user} handleClose={handleClose} />
      </ReusableDialog>
    </>
  );
}
