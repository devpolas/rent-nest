import { UserRole, UserStatus } from "./enum";

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
