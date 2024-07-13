import Education from '../../models/ta/education.js';

const educationResolvers = {
  Query: {
    getEducation: async (parent, { idNumber }) => {
      try {
        const response = await Education.findOne({ idNumber }); 
        return {
          status: 201,
          message: "Education fetched successfully",
          data: response,
        }
      } catch (error) {
        console.error("Error fetching education:", error);
        throw new Error("Error fetching education");
      }
    },
    getAllEducation: async () => {
      try {
        console.log("Get all education")
        return await Education.find();
      } catch (error) {
        console.error("Error fetching all education:", error);
        throw new Error("Error fetching all education");
      }
    },
  },
  Mutation: {
    createEducation: async (parent, args) => {
      const { idNumber, education } = args.input;
      console.log("Create education args:", args.input)
      // const education = {idNumber:idNumber,degree:degree,major:major,college:college,year:year,CGPA:CGPA}
      try {
        // const response = await Education.create({ idNumber, education});
        const existingEducation = await Education.findOne({ idNumber });
        if (existingEducation) {
          existingEducation.education = education;
          const response = await existingEducation.save({new: true});
          return {
            status: 201,
            message: "Education Updated Successfully",
            data: response,
          };
        } else {
          const response = await Education.create({ idNumber, education });
          return {
            status: 201,
            message: "Education Created Successfully",
            data: response,
          };
        }
      } catch (error) {
        console.error("Error creating education:", error);
        throw new Error("Error creating education");
      }
    },
    updateEducation: async (parent, args) => {
      const { idNumber, education } = args.input;
      try {
        return await Education.findOneAndUpdate({ idNumber }, { education }, { new: true });
      } catch (error) {
        console.error("Error updating education:", error);
        throw new Error("Error updating education");
      }
    },
    // deleteEducation: async (parent, { idNumber }) => {
    //   try {
    //     const response = await Education.findOneAndDelete({ idNumber });
    //     return {
    //       status: 201,
    //       message: "Education deleted successfully",
    //       data: response,
    //     }
    //   } catch (error) {
    //     console.error("Error deleting education:", error);
    //     throw new Error("Error deleting education");
    //   }
    // },
  },
};

export default educationResolvers;
