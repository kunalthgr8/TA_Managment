import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  experience:[{
    company: {type:String},
    role: {type:String},
    description: {type:String},
    startDate: {type:String},
    endDate: {type:String},
  }]
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;




