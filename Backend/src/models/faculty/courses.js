import mongoose from 'mongoose';

const coursesSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
    courses:[{
        courseName: {type:String},
        courseCode: {type:String},
        semester: {type:String},
        skills:[{type:String}],
    }]
   
});

const Courses = mongoose.model('Courses', coursesSchema);

export default Courses;
