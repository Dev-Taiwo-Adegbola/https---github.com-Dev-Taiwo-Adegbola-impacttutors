"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const role = formData.get("role") as string;
  const inviteCode = formData.get("inviteCode") as string;
  
  const age = formData.get("age") ? parseInt(formData.get("age") as string) : null;
  const gradeLevel = formData.get("gradeLevel") as string;
  const curriculum = formData.get("curriculum") as string;
  const phone = formData.get("phone") as string;

  try {
    await api.post("/auth/register/", {
      email,
      password,
      full_name: fullName,
      role,
      invite_code: inviteCode,
      age,
      grade_level: gradeLevel,
      curriculum,
      phone
    });
  } catch (error: any) {
    return { error: error.message };
  }
  
  // After registration, log them in to get tokens
  return await signIn(formData);
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  let redirectPath: string | null = null;

  try {
    const tokens: any = await api.post("/token/", {
      username: email,
      password,
    });

    const cookieStore = await cookies();
    cookieStore.set("access_token", tokens.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
    });
    cookieStore.set("refresh_token", tokens.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Fetch user profile to determine role and redirect
    const profile: any = await api.get("/profiles/me/", {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    });

    if (profile) {
      redirectPath = `/dashboard/${profile.role}`;
    } else {
      redirectPath = "/dashboard";
    }
  } catch (error: any) {
    return { error: error.message };
  }

  if (redirectPath) {
    revalidatePath("/", "layout");
    redirect(redirectPath);
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  redirect("/login");
}
