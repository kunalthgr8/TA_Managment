import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    idNumber: { 
      type: String, 
      required: true,
      unique: true,
      trim:true,
      lowercase:true,
    },
    name: { 
      type: String, 
      required: true,
      trim:true,
      lowercase:true,
      index:true
    },
    email: { 
      type: String, 
      required: true,
      unique: true,
      trim:true,
      lowercase:true,
    },
    password: { 
      type: String, 
      required: true,
    },
    phoneNumber: { 
      type: Number, 
      required: true,
      unique: true,
      trim:true,
      index:true
    },
    gender: {
      type:String,
      trim:true,
      lowercase:true,
      index:true
    },
    bio: {
      type:String, 
      trim:true, 
      lowercase:true, 
      index:true
    },
    refreshToken: {
      type: String,
    },
    
  // profilePhoto:{type:String}, 
  },  
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// username: this.username,
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      idNumber: this.idNumber,
      email: this.email,
      name: this.fullname,
      phoneNumber: this.phoneNumber,
      
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRRESH_TOKEN_EXPIRY }
  );
};


const User = mongoose.model('Ta', userSchema);

export default User;
