import axios from "axios";

const uploadSingleImage = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "rent_nest");

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData,
  );

  if (!data?.secure_url) {
    throw new Error("Image upload failed");
  }

  return data.secure_url;
};

export const uploadImageToCloudinary = async ({ image }: { image: File }) => {
  return uploadSingleImage(image);
};

export const uploadImagesToCloudinary = async (images: { image: File }[]) => {
  const urls = await Promise.all(
    images.map(async ({ image }) => ({
      url: await uploadSingleImage(image),
    })),
  );

  return urls;
};
