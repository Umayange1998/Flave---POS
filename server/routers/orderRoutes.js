import express from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { tokenVerification } from "../middleware/tokenVerification.js";
import orderModel from "../models/orderModel.js";

const router = express.Router();

router.post("/addorder", async (req, res, next) => {
  try {
    const order = new orderModel(req.body);
    await order.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
});

//////////////////////get order///////////////
router.get("/getorder/:id", async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
});

////////////////Get All Orders//////////////////////

router.get("/getall", async (req, res, next) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
});

//////////////////////Update order///////////////

router.put("/update/:id", async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true },
    );
    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: "Order status updated", data: order });
  } catch (error) {
    next(error);
  }
});

export default router;
