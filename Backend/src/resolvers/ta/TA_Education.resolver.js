import Education from "../../models/ta/education.js";
import { ApiError } from "../../utils/ApiError.js";

const educationResolvers = {
  Query: {
    getEducation: async (parent, { idNumber }, context) => {
      try {
        if (!context.user) {
          throw new ApiError(404, "Unauthorized");
        }
        const response = await Education.findOne({ idNumber });
        return {
          status: 201,
          message: "Education fetched successfully",
          data: response,
        };
      } catch (error) {
        throw new ApiError(404, "Error fetching education");
      }
    },
    getAllEducation: async (parent, { idNumber }, context) => {
      if (!context.user) {
        throw new ApiError(404, "Unauthorized");
      }
      try {
        return await Education.find();
      } catch (error) {
        throw new ApiError(404, "Error fetching all education");
      }
    },
  },
  Mutation: {
    createEducation: async (parent, { input }, context) => {
      if (!context.user) {
        throw new ApiError(404, "Unauthorized");
      }
      const { idNumber, education } = input;
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(404, "Unauthorized");
      }
      try {
        const existingEducation = await Education.findOne({ idNumber });
        if (existingEducation) {
          existingEducation.education = education;
          const response = await existingEducation.save({ new: true });
          return {
            status: 201,
            message: "Education Added Successfully",
            data: response,
          };
        } else {
          const response = await Education.create({ idNumber, education });
          return {
            status: 201,
            message: "Education Created Successfully",
            data: response,
          };
        }
      } catch (error) {
        throw new ApiError(404, "Error creating education");
      }
    },
    updateEducation: async (parent, { input }, context) => {
      if (!context.user) {
        throw new ApiError(404, "Unauthorized");
      }
      const { idNumber, education } = input;
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(404, "Unauthorized");
      }
      try {
        return await Education.findOneAndUpdate(
          { idNumber },
          { education },
          { new: true }
        );
      } catch (error) {
        throw new ApiError(404, "Error updating education");
      }
    },
  },
};

export default educationResolvers;
