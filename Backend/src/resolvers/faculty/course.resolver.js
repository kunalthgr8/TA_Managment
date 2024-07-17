import Courses from "../../models/faculty/courses.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import User from "../../models/ta/ta.js";
import SelectedTa from "../../models/faculty/selectedTa.js";
import Talist from "../../models/ta/talist.js";

const coursesResolvers = {
  Query: {
    getCourses: async (_, { idNumber }, context) => {
      if (!context.user || idNumber !== context.user.idNumber) {
        throw new ApiError(404, "Unauthorized");
      }

      try {
        const courses = await Courses.findOne({ idNumber });
        if (!courses) {
          return new ApiResponse(404, "Courses not found", null);
        }
        return { status: 201, message: "Success", data: courses };
      } catch (error) {
        return { status: 500, message: error.message, data: null };
      }
    },
    getCourseByCode: async (_, { courseCode, idNumber }, context) => {
      if (!context.user || idNumber !== context.user.idNumber) {
        throw new ApiError(404, "Unauthorized");
      }
      try {
        const course = await Courses.findOne({ idNumber });
        if (!course) {
          throw new ApiError(404, "Course not found");
        }
        const foundCourse = course.courses.find(
          (c) => c.courseCode === courseCode
        );
        if (!foundCourse) {
          throw new ApiError(404, "Course not found");
        }
        return {
          status: 200,
          message: "Course found by code",
          data: foundCourse,
        };
      } catch (error) {
        throw new ApiError(
          500,
          "Error fetching course by code",
          [],
          error.stack
        );
      }
    },
    getTAByCourseCode: async (_, { courseCode, idNumber }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const course = await Courses.findOne({ idNumber });
        if (!course) {
          throw new ApiError(404, "Course not found");
        }
        const foundCourse = course.courses.find(
          (c) => c.courseCode === courseCode
        );
        if (!foundCourse) {
          throw new ApiError(404, "Course not found");
        }
        const selectedTAs = foundCourse.selectedTAs;
        if (!selectedTAs || selectedTAs.length === 0) {
          return {
            status: 200,
            message: "TAs fetched Successfull",
            data: [],
          };
        }
        const TADetails = await User.find({ idNumber: { $in: selectedTAs } });
        let TAs = [];
        TADetails.forEach((ta) => {
          TAs.push({
            idNumber: ta.idNumber,
            name: ta.name,
            email: ta.email,
            phoneNumber: ta.phoneNumber,
          });
        });
        return {
          status: 200,
          message: "TAs fetched Successfull",
          data: TAs,
        };
      } catch (error) {
        console.error("Error fetching TAs by course code:", error);
        throw new ApiError(
          500,
          "Error fetching TAs by course code",
          [],
          error.stack
        );
      }
    },
  },
  Mutation: {
    addCourse: async (_, { input }, context) => {
      if (!context.user || context.user.idNumber !== input.idNumber) {
        throw new ApiError(404, "Unauthorized");
      }
      const { idNumber, courses } = input;
      try {
        const facultyCourses = await Courses.findOne({ idNumber });
        if (facultyCourses) {
          facultyCourses.courses.push(...courses);
          const response = await facultyCourses.save({ new: true });
          return {
            status: 201,
            message: "Course added successfully",
            data: response,
          };
        } else {
          const response = await Courses.create({ idNumber, courses });
          return {
            status: 201,
            message: "Course added successfully",
            data: response,
          };
        }
      } catch (error) {
        throw new ApiError(500, error.message);
      }
    },
    deleteFacultyCourse: async (_, { idNumber }, context) => {
      if (!context.user || idNumber !== context.user.idNumber) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const result = await Courses.findOneAndDelete({ idNumber });
        if (!result) {
          return { status: 404, message: "Course not found", data: null };
        }
        return {
          status: 201,
          message: "Course deleted successfully",
          data: null,
        };
      } catch (error) {
        return { status: 500, message: error.message, data: null };
      }
    },
    addTaToCourse: async (_, { idNumber, courseCode, taId }, context) => {
      console.log("Context:", context.user);
      console.log("idNumber:", idNumber);
      console.log("courseCode:", courseCode);
      console.log("taId:", taId);

      if (!context.user || idNumber !== context.user.idNumber) {
        throw new ApiError(401, "Unauthorized");
      }


      // try {
      //   // Check if TA is already assigned to another course
      //   const existingTaCourse = await SelectedTa.findOne({ idNumber: taId });
      //   if (existingTaCourse) {
      //     throw new ApiError(400, "TA is already assigned to another course");
      //   }

      //   // Check if TA is approved
      //   const taDetails = await User.findOne({ idNumber: taId });
      //   if (!taDetails || taDetails.approved) {
      //     throw new ApiError(404, "TA is not approved or does not exist");
      //   }

      //   // Create SelectedTa document for the TA if not already exists

      //   // Add courseCode to the selectedTAs array in Courses collection
      //   const course = await Courses.findOne({ idNumber });
      //   if (!course) {
      //     throw new ApiError(404, "Course not found");
      //   }

      //   let foundCourse = course.courses.find(
      //     (c) => c.courseCode === courseCode
      //   );
      //   if (!foundCourse) {
      //     throw new ApiError(404, "Course not found");
      //   }

      //   foundCourse.selectedTAs.push(taId);
      //   course.status = "TA_ASSIGNED";
      //   await course.save();
      //   let selectedTa = await SelectedTa.findOneAndUpdate(
      //     { idNumber: taId },
      //     { $addToSet: { courseCodes: courseCode } },
      //     { upsert: true, new: true }
      //   );
      //   taDetails.approved.push(courseCode);
      //   await taDetails.save();
      //   return {
      //     status: 201,
      //     message: "TA added to course successfully",
      //     data: foundCourse,
      //   };
      // } catch (error) {
      //   if (error instanceof ApiError) {
      //     throw error;
      //   } else {
      //     throw new ApiError(500, error.message);
      //   }
      // }

      try {
        const course = await Courses.findOne({ idNumber });
        if (!course) {
          throw new ApiError(404, "Course not found");
        }
        let foundCourse = course.courses.find(
          (c) => c.courseCode === courseCode
        );
        if (!foundCourse) {
          throw new ApiError(404, "Course not found");
        }
        foundCourse.selectedTAs.push(taId);
        await course.save();
        const taDetails = await User.findOne({ idNumber: taId });
        if (!taDetails) {
          throw new ApiError(404, "TA not found");
        }
        taDetails.approved.push(courseCode);
        await taDetails.save();
        // const talist = await Talist.findOne({ courseId: courseCode });
        // if (!talist) {
        //   const newTalist = new Talist({
        //     courseId: courseCode,
        //     talist: [taId],
        //   });
        //   await newTalist.save();
        // } else {
        //   talist.talist.push(taId);
        //   await talist.save();
        // }
        return {
          status: 201,
          message: "TA added to course successfully",
          data: foundCourse,
        };
      } catch (error) {
        throw new ApiError(500, error.message);
      }

    },
    addTAToCourseList: async (_, { courseCode, taId }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const course = await Talist.findOne({ courseId: courseCode });
        if (!course) {
          const newCourse = new Talist({
            courseId: courseCode,
            talist: [taId],
          });
          const response = await newCourse.save({new: true});
          return {
            status: 201,
            message: "TA added to course successfully",
            data: response,
          };
        } else {
          course.talist.push(taId);
          const response = await course.save({new: true});
          return {
            status: 201,
            message: "TA added to course successfully",
            data: response,
          };
        }
        
      } catch (error) {
        throw new ApiError(500, error.message);
      }
    }
  },
};

export default coursesResolvers;












