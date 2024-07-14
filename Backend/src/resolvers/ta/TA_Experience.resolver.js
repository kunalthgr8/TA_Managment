import Experience from "../../models/ta/experience.js";
import { ApiError } from "../../utils/ApiError.js";

const experienceResolver = {
  Query: {
    getExperience: async (parent, { idNumber }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const experience = await Experience.findOne({ idNumber });
        return {
          status: 201,
          message: "Experience fetched successfully",
          data: experience,
        };
      } catch (error) {
        throw new ApiError(400, "Error fetching experience");
      }
    },
    getAllExperience: async () => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        return await Experience.find();
      } catch (error) {
        throw new ApiError(400, "Error fetching experience");
      }
    },
  },
  Mutation: {
    createExperience: async (parent, { input }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      const { idNumber, experience } = input;
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const existingExperience = await Experience.findOne({ idNumber });
        if (existingExperience) {
          existingExperience.experience = experience;
          const response = await existingExperience.save({ new: true });
          return {
            status: 201,
            message: "Experience Updated Successfully",
            data: response,
          };
        } else {
          const response = await Experience.create({ idNumber, experience });
          return {
            status: 201,
            message: "Experience Created Successfully",
            data: response,
          };
        }
      } catch (error) {
        throw new ApiError(400, "Error creating experience");
      }
    },
    updateExperience: async (parent, { idNumber, experience }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const updatedExperience = await Experience.findOneAndUpdate(
          { idNumber },
          { $set: { experience } },
          { new: true }
        );
        if (!updatedExperience) {
          throw new ApiError(404, "Experience not found");
        }
        return updatedExperience;
      } catch (error) {
        throw new ApiError(400, "Error updating experience");
      }
    },
    deleteExperience: async (parent, { idNumber }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const deletedExperience = await Experience.findOneAndDelete({
          idNumber,
        });
        if (!deletedExperience) {
          throw new ApiError(404, "Experience not found");
        }
        return deletedExperience;
      } catch (error) {
        throw new ApiError(400, "Error deleting experience");
      }
    },
  },
};

export default experienceResolver;
