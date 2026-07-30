import { SocialPlatform } from "./enums";

export interface SocialProfile {
  id: string;

  platform: SocialPlatform;
  url: string;

  profileId: string;

  createdAt: string;
  updatedAt: string;
}
