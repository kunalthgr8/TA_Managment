import SelectedTa from '../../models/SelectedTa.js';
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';

const selectedTaResolvers = {
  Query: {
    getSelectedTa: async (_, { idNumber }) => {
      try {
        const selectedTa = await SelectedTa.findOne({ idNumber });
        if (!selectedTa) {
          throw new ApiError(404, "Selected TA not found");
        }
        return new ApiResponse(200, selectedTa, "Selected TA found");
      } catch (error) {
        console.error("Error fetching selected TA:", error);
        throw new ApiError(500, "Error fetching selected TA", [], error.stack);
      }
    }
  },
  Mutation: {
    addLeaveRequest: async (_, { input }) => {
      try {
        const { idNumber, leave } = input;
        const selectedTa = await SelectedTa.findOneAndUpdate(
          { idNumber },
          { $push: { leaveRequests: leave } },
          { new: true }
        );
        if (!selectedTa) {
          throw new ApiError(404, "Selected TA not found");
        }
        return new ApiResponse(200, selectedTa, "Leave request added successfully");
      } catch (error) {
        console.error("Error adding leave request:", error);
        throw new ApiError(500, "Error adding leave request", [], error.stack);
      }
    }
  }
};

export default selectedTaResolvers;
