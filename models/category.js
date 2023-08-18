import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    // Add other fields as needed
  });

export default mongoose.model("Category", categorySchema);