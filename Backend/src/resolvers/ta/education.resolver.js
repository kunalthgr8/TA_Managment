import Education from '../../models/Education';

const educationResolvers = {
  Query: {
    getEducation: async (parent, { idNumber }) => {
      try {
        return await Education.findOne({ idNumber });
      } catch (error) {
        console.error("Error fetching education:", error);
        throw new Error("Error fetching education");
      }
    },
    getAllEducation: async () => {
      try {
        return await Education.find();
      } catch (error) {
        console.error("Error fetching all education:", error);
        throw new Error("Error fetching all education");
      }
    },
  },
  Mutation: {
    createEducation: async (parent, { idNumber, education }) => {
      try {
        return await Education.create({ idNumber, education });
      } catch (error) {
        console.error("Error creating education:", error);
        throw new Error("Error creating education");
      }
    },
    updateEducation: async (parent, { idNumber, education }) => {
      try {
        return await Education.findOneAndUpdate({ idNumber }, { education }, { new: true });
      } catch (error) {
        console.error("Error updating education:", error);
        throw new Error("Error updating education");
      }
    },
    deleteEducation: async (parent, { idNumber }) => {
      try {
        return await Education.findOneAndDelete({ idNumber });
      } catch (error) {
        console.error("Error deleting education:", error);
        throw new Error("Error deleting education");
      }
    },
  },
};

export default educationResolvers;
