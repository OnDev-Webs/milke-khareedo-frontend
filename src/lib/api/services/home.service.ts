import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";
import type { ApiResponse } from "../types";

/**
 * Property type definition
 * Based on actual API response
 */
export interface PropertyPrice {
  value: number;
  formatted: string;
}

export interface PropertyDiscount {
  amount: number;
  amountFormatted: string;
  percentage: number;
  percentageFormatted: string;
  message: string;
  displayText: string;
}

export interface Property {
  id: string;
  projectId: string;
  projectName: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  image: string | null;
  lastDayToJoin: string;
  groupSize: number;
  groupSizeFormatted: string;
  openingLeft: number;
  openingFormatted: string;
  targetPrice: PropertyPrice;
  developerPrice: PropertyPrice;
  discount: PropertyDiscount | null;
  offerPrice: string | number | null;
  discountPercentage: string;
  configurations: string[];
  configurationsFormatted: string;
  possessionStatus: string;
  developer: string;
  leadCount: number;
  reraId: string;
  description: string;
  relationshipManager: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface FiltersInfo {
  location: string | null;
  developer: string | null;
  projectName: string | null;
  possessionStatus: string | null;
  unitType: string | null;
}

export interface TopPropertiesResponse {
  data: Property[];
  pagination: PaginationInfo;
  filters: FiltersInfo;
}

/**
 * Locations API Response types
 */
export interface LocationWithCount {
  propertyCount: number;
  location: string;
}

export interface LocationsResponse {
  locations: string[];
  locationsWithCount: LocationWithCount[];
  total: number;
}

/**
 * Home API Service
 * All home-related API calls
 */
export const homeService = {
  /**
   * Get top properties
   * Example: GET /api/home/getTopProperty?limit=6&page=1&location=Surat
   */
  getTopProperty: async (params?: {
    page?: number;
    limit?: number;
    location?: string;
  }): Promise<ApiResponse<TopPropertiesResponse>> => {
    const queryParams = new URLSearchParams();

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }
    if (params?.location) {
      queryParams.append("location", params.location);
    }

    const endpoint = queryParams.toString()
      ? `${API_ENDPOINTS.HOME.GET_TOP_PROPERTY}?${queryParams.toString()}`
      : API_ENDPOINTS.HOME.GET_TOP_PROPERTY;

    return apiClient.get<TopPropertiesResponse>(endpoint);
  },

  /**
   * Get locations
   * Example: GET /api/home/locations
   */
  getLocations: async (): Promise<ApiResponse<LocationsResponse>> => {
    return apiClient.get<LocationsResponse>(API_ENDPOINTS.HOME.GET_LOCATIONS);
  },

  // Add more home-related API methods here
  // getFeaturedProperties: async (): Promise<ApiResponse<Property[]>> => {
  //   return apiClient.get<Property[]>(API_ENDPOINTS.HOME.GET_FEATURED_PROPERTIES);
  // },
};
