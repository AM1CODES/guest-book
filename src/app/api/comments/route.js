// src/app/api/comments/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const comments = await Comment.find().sort({ timestamp: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const comment = await Comment.create(data);
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 },
    );
  }
}
