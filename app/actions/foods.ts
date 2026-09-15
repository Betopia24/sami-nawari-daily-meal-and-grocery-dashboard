"use server";

import { cookies } from "next/headers";

export async function getAdminFoods(params?: { searchTerm?: string; status?: string; page?: number; limit?: number }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const query = new URLSearchParams();
    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    if (params?.status && params.status !== "All") query.append("status", params.status.toUpperCase());
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());

    const url = `${baseUrl}/foods/admin${query.toString() ? `?${query.toString()}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json();

    console.log("===========================================");


    console.log('getAdminFoods', result?.data?.data)


    return result;
  } catch (error) {
    console.error("getAdminFoods error:", error);
    return { success: false, message: "An error occurred", data: null };
  }
}

export async function reviewFoodListing(foodId: string, status: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const response = await fetch(`${baseUrl}/foods/admin/${foodId}/review`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("reviewFoodListing error:", error);
    return { success: false, message: "An error occurred", data: null };
  }
}

export async function toggleFoodVisibility(foodId: string, status: "PUBLISHED" | "HIDDEN") {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const response = await fetch(`${baseUrl}/foods/admin/${foodId}/visibility`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("toggleFoodVisibility error:", error);
    return { success: false, message: "An error occurred", data: null };
  }
}

export async function deleteFoodListing(foodId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const response = await fetch(`${baseUrl}/foods/admin/${foodId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("deleteFoodListing error:", error);
    return { success: false, message: "An error occurred", data: null };
  }
}
