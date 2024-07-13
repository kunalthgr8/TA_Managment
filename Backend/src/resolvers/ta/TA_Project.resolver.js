import Projects from '../../models/ta/projects.js';

const projectsResolver = {
  Query: {
    getProjects: async (parent, { idNumber }) => {
      try {
        const projects = await Projects.findOne({ idNumber });
        if (!projects) {
          throw new Error("Projects not found");
        }
        return projects;
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Error fetching projects");
      }
    },
    getAllProjects: async () => {
      try {
        return await Projects.find();
      } catch (error) {
        console.error("Error fetching all projects:", error);
        throw new Error("Error fetching all projects");
      }
    }
  },
  Mutation: {
    createProject: async (parent, { idNumber, projects }) => {
      try {
        const newProjects = new Projects({ idNumber, projects });
        return await newProjects.save();
      } catch (error) {
        console.error("Error creating projects:", error);
        throw new Error("Error creating projects");
      }
    },
    updateProject: async (parent, { idNumber, projects }) => {
      try {
        const updatedProjects = await Projects.findOneAndUpdate(
          { idNumber },
          { $set: { projects } },
          { new: true }
        );
        if (!updatedProjects) {
          throw new Error("Projects not found");
        }
        return updatedProjects;
      } catch (error) {
        console.error("Error updating projects:", error);
        throw new Error("Error updating projects");
      }
    },
    deleteProject: async (parent, { idNumber }) => {
      try {
        const deletedProjects = await Projects.findOneAndDelete({ idNumber });
        if (!deletedProjects) {
          throw new Error("Projects not found");
        }
        return deletedProjects;
      } catch (error) {
        console.error("Error deleting projects:", error);
        throw new Error("Error deleting projects");
      }
    }
  }
};

export default projectsResolver;
