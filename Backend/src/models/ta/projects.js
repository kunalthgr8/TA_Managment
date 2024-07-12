import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String },
  role: { type: String },
  description: { type: String },
  githubLink: { type: String },
  liveLink: { type: String },
  techstack: [{ type: String }],
});

const projectsSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  projects: [projectSchema]
});

const Projects = mongoose.model('Projects', projectsSchema);

export default Projects;
