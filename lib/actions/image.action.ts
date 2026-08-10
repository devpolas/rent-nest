"use client";

import axiosClientInstance from "../axios/axios-client";

type ImageUploadResponse = {
  url: string;
  publicId: string;
};

type UploadResponse = {
  images: ImageUploadResponse[];
};

const uploadImages = async (images: File[]): Promise<ImageUploadResponse[]> => {
  console.log(images);
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image);
  });

  const { data } = await axiosClientInstance.post<{
    data: UploadResponse;
  }>("/images/upload", formData, {});

  if (!data.data.images?.length) {
    throw new Error("Image upload failed");
  }

  return data.data.images;
};

export const uploadImageToBackend = async ({ image }: { image: File }) => {
  const result = await uploadImages([image]);

  return result[0];
};

export const uploadImagesToBackend = async ({ images }: { images: File[] }) => {
  return uploadImages(images);
};
