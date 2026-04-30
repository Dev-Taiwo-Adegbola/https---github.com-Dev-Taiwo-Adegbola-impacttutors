"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function submitStudentApplication(formData: FormData) {
  const data = {
    parent_name: formData.get("parentName"),
    student_name: formData.get("studentName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    grade_level: formData.get("gradeLevel"),
    curriculum: formData.get("curriculum"),
    subjects: formData.get("subjects")?.toString().split(",").map(s => s.trim()),
    message: formData.get("message"),
  };

  try {
    await api.post("/student-applications/", data);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function submitTutorApplication(formData: FormData) {
  const data = {
    full_name: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subjects: formData.get("subjects")?.toString().split(",").map(s => s.trim()),
    experience: formData.get("experience"),
  };

  try {
    await api.post("/tutor-applications/", data);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
