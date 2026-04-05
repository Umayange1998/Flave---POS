import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  tableNo: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: "Available",
  },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
});

const tableModel = mongoose.model("table", tableSchema);
export default tableModel;
