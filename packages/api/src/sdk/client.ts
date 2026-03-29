import type { SupabaseClient } from "@supabase/supabase-js";

const API_BASE_URL = "/api";

export const createApiClient = (supabase: SupabaseClient) => {
    const getAuthToken = async (): Promise<string | null> => {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        return session?.access_token || null;
    };

    const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
        const token = await getAuthToken();
        const url = `${API_BASE_URL}${endpoint}`;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (token) {
            (headers as Record<string, string>).Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        // Handle empty responses
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }

        return response.text() as unknown as T;
    };

    return {
        get: <T>(endpoint: string, options?: { params?: Record<string, any> }): Promise<T> => {
            const queryString = options?.params
                ? `?${new URLSearchParams(
                      Object.entries(options.params).reduce(
                          (acc, [key, value]) => {
                              if (value !== undefined && value !== null) {
                                  acc[key] = String(value);
                              }

                              return acc;
                          },
                          {} as Record<string, string>,
                      ),
                  ).toString()}`
                : "";

            return request<T>(`${endpoint}${queryString}`, {
                method: "GET",
            });
        },

        post: <T>(endpoint: string, data?: any): Promise<T> => {
            return request<T>(endpoint, {
                method: "POST",
                body: data ? JSON.stringify(data) : undefined,
            });
        },

        patch: <T>(endpoint: string, data?: any): Promise<T> => {
            return request<T>(endpoint, {
                method: "PATCH",
                body: data ? JSON.stringify(data) : undefined,
            });
        },

        delete: <T>(endpoint: string, data?: any): Promise<T> => {
            return request<T>(endpoint, {
                method: "DELETE",
                body: data ? JSON.stringify(data) : undefined,
            });
        },
    };
};
