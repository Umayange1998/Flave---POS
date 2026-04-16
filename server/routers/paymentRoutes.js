import { tokenVerification } from "../middleware/tokenVerification.js";
import PaymentModel from "../models/paymentModel.js";
import OrderModel from "../models/orderModel.js";
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const CLIENT_URL = process.env.FRONTEND_URL;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log("❌ Webhook signature failed");
      return res.sendStatus(400);
    }

    // ✅ Payment success
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status !== "paid") return;

      const payment = await PaymentModel.findOne({
        stripeSessionId: session.id,
      });

      if (!payment) {
        console.log("⚠️ Payment already deleted (probably cancelled)");
        return;
      }

      await PaymentModel.findByIdAndUpdate(payment._id, {
        status: "paid",
        stripePaymentIntentId: session.payment_intent || null,
        paidAt: new Date(),
      });
    }
    if (event.type === "checkout.session.expired") {
      const session = event.data.object;

      const payment = await PaymentModel.findOne({
        stripeSessionId: session.id,
      });

      if (payment) {
        await OrderModel.findByIdAndDelete(payment.orderId);
        await PaymentModel.findByIdAndDelete(payment._id);
        console.log("❌ Payment expired → Order & Payment deleted");
      }
    }
    if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object;

      const payment = await PaymentModel.findOne({
        stripePaymentIntentId: intent.id,
      });

      if (payment) {
        await OrderModel.findByIdAndDelete(payment.orderId);
        await PaymentModel.findByIdAndDelete(payment._id);
        console.log("❌ Payment failed → Order & Payment deleted");
      }
    }

    res.sendStatus(200);
  },
);

// router.use(tokenVerification);

router.post("/place", async (req, res, next) => {
  try {
    const { orderId, amount, customerEmail } = req.body;

    const line_items = [
      {
        price_data: {
          currency: "usd", // change if needed
          product_data: {
            name: "POS Order Payment",
          },
          unit_amount: amount * 100, // convert to cents
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      customer_email: customerEmail,
      success_url: `${CLIENT_URL}/verify-payment?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
      cancel_url: `${CLIENT_URL}/verify-payment?success=false&orderId=${orderId}`,
    });
    const newPayment = new PaymentModel({
      paymentID: `PAY-${Date.now()}`,
      orderId,
      amount: amount * 100,
      currency: "usd",
      status: "pending",
      paymentMethod: "online",
      stripeSessionId: session.id,
      customerEmail,
    });
    await newPayment.save();

    res.json({
      success: true,
      sessionUrl: session.url,
      paymentId: newPayment._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/status/:orderId", async (req, res) => {
  const { orderId } = req.params;

  const payment = await PaymentModel.findOne({ orderId }).sort({
    createdAt: -1,
  });

  return res.json({
    success: true,
    status: payment?.status || "pending",
  });
});

router.get("/verify-session/:sessionId", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.params.sessionId,
    );

    if (session.payment_status === "paid") {
      await PaymentModel.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          status: "paid",
          paidAt: new Date(),
        },
      );
    }

    res.json({
      success: true,
      status: session.payment_status,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/cancel/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const payment = await PaymentModel.findOne({ orderId });

    if (payment && payment.status !== "paid") {
      await PaymentModel.findByIdAndDelete(payment._id);
      await OrderModel.findByIdAndDelete(orderId);
      console.log("❌ Cancelled → deleted");
    } else {
      console.log("⚠️ Attempted delete on paid order ignored");
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
export default router;
