import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: { type: String },
  courseCode: { type: String },
  semester: { type: String },
  skills: [{ type: String }],
  selectedTAs: [
    { type: String }
  ],
  status: { 
    type: String, 
    enum: ["TA_ASSIGNED", "COURSE_REGISTERED", "PRE_COURSE_REGISTER"], 
    default: "PRE_COURSE_REGISTER" 
  },
});

const coursesSchema = new mongoose.Schema({
  idNumber: { 
    type: String, 
    required: true 
  },
  courses: [courseSchema],
});

const Courses = mongoose.model("Courses", coursesSchema);

export default Courses;
