import Leave from "../../models/faculty/leaves.js";
import { ApiError } from "../../utils/ApiError.js";

const facultyleaveResolvers = {
  Query: {
    getLeave: async (_, { input }, context) => {
      const { courseId, idNumber } = input;
      if (!context.user) {
        throw new ApiError(404, "Unauthorized");
      }
      try {
        const response = await Leave.findOne({ courseId });
        if (!response) {
          throw new ApiError(404, "Leave not found");
        }
        return {
          status: 201,
          message: "Leave fetched successfully",
          data: response,
        };
      } catch (error) {
        throw new ApiError(404, "Error fetching leave");
      }
    },
  },
  Mutation: {
    leaveApprove: async (_, { input }, context) => {
        if(!context.user) {
            throw new ApiError(404, "Unauthorized");
        }
      const { courseId, idNumber, id, flag } = input;
      try {
        const response = await Leave.findOne({ courseId });
        if (response) {
          const leave = response.leave.find(
            (leave) => leave.idNumber === idNumber
          );
          if (leave) {
            const leaveDetail = leave.leaves.find((leave) => leave.id === id);
            if (leaveDetail) {
              leaveDetail.status = flag;
              const updatedResponse = await response.save({ new: true });
              return {
                status: 201,
                message: "Leave approved successfully",
                data: updatedResponse,
              };
            } else {
              throw new ApiError(404, "Leave not found");
            }
          } else {
            throw new ApiError(404, "Leave not found");
          }
        } else {
          throw new ApiError(404, "Leave not found");
        }
      } catch (error) {
        throw new ApiError(404, "Error approving leave");
      }
    },
  },
};

export default facultyleaveResolvers;
