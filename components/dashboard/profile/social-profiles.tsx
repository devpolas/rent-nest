"use client";

import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import ActionButton from "@/components/button/action-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { SocialProfile } from "@/types/social-profile";
import type { MeResponse } from "@/types/user";

import SocialPlatformIcon from "./social-platform-icon";
import { getSocialPlatformLabel } from "./social-platform-label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SocialPlatform } from "@/types/enum";
import { useCreateSocialProfile, useUpdateSocialProfile } from "@/hooks";
import {
  SocialProfileCreateInput,
  SocialProfileCreateSchema,
} from "@/schemas/user.schema";
import { FormRhfSelect } from "@/components/rhf-input/form-rfh-select";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";

type Props = {
  user: MeResponse;
};

const SOCIAL_PLATFORM_OPTIONS = [
  { label: "GitHub", value: "GITHUB" },
  { label: "LinkedIn", value: "LINKEDIN" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "X", value: "TWITTER" },
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "YouTube", value: "YOUTUBE" },
  { label: "Discord", value: "DISCORD" },
  { label: "Telegram", value: "TELEGRAM" },
  { label: "WhatsApp", value: "WHATSAPP" },
  { label: "Website", value: "WEBSITE" },
] satisfies {
  label: string;
  value: SocialPlatform;
}[];

export default function ProfileSocial({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialProfile | null>(
    null,
  );

  const socialProfiles = user.profile?.socialProfile ?? [];

  const { mutateAsync: createSocialProfile, isPending: isCreating } =
    useCreateSocialProfile();

  const { mutateAsync: updateSocialProfile, isPending: isUpdating } =
    useUpdateSocialProfile();

  const isPending = isCreating || isUpdating;

  const form = useForm<SocialProfileCreateInput>({
    resolver: zodResolver(SocialProfileCreateSchema),
    defaultValues: {
      platform: "GITHUB",
      url: "",
    },
  });

  function handleAdd() {
    setEditingSocial(null);

    form.reset({
      platform: "GITHUB",
      url: "",
    });

    setIsOpen(true);
  }

  function handleEdit(social: SocialProfile) {
    setEditingSocial(social);

    form.reset({
      platform: social.platform,
      url: social.url,
    });

    setIsOpen(true);
  }

  function handleClose(open: boolean) {
    setIsOpen(open);

    if (!open) {
      setEditingSocial(null);

      form.reset({
        platform: "GITHUB",
        url: "",
      });
    }
  }

  async function onSubmit(data: SocialProfileCreateInput) {
    try {
      if (editingSocial) {
        const response = await updateSocialProfile({
          id: editingSocial.id,
          payload: data,
        });

        if (response.success) {
          toast.success(
            response.message ?? "Social profile updated successfully",
          );

          handleClose(false);
          return;
        }

        toast.error(response.message ?? "Failed to update social profile");

        return;
      }

      const response = await createSocialProfile({
        payload: data,
      });

      if (response.success) {
        toast.success(response.message ?? "Social profile added successfully");

        handleClose(false);
        return;
      }

      toast.error(response.message ?? "Failed to add social profile");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <div className='flex flex-wrap items-center gap-2'>
        {socialProfiles.map((social) => (
          <SocialProfileBadge
            key={social.id}
            social={social}
            onEdit={() => handleEdit(social)}
          />
        ))}

        <ActionButton
          type='button'
          variant='outline'
          size='icon'
          className='rounded-full size-8'
          onClick={handleAdd}
        >
          <Plus className='size-4' />
        </ActionButton>
      </div>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSocial ? "Update Social Profile" : "Add Social Profile"}
            </DialogTitle>

            <DialogDescription>
              {editingSocial
                ? "Update your social profile URL."
                : "Add a social profile to your account."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormRhfSelect
              name='platform'
              label='Platform'
              placeholder='Select platform'
              control={form.control}
              options={SOCIAL_PLATFORM_OPTIONS}
            />

            <FormRhfInput
              name='url'
              label='Profile URL'
              placeholder='https://github.com/username'
              control={form.control}
            />

            <div className='flex justify-end'>
              <ActionButton
                type='submit'
                variant='brand'
                disabled={isPending}
                isLoading={isPending}
                loadingText={editingSocial ? "Updating..." : "Adding..."}
              >
                {editingSocial ? "Update Social" : "Add Social"}
              </ActionButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

type SocialProfileBadgeProps = {
  social: SocialProfile;
  onEdit: () => void;
};

function SocialProfileBadge({ social, onEdit }: SocialProfileBadgeProps) {
  const label = getSocialPlatformLabel(social.platform);

  return (
    <div className='group relative'>
      <Link
        href={social.url}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Visit ${label}`}
        title={label}
        className='flex justify-center items-center bg-background/60 hover:bg-brand/10 backdrop-blur-sm border hover:border-brand/40 rounded-full size-10 text-muted-foreground hover:text-brand hover:scale-105 transition-all duration-200'
      >
        <SocialPlatformIcon platform={social.platform} className='size-5' />
      </Link>

      <button
        type='button'
        onClick={onEdit}
        aria-label={`Edit ${label}`}
        title={`Edit ${label}`}
        className='-top-1 -right-1 absolute flex justify-center items-center bg-background opacity-0 group-hover:opacity-100 shadow-sm border rounded-full size-5 text-muted-foreground hover:text-brand transition-opacity hover:cursor-pointer'
      >
        <Pencil className='size-3' />
      </button>
    </div>
  );
}
