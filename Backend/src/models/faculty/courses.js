import mongoose from "mongoose";
import SelectedTa from "./selectedTa.js";
import Faculty from "./faculty.js";

const coursesSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  courses: [
    {
      courseName: { type: String },
      courseCode: { type: String },
      semester: { type: String },
      skills: [{ type: String }],
      selectedTAs: [
        { type: mongoose.Schema.Types.ObjectId, ref: "SelectedTa" },
      ],
      courseInstructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
      },
    },
  ],
});

const Courses = mongoose.model("Courses", coursesSchema);

export default Courses;
