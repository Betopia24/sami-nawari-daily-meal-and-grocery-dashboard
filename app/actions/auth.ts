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
    // ---------------------------------------------------------
    // TODO: Connect to your actual backend API here
    // Example:
    // const response = await fetch("https://api.example.com/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });
    // const result = await response.json();
    // if (!response.ok) throw new Error(result.message || "Failed to sign in");
    // const token = result.token;
    // ---------------------------------------------------------

    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock token for demonstration
    const token = "mock_jwt_token_12345";

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // If remember me is checked, token lasts for 30 days, else session cookie
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined,
    });

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
  cookieStore.delete("auth_token");
  redirect("/sign-in");
}
