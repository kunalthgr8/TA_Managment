import mongoose from 'mongoose';

const selectedTaSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  courseCodes: [Object],
   
});

const SelectedTa = mongoose.model('selectedTa', selectedTaSchema);

export default SelectedTa;
