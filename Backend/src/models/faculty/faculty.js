import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
   
});

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;
