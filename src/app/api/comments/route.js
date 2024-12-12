// src/app/api/comments/route.js
import Comment from "../../../../models/Comment";
import { connectToDatabase } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const comments = await Comment.find({}).sort({ timestamp: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.name || !body.comment) {
      return NextResponse.json(
        { error: "Name and comment are required" },
        { status: 400 },
      );
    }

    const comment = new Comment({
      name: body.name,
      comment: body.comment,
      timestamp: new Date(),
    });

    const savedComment = await comment.save();
    return NextResponse.json(savedComment);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 },
    );
  }
}
