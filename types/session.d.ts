export interface AccountSession {
  id: string;

  userId: string;
  refreshTokenHash: string;

  browser: string | null;
  operatingSystem: string | null;
  deviceType: string | null;

  ipAddress: string | null;
  userAgent: string | null;

  isRevoked: boolean;
  revokedAt: Date | null;

  expiresAt: Date;
  lastUsedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}
