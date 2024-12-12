// src/models/Comment.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 25,
  },
  comment: {
    type: String,
    required: true,
    maxLength: 5000,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
