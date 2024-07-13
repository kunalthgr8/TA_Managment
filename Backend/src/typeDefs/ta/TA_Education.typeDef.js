const educationTypeDefs = `
  type EducationDetail {
    degree: String
    major: String
    college: String
    year: String
    CGPA: String
  }

  type Education {
    idNumber: ID!
    education: [EducationDetail]
  }

  type EducationApiResponse {
    status: Int
    message: String
    data: Education
  }

  extend type Query {
    getEducation(idNumber: ID!): EducationApiResponse
    getAllEducation: [Education]
  }

  input EducationInfo {
    degree: String
    major: String
    college: String
    year: String
    CGPA: String
  }

  input EducationDetailInput {
      idNumber: ID!
      education: [EducationInfo]
    }

  extend type Mutation {
    createEducation(
      input: EducationDetailInput
    ): EducationApiResponse

    updateEducation(
      input: EducationDetailInput
    ): Education

    deleteEducation(idNumber: ID!): EducationApiResponse
  }

`;

export default educationTypeDefs;
