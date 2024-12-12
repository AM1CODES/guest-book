// src/app/page.js
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch comments on load
  useEffect(() => {
    fetchComments();
    // Set up polling to check for new comments every 10 seconds
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      try {
        const response = await fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            comment: comment.trim(),
            timestamp: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          // Clear form
          setName("");
          setComment("");
          // Fetch updated comments
          fetchComments();
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
        alert("Failed to submit comment. Please try again.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] bg-gray-900">
        <img
          src="/hero.jpg"
          alt="Hero Image"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Our Guestbook
            </h1>
            <p className="text-xl md:text-2xl">Share your thoughts with us</p>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      <div className="max-w-7xl mx-auto px-4 py-12">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div className="col-span-full text-center py-8">
              No comments yet. Be the first to share your thoughts!
            </div>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id} className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="font-bold mb-2 break-words">
                    {comment.name}
                  </div>
                  <div className="text-gray-600 break-words whitespace-pre-wrap mb-2 max-h-48 overflow-y-auto">
                    {comment.comment}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    {new Date(comment.timestamp).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
