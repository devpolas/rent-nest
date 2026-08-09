export interface PropertyImage {
  id: string;
  propertyId: string;

  url: string;
  publicId: string;

  isThumbnail: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyImageInput {
  url: string;
  publicId: string;
}
