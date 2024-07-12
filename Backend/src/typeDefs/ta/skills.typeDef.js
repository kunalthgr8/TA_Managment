const skillsTypeDefs = `
  type Skills {
    idNumber: ID!
    areaOfSpecialization: [String]
    primarySkills: [String]
    secondarySkills: [String]
    primaryProgSkills: [String]
    secondaryProgSkills: [String]
    softwareTools: [String]
    hardwareTools: [String]
    patents: [String]
    publications: [String]
  }

  extend type Query {
    getSkills(idNumber: ID!): Skills
    getAllSkills: [Skills]
  }

  extend type Mutation {
    createSkills(
      idNumber: ID!
      areaOfSpecialization: [String]
      primarySkills: [String]
      secondarySkills: [String]
      primaryProgSkills: [String]
      secondaryProgSkills: [String]
      softwareTools: [String]
      hardwareTools: [String]
      patents: [String]
      publications: [String]
    ): Skills

    updateSkills(
      idNumber: ID!
      areaOfSpecialization: [String]
      primarySkills: [String]
      secondarySkills: [String]
      primaryProgSkills: [String]
      secondaryProgSkills: [String]
      softwareTools: [String]
      hardwareTools: [String]
      patents: [String]
      publications: [String]
    ): Skills

    deleteSkills(idNumber: ID!): Skills
  }
`;

export default skillsTypeDefs;
