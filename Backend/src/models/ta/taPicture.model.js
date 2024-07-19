import mongoose from "mongoose";

const taPictureSchema = new mongoose.Schema({
  taId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  picture: {
    type: String,
    required: false,
  },
});

const TAPicture = mongoose.model("TA_Picture", taPictureSchema);

export default TAPicture;
