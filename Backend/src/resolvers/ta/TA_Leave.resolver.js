import  Leave from '../../models/faculty/leaves.js';
import { ApiError } from '../../utils/ApiError.js';


const leaveResolvers = {
    Query: {
        // getLeave: async (_, {input}, context) => {
        // const {courseId,idNumber} = input

        // // if (!context.user) {
        // //     throw new ApiError(404, "Unauthorized");
        // // }
        // try {
        //     const response = await Leave.findOne({ courseId });
        //     return {
        //     status: 201,
        //     message: "Leave fetched successfully",
        //     data: response,
        //     };
        // } catch (error) {
        //     throw new ApiError(404, "Error fetching leave");
        // }
        // },
        getleaveTA: async (_, { input }, context) => {
            const { courseId, idNumber } = input;
            if (!context.user) {
                throw new ApiError(404, "Unauthorized");
            }
            try {
                const response = await Leave.findOne({ courseId });
                if (response) {
                    const leave = response.leave.find((leave) => leave.idNumber === idNumber);
                    
                    if (leave) {
                        const updatedleave = {
                            courseId: response.courseId,
                            leave: response.leave.filter((leave) => leave.idNumber === idNumber),
                        };
                        return {
                            status: 201,
                            message: "Leave fetched successfully",
                            data: updatedleave,
                        };
                    } else {
                        return {
                            status: 201,
                            message: "Leave not found",
                            data: {
                                courseId: response.courseId,
                                leave: [{ idNumber: idNumber, leaves: [] }],
                            },
                        };
                    }
                } else {
                    return {
                        status: 201,
                        message: "Leave not found",
                        data: {
                            courseId: response.courseId,
                            leave: [{ idNumber: idNumber, leaves: [] }],
                        },
                    };
                }
            } catch (error) {
                throw new ApiError(404, "Error fetching leave");
            }
        },
        
    },
    Mutation: {
        createLeave: async (_, { input }, context) => {
        if (!context.user) {
            throw new ApiError(404, "Unauthorized");
        }
        console.log("Input",input);
        const { courseId,idNumber,leaves } = input;
        
        try {
            let courseLeave = await Leave.findOne({ courseId });
        
            if (courseLeave) {
              // Check if the idNumber exists
              const idNumberExists = courseLeave.leave.some((leave) => leave.idNumber === idNumber);
        
              if (idNumberExists) {
                
                const response = await Leave.findOneAndUpdate(
                    { courseId, 'leave.idNumber': idNumber },
                    { $push: { 'leave.$.leaves': leaves[0] } },
                    { new: true }
                  );
                // console.log("Response",response);
                return {
                    status: 201,
                    message: "Leave Added Successfully",
                    data: response,
                };

              } else {
                // Add a new leaveId entry with the new leave detail
                const response = await Leave.findOneAndUpdate(
                  { courseId },
                  { $push: { leave: { idNumber, leaves: [...leaves] } }, },
                  {new:true},
                );
                // console.log("Response1",response);
                return {
                    status: 201,
                    message: "Leave Added Successfully",
                    data: response,
                };
              }
            } else {
              // Create a new courseId entry with the new leave detail
              const newCourseLeave = new Leave({
                courseId,
                leave: [{ idNumber, leaves: [...leaves] }]
              });
              const response = await newCourseLeave.save({new:true});
                return {
                    status: 201,
                    message: "Leave Created Successfully",
                    data: response,
                };
            }
          } catch (error) {
            console.error('Error adding/updating leave detail:', error);
            throw new ApiError(500, error.message);
          }
        },
    },
};

export default leaveResolvers;


