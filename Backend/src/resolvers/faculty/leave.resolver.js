import  Leave from '../../models/faculty/leaves.js';
import { ApiError } from '../../utils/ApiError.js';


const facultyleaveResolvers = {
    Query: {
        getLeave: async (_, {input}, context) => {
        const {courseId,idNumber} = input

        if (!context.user) {
            throw new ApiError(404, "Unauthorized");
        }
        try {
            const response = await Leave.findOne({ courseId });
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
        // createLeave: async (_, { input }, context) => {
        //     const { courseId, idNumber, leaves } = input;
        //     // if (!context.user) {
        //     //     throw new ApiError(404, "Unauthorized");
        //     // }
        //     try {
        //         const response = await Leave.findOne({ courseId });
        //         if (response) {
        //             const leave = response.leave.find((leave) => leave.idNumber === idNumber);
        //             if (leave) {
        //                 leave.leaves.push(...leaves);
        //             } else {
        //                 response.leave.push({ idNumber, leaves });
        //             }
        //             const updatedResponse = await response.save();
        //             return {
        //                 status: 201,
        //                 message: "Leave created successfully",
        //                 data: updatedResponse,
        //             };
        //         } else {
        //             const newLeave = new Leave({
        //                 courseId,
        //                 leave: [{ idNumber, leaves }],
        //             });
        //             const createdResponse = await newLeave.save();
        //             return {
        //                 status: 201,
        //                 message: "Leave created successfully",
        //                 data: createdResponse,
        //             };
        //         }
        //     } catch (error) {
        //         throw new ApiError(404, "Error creating leave");
        //     }
        // },
    },
};

export default facultyleaveResolvers;