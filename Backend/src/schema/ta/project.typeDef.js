const projectsTypeDefs = `
  type ProjectDetail {
    title: String
    role: String
    description: String
    githubLink: String
    liveLink: String
    techstack: [String]
  }

  type Projects {
    idNumber: ID!
    projects: [ProjectDetail]
  }

  extend type Query {
    getProjects(idNumber: ID!): Projects
    getAllProjects: [Projects]
  }

  extend type Mutation {
    createProject(
      idNumber: ID!
      projects: [ProjectDetailInput]
    ): Projects

    updateProject(
      idNumber: ID!
      projects: [ProjectDetailInput]
    ): Projects

    deleteProject(idNumber: ID!): Projects
  }

  input ProjectDetailInput {
    title: String
    role: String
    description: String
    githubLink: String
    liveLink: String
    techstack: [String]
  }
`;

export default projectsTypeDefs;
