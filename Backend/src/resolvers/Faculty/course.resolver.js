import Courses from '../../models/Courses.js';
import Faculty from '../../models/Faculty.js';
import SelectedTa from '../../models/SelectedTa.js';
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';

const coursesResolvers = {
  Query: {
    getCourses: async (_, { idNumber }) => {
      try {
        const courses = await Courses.findOne({ idNumber }).populate('courseInstructor').populate('selectedTAs');
        if (!courses) {
          throw new ApiError(404, "Courses not found");
        }
        return new ApiResponse(200, courses, "Courses found");
      } catch (error) {
        console.error("Error fetching courses:", error);
        throw new ApiError(500, "Error fetching courses", [], error.stack);
      }
    },
    getCourseByCode: async (_, { courseCode }) => {
      try {
        const course = await Courses.findOne({ "courses.courseCode": courseCode }).populate('courseInstructor').populate('selectedTAs');
        if (!course) {
          throw new ApiError(404, "Course not found");
        }
        const foundCourse = course.courses.find(c => c.courseCode === courseCode);
        return new ApiResponse(200, foundCourse, "Course found by code");
      } catch (error) {
        console.error("Error fetching course by code:", error);
        throw new ApiError(500, "Error fetching course by code", [], error.stack);
      }
    }
  },
  Mutation: {
    addCourse: async (_, { idNumber, course }) => {
      try {
        const newCourse = await Courses.findOneAndUpdate(
          { idNumber },
          { $push: { courses: course } },
          { new: true }
        );
        if (!newCourse) {
          throw new ApiError(404, "Courses not found");
        }
        return new ApiResponse(200, newCourse, "Course added successfully");
      } catch (error) {
        console.error("Error adding course:", error);
        throw new ApiError(500, "Error adding course", [], error.stack);
      }
    },
    updateCourse: async (_, { idNumber, courseCode, course }) => {
      try {
        const updatedCourse = await Courses.findOneAndUpdate(
          { idNumber, "courses.courseCode": courseCode },
          { $set: { "courses.$": course } },
          { new: true }
        );
        if (!updatedCourse) {
          throw new ApiError(404, "Course not found");
        }
        const foundCourse = updatedCourse.courses.find(c => c.courseCode === courseCode);
        return new ApiResponse(200, foundCourse, "Course updated successfully");
      } catch (error) {
        console.error("Error updating course:", error);
        throw new ApiError(500, "Error updating course", [], error.stack);
      }
    },
    deleteCourse: async (_, { idNumber, courseCode }) => {
      try {
        const deletedCourse = await Courses.findOneAndUpdate(
          { idNumber },
          { $pull: { courses: { courseCode } } },
          { new: true }
        );
        if (!deletedCourse) {
          throw new ApiError(404, "Course not found");
        }
        const foundCourse = deletedCourse.courses.find(c => c.courseCode === courseCode);
        return new ApiResponse(200, foundCourse, "Course deleted successfully");
      } catch (error) {
        console.error("Error deleting course:", error);
        throw new ApiError(500, "Error deleting course", [], error.stack);
      }
    }
  }
};

export default coursesResolvers;
