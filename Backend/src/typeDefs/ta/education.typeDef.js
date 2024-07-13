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

  extend type Query {
    getEducation(idNumber: ID!): Education
    getAllEducation: [Education]
  }

  input EducationDetailInput {
      idNumber: ID!
      degree: String
      major: String
      college: String
      year: String
      CGPA: String
    }

  extend type Mutation {
    createEducation(
      input: EducationDetailInput
    ): Education

    updateEducation(
      input: EducationDetailInput
    ): Education

    deleteEducation(idNumber: ID!): Education
  }

`;

export default educationTypeDefs;
