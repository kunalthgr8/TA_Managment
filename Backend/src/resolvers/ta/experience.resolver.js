import Experience from '../../models/experience.js';

const experienceResolver = {
  Query: {
    getExperience: async (parent, { idNumber }) => {
      try {
        const experience = await Experience.findOne({ idNumber });
        if (!experience) {
          throw new Error("Experience not found");
        }
        return experience;
      } catch (error) {
        console.error("Error fetching experience:", error);
        throw new Error("Error fetching experience");
      }
    },
    getAllExperience: async () => {
      try {
        return await Experience.find();
      } catch (error) {
        console.error("Error fetching all experience:", error);
        throw new Error("Error fetching all experience");
      }
    }
  },
  Mutation: {
    createExperience: async (parent, { idNumber, experience }) => {
      try {
        const newExperience = new Experience({ idNumber, experience });
        return await newExperience.save();
      } catch (error) {
        console.error("Error creating experience:", error);
        throw new Error("Error creating experience");
      }
    },
    updateExperience: async (parent, { idNumber, experience }) => {
      try {
        const updatedExperience = await Experience.findOneAndUpdate(
          { idNumber },
          { $set: { experience } },
          { new: true }
        );
        if (!updatedExperience) {
          throw new Error("Experience not found");
        }
        return updatedExperience;
      } catch (error) {
        console.error("Error updating experience:", error);
        throw new Error("Error updating experience");
      }
    },
    deleteExperience: async (parent, { idNumber }) => {
      try {
        const deletedExperience = await Experience.findOneAndDelete({ idNumber });
        if (!deletedExperience) {
          throw new Error("Experience not found");
        }
        return deletedExperience;
      } catch (error) {
        console.error("Error deleting experience:", error);
        throw new Error("Error deleting experience");
      }
    }
  }
};

export default experienceResolver;
