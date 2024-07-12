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

  extend type Mutation {
    createEducation(
      idNumber: ID!
      education: [EducationDetailInput]
    ): Education

    updateEducation(
      idNumber: ID!
      education: [EducationDetailInput]
    ): Education

    deleteEducation(idNumber: ID!): Education
  }

  input EducationDetailInput {
    degree: String
    major: String
    college: String
    year: String
    CGPA: String
  }
`;

export default educationTypeDefs;
