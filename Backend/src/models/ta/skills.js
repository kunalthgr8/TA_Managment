import mongoose from 'mongoose';
import Education from './education';

const skillsSchema = new mongoose.Schema({
    idNumber: { type: String, required: true },
    education: [Object],
    experience: [Object],
    projects: [Object],
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

const Skills = mongoose.model('Skills', skillsSchema);

export default Skills;