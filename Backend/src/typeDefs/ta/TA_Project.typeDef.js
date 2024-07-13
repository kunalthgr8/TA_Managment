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

  type ProjectsApiResponse {
    status: Int
    message: String
    data: Projects
  }

  extend type Query {
    getProjects(idNumber: ID!): ProjectsApiResponse
    getAllProjects: [Projects]
  }

  input ProjectInfo {
    title: String
    role: String
    description: String
    githubLink: String
    liveLink: String
    techstack: [String]
  }

  input ProjectDetailInput {
    idNumber: ID!
    projects: [ProjectInfo]
  }

  extend type Mutation {
    createProject(
      input: ProjectDetailInput
    ): ProjectsApiResponse

    updateProject(
      input: ProjectDetailInput
    ): ProjectsApiResponse

    deleteProject(idNumber: ID!): ProjectsApiResponse
  }

  
`;

export default projectsTypeDefs;
