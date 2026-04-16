import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentID: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "usd",
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      required: true,
    },
    stripeSessionId: {
      type: String,
    },

    stripePaymentIntentId: {
      type: String,
    },

    customerEmail: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
