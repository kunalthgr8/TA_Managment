import mongoose from 'mongoose';

const socialProfileSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  portfolio: { type: String },
  linkedin: { type: String },
  github: { type: String },
  twitter: { type: String },
});

const SocialProfile = mongoose.model('SocialProfile', socialProfileSchema);

export default SocialProfile;