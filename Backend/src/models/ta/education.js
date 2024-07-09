import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  education:[{
    degree: {type:String},
    major: {type:String},
    college: {type:String},
    year: {type:String},
    CGPA: {type:String},
  }]
});

const Education = mongoose.model('Education', educationSchema);

export default Education;