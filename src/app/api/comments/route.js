// src/app/api/comments/route.js
import { kv } from "@vercel/kv";

export async function GET() {
  try {
    const comments = await kv.lrange("comments", 0, -1);
    return Response.json(comments.reverse());
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const comment = await request.json();
    comment.id = Date.now().toString();

    await kv.lpush("comments", comment);

    return Response.json({ message: "Comment added successfully" });
  } catch (error) {
    return Response.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
