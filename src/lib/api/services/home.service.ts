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
  images?: string[]; // Array of images for slider
  lastDayToJoin: string;
  groupSize: number;
  groupSizeFormatted: string;
  openingLeft: number;
  openingFormatted: string;
  targetPrice: PropertyPrice;
  developerPrice: PropertyPrice;
  discount: PropertyDiscount | null;
  offerPrice: PropertyPrice | null;
  discountPercentage: string;
  configurations: string[];
  configurationsFormatted: string;
  possessionStatus: string;
  developer: string;
  leadCount: number;
  reraId: string;
  description: string;
  relationshipManager: string;
  isFavorite?: boolean; // Favorite status from API
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
  results: Property[];
  data: Property[];
  pagination: PaginationInfo;
  filters: FiltersInfo;
}

export interface PropertyDetailsResponse {
  data: {
    property: Property;
    similarProperties: Property[];
  };
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
 * EMI Calculator API types
 */
export interface EMIAmount {
  value: number;
  formatted: string;
  display?: string;
}

export interface EMIBreakdown {
  principal: number;
  interest: number;
  principalPercentage: number;
  interestPercentage: number;
}

export interface EMIInput {
  loanAmount: number;
  rateOfInterest: number;
  loanTenure: number;
  currency: string;
}

export interface EMICalculatorResponse {
  monthlyEMI: EMIAmount;
  principalAmount: EMIAmount;
  totalInterest: EMIAmount;
  totalAmountPayable: EMIAmount;
  emiBreakdown: EMIBreakdown;
  input: EMIInput;
  totalPrincipalPaid: EMIAmount;
  disclaimer: string;
}

export interface EMICalculatorRequest {
  loanAmount: string;
  rateOfInterest: number;
  loanTenure: number;
}

/**
 * Compare API types
 */
export interface CompareRequest {
  propertyIds: string[];
}

export interface BudgetRange {
  min: number;
  max: number;
  formatted: string;
}

export interface AreaRange {
  min: number;
  max: number;
  formatted: string;
}

export interface CompareProperty {
  id: string;
  projectId: string;
  projectName: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  pinLabel?: string; // Label for map pin (A, B, C, D, etc.)
  mainImage: string | null;
  developer: string;
  developerId?: string;
  developerPrice: string | number;
  offerPrice: number | null;
  discountPercentage: string;
  budget: BudgetRange;
  area: AreaRange;
  configurations: string[];
  configurationsFormatted: string;
  propertyType: string;
  possessionStatus: string;
  possessionDate?: string;
  possessionDateFormatted?: string;
  isFavorite?: boolean; // Favorite status from API
  floorPlans?: Array<{
    image: string;
    unitType: string;
    carpetArea: string;
    price: number;
    availabilityStatus: string;
  }>;
  relationshipManager?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  } | null;
  [key: string]: unknown; // For additional comparison fields
}

export interface CompareResponse {
  properties: CompareProperty[];
  comparison: Record<string, unknown>; // Comparison data structure
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
   * Get property by ID
   * Example: GET /api/home/getPropertyById?id=property_id
   */
  getPropertyById: async (
    id: string,
  ): Promise<ApiResponse<PropertyDetailsResponse>> => {
    return apiClient.get<PropertyDetailsResponse>(
      `${API_ENDPOINTS.HOME.GET_PROPERTY_BY_ID}/${id}`,
    );
  },

  /**
   * Get locations
   * Example: GET /api/home/locations
   */
  getLocations: async (): Promise<ApiResponse<LocationsResponse>> => {
    return apiClient.get<LocationsResponse>(API_ENDPOINTS.HOME.GET_LOCATIONS);
  },

  /**
   * Calculate EMI
   * Example: POST /api/home/emi-calculator
   */
  calculateEMI: async (
    data: EMICalculatorRequest,
  ): Promise<ApiResponse<EMICalculatorResponse>> => {
    return apiClient.post<EMICalculatorResponse>(
      API_ENDPOINTS.HOME.POST_EMI_CALCULATOR,
      data,
    );
  },

  /**
   * Get properties for comparison
   * Example: GET /api/home/properties?latitude=28.4089&longitude=77.0418&page=1&limit=3&search=property_name
   */
  getProperties: async (params?: {
    latitude?: number;
    longitude?: number;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<TopPropertiesResponse>> => {
    const queryParams = new URLSearchParams();

    if (params?.latitude !== undefined) {
      queryParams.append("latitude", params.latitude.toString());
    }
    if (params?.longitude !== undefined) {
      queryParams.append("longitude", params.longitude.toString());
    }
    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }
    if (params?.search) {
      queryParams.append("search", params.search);
    }

    const endpoint = queryParams.toString()
      ? `${API_ENDPOINTS.HOME.GET_PROPERTIES}?${queryParams.toString()}`
      : API_ENDPOINTS.HOME.GET_PROPERTIES;

    return apiClient.get<TopPropertiesResponse>(endpoint);
  },

  /**
   * Compare properties
   * Example: POST /api/home/compare
   */
  compareProperties: async (
    data: CompareRequest,
  ): Promise<ApiResponse<CompareResponse>> => {
    return apiClient.post<CompareResponse>(
      API_ENDPOINTS.HOME.POST_COMPARE,
      data,
    );
  },

  /**
   * Add/Remove property from favorites
   * POST /api/home/property/favorite
   */
  toggleFavorite: async (
    propertyId: string,
  ): Promise<ApiResponse<{ message: string; isFavorite: boolean }>> => {
    return apiClient.post<{ message: string; isFavorite: boolean }>(
      API_ENDPOINTS.HOME.POST_FAVORITE,
      { propertyId },
    );
  },

  /**
   * Book a visit
   * POST /api/home/property/visit
   */
  bookVisit: async (data: {
    propertyId: string;
    visitDate: string;
    visitTime: string;
  }): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post<{ message: string }>(
      API_ENDPOINTS.HOME.POST_VISIT,
      data,
    );
  },

  /**
   * Search properties
   * GET /api/home/search-properties
   */
  searchProperties: async (params: {
    city?: string;
    searchText?: string;
    priceMin?: string;
    priceMax?: string;
    bhk?: string;
    projectStatus?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<TopPropertiesResponse>> => {
    const queryParams = new URLSearchParams();

    if (params.city) queryParams.append("city", params.city);
    if (params.searchText) queryParams.append("searchText", params.searchText);
    if (params.priceMin) queryParams.append("priceMin", params.priceMin);
    if (params.priceMax) queryParams.append("priceMax", params.priceMax);
    if (params.bhk) queryParams.append("bhk", params.bhk);
    if (params.projectStatus)
      queryParams.append("projectStatus", params.projectStatus);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());

    const endpoint = queryParams.toString()
      ? `${API_ENDPOINTS.HOME.SEARCH_PROPERTIES}?${queryParams.toString()}`
      : API_ENDPOINTS.HOME.SEARCH_PROPERTIES;

    return apiClient.get<TopPropertiesResponse>(endpoint);
  },
};
