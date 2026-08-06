import { AuthAccount } from "./auth";
import { UserRole, UserStatus } from "./enum";
import { Location } from "./location";
import { ProfileWithLocationsSocialProfiles } from "./profile";
import { AccountSession } from "./session";
import { SocialProfile } from "./social-profile";

export interface User {
  id: string;

  name: string;
  email: string;

  phone: string | null;
  avatar: string | null;

  emailVerified: boolean;

  role: UserRole;
  status: UserStatus;

  landlordRentalRequests: number;
  tenantRentalRequests: number;
  property: number;

  createdAt: string;
  updatedAt: string;
}

export interface UserWithProfile extends User {
  profile: ProfileWithLocationsSocialProfiles;
}

export interface MeResponse extends UserWithProfile {
  accounts: AuthAccount[];
}
