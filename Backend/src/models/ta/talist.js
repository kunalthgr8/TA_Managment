import mongoose from 'mongoose';


const talistSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true},
  talist: [{type:String}],
});

const Talist = mongoose.model('lalitList', talistSchema);

export default Talist;