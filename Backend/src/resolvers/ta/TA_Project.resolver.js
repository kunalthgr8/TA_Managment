import Projects from "../../models/ta/projects.js";
import { ApiError } from "../../utils/ApiError.js";

const projectsResolver = {
  Query: {
    getProjects: async (parent, { idNumber }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const projects = await Projects.findOne({ idNumber });
        return {
          status: 201,
          message: "Projects fetched successfully",
          data: projects,
        };
      } catch (error) {
        throw new ApiError(500, "Error fetching projects");
      }
    },
    getAllProjects: async (_, __, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        return await Projects.find();
      } catch (error) {
        throw new ApiError(500, "Error fetching projects");
      }
    },
  },
  Mutation: {
    createProject: async (parent, { input }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      const { idNumber, projects } = input;
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const existingProjects = await Projects.findOne({ idNumber });
        if (existingProjects) {
          existingProjects.projects = projects;
          const response = await existingProjects.save({ new: true });
          return {
            status: 201,
            message: "Projects Updated Successfully",
            data: response,
          };
        } else {
          const response = await Projects.create({ idNumber, projects });
          const savedProjects = await response.save();
          return {
            status: 201,
            message: "Projects Created Successfully",
            data: savedProjects,
          };
        }
      } catch (error) {
        throw new ApiError(500, "Error creating projects");
      }
    },
    updateProject: async (parent, { idNumber, projects }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(401, "Unauthorized");
      }
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
        throw new Error("Error updating projects");
      }
    },
    deleteProject: async (parent, { idNumber }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const deletedProjects = await Projects.findOneAndDelete({ idNumber });
        if (!deletedProjects) {
          throw new ApiError(404, "Projects not found");
        }
        return deletedProjects;
      } catch (error) {
        throw new ApiError(500, "Error deleting projects");
      }
    },
  },
};

export default projectsResolver;
