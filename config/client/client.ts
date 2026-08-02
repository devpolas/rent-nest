"use client";
import type { StringValue } from "ms";

export default {
  app_name: "Rent Nest",
  base_url: process.env.NEXT_PUBLIC_API as StringValue,
  cloudinary_cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  location_api_base_url: process.env
    .NEXT_PUBLIC_LOCATION_API_BASE_URL as StringValue,
};
