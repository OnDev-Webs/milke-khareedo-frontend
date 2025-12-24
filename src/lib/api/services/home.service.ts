import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";
import type { ApiResponse } from "../types";

/**
 * Property type definition
 * Update this based on your actual API response
 */
export interface Property {
  id: string | number;
  title: string;
  subtitle?: string;
  image: string;
  groupSize?: string;
  opening?: string;
  targetPrice?: number;
  developerPrice?: number;
  offer?: string;
  // Add more fields as needed
}

/**
 * Home API Service
 * All home-related API calls
 */
export const homeService = {
  /**
   * Get top properties
   * Example: GET /api/home/getTopProperty
   */
  getTopProperty: async (): Promise<ApiResponse<Property[]>> => {
    return apiClient.get<Property[]>(API_ENDPOINTS.HOME.GET_TOP_PROPERTY);
  },

  // Add more home-related API methods here
  // getFeaturedProperties: async (): Promise<ApiResponse<Property[]>> => {
  //   return apiClient.get<Property[]>(API_ENDPOINTS.HOME.GET_FEATURED_PROPERTIES);
  // },
};
