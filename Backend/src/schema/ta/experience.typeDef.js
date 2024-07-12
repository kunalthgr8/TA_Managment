const experienceTypeDefs = `
  type ExperienceDetail {
    company: String
    role: String
    description: String
    startDate: String
    endDate: String
  }

  type Experience {
    idNumber: ID!
    experience: [ExperienceDetail]
  }

  extend type Query {
    getExperience(idNumber: ID!): Experience
    getAllExperience: [Experience]
  }

  extend type Mutation {
    createExperience(
      idNumber: ID!
      experience: [ExperienceDetailInput]
    ): Experience

    updateExperience(
      idNumber: ID!
      experience: [ExperienceDetailInput]
    ): Experience

    deleteExperience(idNumber: ID!): Experience
  }

  input ExperienceDetailInput {
    company: String
    role: String
    description: String
    startDate: String
    endDate: String
  }
`;

export default experienceTypeDefs;
