import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import conf from "../../../conf/conf.js";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    idNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },
    bio: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },
    refreshToken: {
      type: String,
    },
    approved: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate access token method
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      idNumber: this.idNumber,
      email: this.email,
      name: this.name,
      phoneNumber: this.phoneNumber,
      userType: "TA",
    },
    // conf.accessTokenSecret,
    // console.log("Access token secret", process.env.ACCESS_TOKEN_SECRET),
    // console.log("Access token expiry", process.env.ACCESS_TOKEN_EXPIRY),
    process.env.ACCESS_TOKEN_SECRET,
    // { expiresIn:process.env.ACCESS_TOKEN_EXPIRY }
    { expiresIn: "1d" }
  );
};

// Generate refresh token method
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userType: "TA",
    },
    // conf.accessTokenSecret,
    process.env.REFRESH_TOKEN_SECRET,
    // { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    { expiresIn: "7d" }
  );
};

const User = mongoose.model("Ta", userSchema);

export default User;
