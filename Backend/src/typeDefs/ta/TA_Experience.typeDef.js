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

  type ExperienceApiResponse {
    status: Int
    message: String
    data: Experience
  }

  extend type Query {
    getExperience(idNumber: ID!): ExperienceApiResponse
    getAllExperience: [Experience]
  }

  input ExperienceInfo {
    company: String
    role: String
    description: String
    startDate: String
    endDate: String
  }

  input ExperienceDetailInput {
    idNumber: ID!
    experience: [ExperienceInfo]
  }

  extend type Mutation {
    createExperience(
      input: ExperienceDetailInput
    ): ExperienceApiResponse

    updateExperience(
      input: ExperienceDetailInput
    ): Experience

    deleteExperience(idNumber: ID!): ExperienceApiResponse
  }

`;

export default experienceTypeDefs;
