import express from "express";
import createHttpError from "http-errors";
import tableModel from "../models/tableModel.js";
import { tokenVerification } from "../middleware/tokenVerification.js";
import mongoose from "mongoose";

const router = express.Router();
router.use(tokenVerification);

//////////////
router.post("/addtable", async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;
    if (!tableNo) {
      const error = createHttpError(400, "Please provide table No!");
      return next(error);
    }
    if (!seats) {
      const error = createHttpError(400, "Please provide Number of seats!");
      return next(error);
    }
    const isTablePresent = await tableModel.findOne({ tableNo });

    if (isTablePresent) {
      const error = createHttpError(400, "Table already exists");
      return next(error);
    }
    const newTable = new tableModel({ tableNo, seats });
    await newTable.save();
    res
      .status(201)
      .json({ success: true, message: "Table Added", data: newTable });
  } catch (error) {
    next(error);
  }
});

router.get("/getall", async (req, res, next) => {
  try {
    const tables = await tableModel.find().populate({
      path: "currentOrder",
      select: "customerDetails",
    });
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
});

//////////////////////Update order///////////////

router.put("/update/:id", async (req, res, next) => {
  try {
    const { status, orderId } = req.body;

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, "Invalid Id");
      return next(error);
    }
    const table = await tableModel.findByIdAndUpdate(
      id,
      { status, currentOrder: orderId },
      { new: true },
    );
    if (!table) {
      const error = createHttpError(404, "Table not found!");
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: "Table status updated", data: table });
  } catch (error) {
    next(error);
  }
});

export default router;
