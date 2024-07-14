import Skills from "../../models/ta/skills.js";
import { ApiError } from "../../utils/ApiError.js";

const skillsResolver = {
  Query: {
    getSkills: async (parent, { idNumber, field }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const skills = await Skills.findOne({ idNumber });
        if (!skills) {
          throw new ApiError(404, "Skills not found");
        }
        return field ? skills[field] : skills;
      } catch (error) {
        throw new ApiError(500, "Error fetching skills");
      }
    },
    getAllSkills: async (_, __, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        return await Skills.find();
      } catch (error) {
        throw new ApiError(500, "Error fetching all skills");
      }
    },
  },
  Mutation: {
    createSkills: async (parent, args, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      if (args.idNumber !== context.user.idNumber) {
        throw new ApiError(403, "Forbidden");
      }
      try {
        const existingSkills = await Skills.findOne({
          idNumber: args.idNumber,
        });
        if (existingSkills) {
          return await skillsResolver.Mutation.updateSkills(
            parent,
            args,
            context
          );
        }
        const skills = new Skills(args);
        return await skills.save();
      } catch (error) {
        throw new ApiError(500, "Error creating skills");
      }
    },
    updateSkills: async (parent, { idNumber, ...update }, context) => {
      try {
        if (!context.user) {
          throw new ApiError(401, "Unauthorized");
        }
        if (idNumber !== context.user.idNumber) {
          throw new ApiError(403, "Forbidden");
        }
        const skills = await Skills.findOneAndUpdate(
          { idNumber },
          { $set: update },
          { new: true }
        );
        if (!skills) {
          throw new ApiError(404, "Skills not found");
        }
        return skills;
      } catch (error) {
        throw new ApiError(500, "Error updating skills");
      }
    },
    deleteSkills: async (parent, { idNumber }, context) => {
      try {
        if (!context.user) {
          throw new ApiError(401, "Unauthorized");
        }
        if (idNumber !== context.user.idNumber) {
          throw new ApiError(403, "Forbidden");
        }
        const skills = await Skills.findOneAndDelete({ idNumber });
        if (!skills) {
          throw new ApiError(404, "Skills not found");
        }
        return skills;
      } catch (error) {
        throw new ApiError(500, "Error deleting skills");
      }
    },
  },
};

export default skillsResolver;
