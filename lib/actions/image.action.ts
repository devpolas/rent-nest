"use client";

import axios from "axios";

type ImageUploadResponse = {
  url: string;
  publicId: string;
};

type UploadResponse = {
  images: ImageUploadResponse[];
};

const uploadImages = async (images: File[]): Promise<ImageUploadResponse[]> => {
  if (images.length === 0) {
    throw new Error("No images selected.");
  }

  const formData = new FormData();

  for (const image of images) {
    formData.append("images", image, image.name);
  }

  try {
    const response = await axios.post<{ data: UploadResponse }>(
      `${process.env.NEXT_PUBLIC_API}/images/upload`,
      formData,
    );

    const uploadedImages = response.data.data?.images;

    if (!uploadedImages?.length) {
      throw new Error("Image upload failed.");
    }

    return uploadedImages;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Image upload failed.";

      console.error("Image upload failed:", {
        status: error.response?.status,
        message,
        response: error.response?.data,
      });

      throw new Error(message);
    }

    throw error;
  }
};

export const uploadImageToBackend = async ({
  image,
}: {
  image: File;
}): Promise<ImageUploadResponse> => {
  const [uploadedImage] = await uploadImages([image]);

  if (!uploadedImage) {
    throw new Error("Image upload failed.");
  }

  return uploadedImage;
};

export const uploadImagesToBackend = async ({
  images,
}: {
  images: File[];
}): Promise<ImageUploadResponse[]> => {
  return uploadImages(images);
};
