import { AuthAccount } from "./auth";
import { UserRole, UserStatus } from "./enum";
import { Profile } from "./profile";
import { AccountSession } from "./session";

export interface User {
  id: string;

  name: string;
  email: string;

  phone: string | null;
  avatar: string | null;

  emailVerified: boolean;

  role: UserRole;
  status: UserStatus;

  createdAt: string;
  updatedAt: string;
}

export interface UserResponse extends User {
  profile: Profile | null;
}

export interface UserWithSessionsResponse extends UserResponse {
  sessions: AccountSession[];
}

export interface MeResponse extends UserWithSessionsResponse {
  accounts: AuthAccount[];
}
