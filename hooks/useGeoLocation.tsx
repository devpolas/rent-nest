import { useState } from "react";
import config from "@/config/client/client";

interface Coordinates {
  lat: number;
  lng: number;
}

interface GeoAddress {
  countryName?: string;
  principalSubdivision?: string;
  district?: string;
  city?: string;
  locality?: string;
  postcode?: string;
  formattedAddress?: string;
}

export interface PropertyLocationPayload {
  latitude: string;
  longitude: string;

  country: string;
  division: string;
  district: string;
  city: string;
  village: string;

  postalCode: string;
  addressLine?: string;
}

function getGeoErrorMessage(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location permission denied";
    case error.POSITION_UNAVAILABLE:
      return "Unable to determine your location";
    case error.TIMEOUT:
      return "Location request timed out";
    default:
      return "Failed to get your location";
  }
}

function mapGeoAddressToLocation(
  coordinates: Coordinates,
  address: GeoAddress,
): PropertyLocationPayload {
  return {
    latitude: coordinates.lat.toString(),
    longitude: coordinates.lng.toString(),

    country: address.countryName ?? "",
    division: address.principalSubdivision ?? "",
    district: address.district ?? "",
    city: address.city ?? "",
    village: address.locality ?? "",
    postalCode: address.postcode ?? "",
    addressLine: address.formattedAddress,
  };
}

export function useGeoLocation(defaultLocation: Coordinates | null = null) {
  const [isLoading, setIsLoading] = useState(false);

  const [coordinates, setCoordinates] = useState<Coordinates | null>(
    defaultLocation,
  );

  const [address, setAddress] = useState<GeoAddress | null>(null);

  const [locationPayload, setLocationPayload] =
    useState<PropertyLocationPayload | null>(null);

  const [error, setError] = useState<string | null>(null);

  const getPosition = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCoordinates(coords);

        try {
          const params = new URLSearchParams({
            latitude: coords.lat.toString(),
            longitude: coords.lng.toString(),
            localityLanguage: "en",
          });

          const response = await fetch(
            `${config.location_api_base_url}?${params.toString()}`,
          );

          if (!response.ok) {
            throw new Error("Failed to fetch address");
          }

          const geoAddress: GeoAddress = await response.json();

          setAddress(geoAddress);

          const payload = mapGeoAddressToLocation(coords, geoAddress);

          setLocationPayload(payload);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to reverse geocode location",
          );
        } finally {
          setIsLoading(false);
        }
      },

      (error) => {
        setError(getGeoErrorMessage(error));
        setIsLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return {
    isLoading,

    coordinates,
    address,

    // Ready for createLocation action
    locationPayload,

    error,

    getPosition,
  };
}
