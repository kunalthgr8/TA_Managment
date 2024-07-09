import mongoose from 'mongoose';

const projectsSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  projects:[{
    title: {type:String},
    role: {type:String},
    description: {type:String},
    githubLink: {type:String},
    liveLink: {type:String},
    techstack:[{type:String}],
  }]
});

const Projects = mongoose.model('User', projectsSchema);

export default Projects;