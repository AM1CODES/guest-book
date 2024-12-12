// src/models/Comment.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [25, "Name cannot be more than 25 characters"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
    maxLength: [5000, "Comment cannot be more than 5000 characters"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
