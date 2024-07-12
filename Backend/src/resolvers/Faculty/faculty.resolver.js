import Faculty from '../../models/Faculty.js';
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';

const facultyResolvers = {
  Query: {
    getFaculty: async (_, { id }) => {
      try {
        const faculty = await Faculty.findById(id);
        if (!faculty) {
          throw new ApiError(404, "Faculty not found");
        }
        return new ApiResponse(200, faculty, "Faculty found");
      } catch (error) {
        console.error("Error fetching faculty:", error);
        throw new ApiError(500, "Error fetching faculty", [], error.stack);
      }
    }
  },
  Mutation: {
    updateFaculty: async (_, { id, name, email, phoneNumber }) => {
      try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(
          id,
          { name, email, phoneNumber },
          { new: true }
        );
        if (!updatedFaculty) {
          throw new ApiError(404, "Faculty not found");
        }
        return new ApiResponse(200, updatedFaculty, "Faculty updated successfully");
      } catch (error) {
        console.error("Error updating faculty:", error);
        throw new ApiError(500, "Error updating faculty", [], error.stack);
      }
    },
    deleteFaculty: async (_, { id }) => {
      try {
        const deletedFaculty = await Faculty.findByIdAndDelete(id);
        if (!deletedFaculty) {
          throw new ApiError(404, "Faculty not found");
        }
        return new ApiResponse(200, deletedFaculty, "Faculty deleted successfully");
      } catch (error) {
        console.error("Error deleting faculty:", error);
        throw new ApiError(500, "Error deleting faculty", [], error.stack);
      }
    }
  }
};

export default facultyResolvers;
