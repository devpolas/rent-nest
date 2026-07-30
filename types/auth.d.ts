import { AuthProvider } from "./enum";

export interface LoginResponse {
  accessToken: string;
}

export interface IAuthAccount {
  id: string;

  userId: string;

  provider: AuthProvider;
  providerAccountId: string | null;

  accessTokenHash: string | null;
  refreshTokenHash: string | null;
  tokenExpiresAt: string | null;

  emailVerificationToken: string | null;
  emailVerificationExpires: string | null;

  passwordResetToken: string | null;
  passwordResetExpires: string | null;

  createdAt: string;
  updatedAt: string;
}
