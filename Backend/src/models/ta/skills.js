import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  areaOfSpecialization: [String],
  primarySkills: [String],
  secondarySkills: [String],
  primaryProgSkills: [String],
  secondaryProgSkills: [String],
  softwareTools: [String],
  hardwareTools: [String],
  patents: [String],
  publications: [String],
});

const Skills = mongoose.model("Skills", skillsSchema);

export default Skills;
