import express from "express";
import createHttpError from "http-errors";
import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();
import { tokenVerification } from "../middleware/tokenVerification.js";

const accessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });
};

router.post("/register", async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;
    if (!name || !phone || !email || !password) {
      const error = createHttpError(400, "All fields are reuired*");
      return next(error);
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const error = createHttpError(400, "User already exist!");
      return next(error);
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong Password with at least 8 characters",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = userModel({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    const token = accessToken(newUser._id);

    res
      .status(201)
      .json({ success: true, token, message: "User registered successfully" });
    toast.success("Registered successfully! Welcome to Flave--POS.");
  } catch (error) {
    next(error);
  }
});

//////////////Login//////////////////////////

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await userModel.findOne({ email });
    if (!email || !password) {
      const error = createHttpError(400, "All fields are reuired*");
      return next(error);
    }

    if (!isUserExist) {
      const error = createHttpError(400, "User does not exixts");
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isMatch) {
      const error = createHttpError(400, "Invalid email or password*");
      return next(error);
    }
    const token = accessToken(isUserExist._id);

    res.status(200).json({ success: true, token, message: "Login successful" });
  } catch (error) {
    next(error);
  }
});

////////////////Get user data////////////////////////

router.get("/getUser", tokenVerification, async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    next(error);
  }
});

export default router;
