import mongoose from 'mongoose';

const experienceDetailSchema = new mongoose.Schema({
  company: { type: String },
  role: { type: String },
  description: { type: String },
  startDate: { type: String },
  endDate: { type: String },
});

const experienceSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  experience: [experienceDetailSchema]
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
