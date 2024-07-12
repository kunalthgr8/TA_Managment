import mongoose from 'mongoose';

const educationDetailSchema = new mongoose.Schema({
  degree: { type: String },
  major: { type: String },
  college: { type: String },
  year: { type: String },
  CGPA: { type: String },
});

const educationSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  education: [educationDetailSchema]
});

const Education = mongoose.model('Education', educationSchema);

export default Education;
