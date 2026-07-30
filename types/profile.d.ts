export interface Profile {
  id: string;

  profileImage: string | null;
  bio: string | null;
  birthdate: string | null;

  userId: string;

  createdAt: string;
  updatedAt: string;
}
