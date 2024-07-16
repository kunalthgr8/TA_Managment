import Courses from "../../models/faculty/courses.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

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
    deleteFacultyCourse: async (_, { idNumber },context) => {
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
  },
};

export default coursesResolvers;
