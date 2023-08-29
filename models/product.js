import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  availability: { type: Boolean, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to the Category model
  imageurls: [
    {type: String},
  ],
  approved: {type: Boolean, default: false},
});

export default mongoose.model("Product", productSchema);
