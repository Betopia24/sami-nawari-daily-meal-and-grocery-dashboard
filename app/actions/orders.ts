"use server";

import { cookies } from "next/headers";

export async function getAdminOrders(params?: { searchTerm?: string; status?: string; page?: number; limit?: number }) {
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

    const url = `${baseUrl}/orders/admin${query.toString() ? `?${query.toString()}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("getAdminOrders error:", error);
    return { success: false, message: "An error occurred", data: null };
  }
}

export async function getAdminOrderDetails(orderId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const url = `${baseUrl}/orders/admin/${orderId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("getAdminOrderDetails error:", error);
    return { success: false, message: "An error occurred", data: null };
  }
}
