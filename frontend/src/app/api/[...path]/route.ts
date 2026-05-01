import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = `/${path.join("/")}/`;
  const url = `${API_BASE_URL}${endpoint}`;
  
  const accessToken = request.cookies.get("access_token")?.value;
  
  try {
    const res = await fetch(url, {
      headers: {
        "Authorization": accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from API" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = `/${path.join("/")}/`;
  const url = `${API_BASE_URL}${endpoint}`;
  
  const accessToken = request.cookies.get("access_token")?.value;
  const body = await request.json().catch(() => ({}));
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from API" }, { status: 500 });
  }
}
