import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import conf from "../../../conf/conf.js";

const facultySchema = new mongoose.Schema({
  idNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true, trim: true },
});

// Hash password before saving faculty member
facultySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to generate access token
facultySchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      idNumber: this.idNumber,
      email: this.email,
      name: this.name,
      phoneNumber: this.phoneNumber,
    },
    conf.accessTokenSecret,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Method to generate refresh token
facultySchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    conf.refreshTokenSecret,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// Method to verify password
facultySchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;