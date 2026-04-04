import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const tokenVerification = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = createHttpError(401, "Please provide token");
      return next(error);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      const error = createHttpError(401, "User not exist!");
      return next(error);
    }
    req.user = user;
    next();
  } catch (error) {
    const err = createHttpError(401, "Invalid Token");
    next(err);
  }
};
