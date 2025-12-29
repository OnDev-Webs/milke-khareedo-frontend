import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";
import type { ApiResponse } from "../types";

export type ViewedPropertyApi = {
    _id: string;
    lastViewedAt: string;
    propertyId: {
        _id: string;
        projectName: string;
        location: string;
        possessionDate?: string;

        minGroupMembers?: number;
        openingLeft?: number;

        developerPrice?: number;
        discountPercentage?: string;

        images?: { url: string; isCover: boolean }[];
    };
};


export const userDashboardService = {
    getVisitedProperties: (): Promise<ApiResponse<ViewedPropertyApi[]>> =>
        apiClient.get<ViewedPropertyApi[]>(
            API_ENDPOINTS.USER_DASHBOARD.VISITED_PROPERTIES
        ),

    getViewedProperties: (): Promise<ApiResponse<ViewedPropertyApi[]>> =>
        apiClient.get<ViewedPropertyApi[]>(
            API_ENDPOINTS.USER_DASHBOARD.VIEWED_PROPERTIES
        ),


    getFavoriteProperties: (): Promise<ApiResponse<ViewedPropertyApi[]>> =>
        apiClient.get<ViewedPropertyApi[]>(
            API_ENDPOINTS.USER_DASHBOARD.FAVORITE_PROPERTIES
        ),



    getDashboard: (): Promise<ApiResponse<any>> => {
        return apiClient.get(API_ENDPOINTS.USER_DASHBOARD.DASHBOARD);
    },

    getSearchHistory: () =>
        apiClient.get(API_ENDPOINTS.USER_DASHBOARD.SEARCH_HISTORY),

    getPreferences: () =>
        apiClient.get(API_ENDPOINTS.USER_DASHBOARD.GET_PREFERENCES),

    savePreferences: (data: any) =>
        apiClient.post(API_ENDPOINTS.USER_DASHBOARD.SAVE_PREFERENCES, data),

    updateProfile: (data: FormData) =>
        apiClient.put(API_ENDPOINTS.USER_DASHBOARD.UPDATE_PROFILE, data, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
};
