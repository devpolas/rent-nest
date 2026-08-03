import { Location } from "./location";
import { SocialProfile } from "./social-profile";

export interface Profile {
  id: string;

  profileImage: string | null;
  bio: string | null;
  birthdate: string | null;

  userId: string;

  createdAt: string;
  updatedAt: string;
}

export interface ProfileWithLocationsSocialProfiles extends Profile {
  locations: Location[]
  socialProfiles:SocialProfile[]
}
