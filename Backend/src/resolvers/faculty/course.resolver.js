import Courses from '../../models/faculty/courses.js';
// import Faculty from '../../models/faculty/faculty.js';
// import SelectedTa from '../../models/faculty/selectedTa.js';
import {ApiError} from '../../utils/ApiError.js';
import {ApiResponse} from '../../utils/ApiResponse.js';

const coursesResolvers = {
  Query: {
    getCourses: async (_, { idNumber },context) => {
      if (!context.user) {
        throw new ApiError(404, "Unauthorized");
        } 
        if (idNumber !== context.user.idNumber) {
          throw new ApiError(404, "Unauthorized");
        }
      try {
        const courses = await Courses.findOne({ idNumber });
        if (!courses) {
          return { status: 200, message: "Courses not found", data: null };
        }
        return { status: 201, message: "Success", data: courses };
      } catch (error) {
        return { status: 500, message: error.message, data: null };
      }
    },
    
    // getCourseByCode: async (_, { courseCode }) => {
    //   try {
    //     const course = await Courses.findOne({ "courses.courseCode": courseCode }).populate('courseInstructor').populate('selectedTAs');
    //     if (!course) {
    //       throw new ApiError(404, "Course not found");
    //     }
    //     const foundCourse = course.courses.find(c => c.courseCode === courseCode);
    //     return new ApiResponse(200, foundCourse, "Course found by code");
    //   } catch (error) {
    //     console.error("Error fetching course by code:", error);
    //     throw new ApiError(500, "Error fetching course by code", [], error.stack);
    //   }
    // }
  },
  Mutation: {
    
    addCourse: async (_, { input },context) => {
      if (!context.user) {
      throw new ApiError(404, "Unauthorized");
      } 
      const { idNumber, courses } = input;
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(404, "Unauthorized");
      }
      try {
        const { idNumber, courses } = input;
        const facultyCourses = await Courses.findOne({ idNumber });
        if (facultyCourses) {
          facultyCourses.courses.push(...courses);
          console.log("FacultyResponse",facultyCourses);
          const response = await facultyCourses.save({new:true});
          console.log("Responses",response);
          return {
            status: 201,
            message: "Course added successfully",
            data: response,
          }
        } else {
          const response = await Courses.create({ idNumber, courses });
          return {
            status: 201,
            message: "Course added successfully",
            data: response,
          }
        }
      } catch (error) {
        console.error("Error adding course:", error);
        throw new ApiError(500, error.message);
      }
    },

    // updateCourse: async (_, { idNumber, courseCode, course }) => {
    //   try {
    //     const updatedCourse = await Courses.findOneAndUpdate(
    //       { idNumber, "courses.courseCode": courseCode },
    //       { $set: { "courses.$": course } },
    //       { new: true }
    //     );
    //     if (!updatedCourse) {
    //       throw new ApiError(404, "Course not found");
    //     }
    //     const foundCourse = updatedCourse.courses.find(c => c.courseCode === courseCode);
    //     return new ApiResponse(200, foundCourse, "Course updated successfully");
    //   } catch (error) {
    //     console.error("Error updating course:", error);
    //     throw new ApiError(500, "Error updating course", [], error.stack);
    //   }
    // },
  
    deleteFacultyCourse: async (_, { idNumber }) => {
      try {
        const result = await Courses.findOneAndDelete({ idNumber });
        if (!result) {
          return { status: 404, message: "Course not found", data: null };
        }
        return { status: 201, message: "Course deleted successfully", data: null };
      } catch (error) {
        return { status: 500, message: error.message, data: null };
      }
    },
  }
};

export default coursesResolvers;
