"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";

export async function signInAction(data: SignInInput) {
  // Validate input
  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid input data",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password, rememberMe } = parsed.data;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to sign in");
    }

    const { accessToken, refreshToken } = result.data;

    const cookieStore = await cookies();
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : undefined; // 30 days or session

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
      });
    }

  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred. Please try again.",
    };
  }

  // Redirect on successful login (cannot redirect inside try-catch if redirect throws in Next 14/15)
  redirect("/dashboard");
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/sign-in");
}
