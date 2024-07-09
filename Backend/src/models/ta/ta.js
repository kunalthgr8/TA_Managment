import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: {type:String},
  bio:{type:String},
  // profilePhoto:{type:String}, 
});

const User = mongoose.model('Ta', userSchema);

export default User;
