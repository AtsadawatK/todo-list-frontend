import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://todo-list-backend-tau.vercel.app/tasks",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
