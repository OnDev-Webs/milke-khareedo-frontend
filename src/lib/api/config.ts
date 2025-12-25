/**
 * API Configuration
 * Configure base URL and default settings for API calls
 */

export const API_CONFIG = {
  // Base URL for API - change this to your backend URL
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api",

  // Default timeout for requests (in milliseconds)
  TIMEOUT: 30000,

  // Default headers
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Google Maps API Key
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
} as const;

/**
 * API Endpoints
 * Centralized endpoint definitions
 */
export const API_ENDPOINTS = {
  // Home endpoints
  HOME: {
    GET_TOP_PROPERTY: "/home/getTopProperty",
    GET_LOCATIONS: "/home/locations",
    POST_EMI_CALCULATOR: "/home/emi-calculator",
    GET_PROPERTIES: "/home/properties",
    POST_COMPARE: "/home/compare",
  },

  // Add more endpoint groups as needed
  // PROPERTY: {
  //   GET_ALL: "/property/getAll",
  //   GET_BY_ID: "/property/getById",
  // },

  // USER: {
  //   GET_PROFILE: "/user/profile",
  //   UPDATE_PROFILE: "/user/profile",
  // },
} as const;
