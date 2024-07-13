import Skills from '../../models/ta/skills.js';

const skillsResolver = {
  Query: {
    getSkills: async (parent, { idNumber, field }) => {
      try {
        const skills = await Skills.findOne({ idNumber });
        if (!skills) {
          throw new Error("Skills not found");
        }
        return field ? skills[field] : skills;
      } catch (error) {
        console.error("Error fetching skills:", error);
        throw new Error("Error fetching skills");
      }
    },
    getAllSkills: async () => {
      try {
        return await Skills.find();
      } catch (error) {
        console.error("Error fetching all skills:", error);
        throw new Error("Error fetching all skills");
      }
    }
  },
  Mutation: {
    createSkills: async (parent, args) => {
      try {
        console.log(args);
        const existingSkills = await Skills.findOne({ idNumber: args.idNumber });
        if (existingSkills) {
          return await skillsResolver.Mutation.updateSkills(parent, args);
        }        
        const skills = new Skills(args);
        return await skills.save();
      } catch (error) {
        console.error("Error creating skills:", error);
        throw new Error("Error creating skills");
      }
    },
    updateSkills: async (parent, { idNumber, ...update }) => {
      try {
        const skills = await Skills.findOneAndUpdate(
          { idNumber },
          { $set: update },
          { new: true }
        );
        if (!skills) {
          throw new Error("Skills not found");
        }
        return skills;
      } catch (error) {
        console.error("Error updating skills:", error);
        throw new Error("Error updating skills");
      }
    },
    deleteSkills: async (parent, { idNumber }) => {
      try {
        const skills = await Skills.findOneAndDelete({ idNumber });
        if (!skills) {
          throw new Error("Skills not found");
        }
        return skills;
      } catch (error) {
        console.error("Error deleting skills:", error);
        throw new Error("Error deleting skills");
      }
    }
  }
};

export default skillsResolver;
