import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reason: { type: String }
});

const selectedTaSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  courseCodes: [{ type: Object }],
  leaveRequests: [leaveSchema], // Array to store leave requests
  leaveHistory: [leaveSchema] // Array to store leave history
});

const SelectedTa = mongoose.model('SelectedTa', selectedTaSchema);

export default SelectedTa;
