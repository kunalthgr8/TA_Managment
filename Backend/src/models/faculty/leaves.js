import mongoose from 'mongoose';

const leaveDetailSchema = new mongoose.Schema({
  startDate: { type: String },
  endDate: { type: String },
  duration: { type: String },
  reason: { type: String },
  status: { 
    type: String, 
    enum: ["APPROVED", "PENDING", "REJECTED"], 
    default: "PENDING" 
  },
});

const leaveIdSchema = new mongoose.Schema({
  idNumber: { type: String, required: true }, // Added field to store IdNumber
  leaves: [leaveDetailSchema],
});

const leaveSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  leave: [leaveIdSchema],
}, {
  timestamps: true,
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;
