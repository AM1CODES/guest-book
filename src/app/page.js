// src/app/page.js
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  // State for form inputs and comments
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          name: name.trim(),
          comment: comment.trim(),
          timestamp: new Date().toLocaleString(),
        },
      ]);
      // Reset form
      setName("");
      setComment("");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      {/* Hero Image Section */}
      <div className="w-full h-96 bg-gray-200 mb-8 rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Comment Form */}
      <Card className="mb-8 max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                maxLength={25}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                {name.length}/25 characters
              </div>
            </div>
            <div>
              <Textarea
                placeholder="Share your thoughts..."
                maxLength={5000}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-32"
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                {comment.length}/5000 characters
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!name.trim() || !comment.trim()}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="font-bold mb-2 break-words">{comment.name}</div>
              <div className="text-gray-600 break-words whitespace-pre-wrap mb-2 max-h-48 overflow-y-auto">
                {comment.comment}
              </div>
              <div className="text-sm text-gray-400 mt-2">
                {comment.timestamp}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
