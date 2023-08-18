import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    // Other order details
  });

export default mongoose.model("Order", orderSchema);
