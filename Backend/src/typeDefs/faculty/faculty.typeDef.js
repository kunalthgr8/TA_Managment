const facultyTypeDef = `
  type Faculty {
    id: ID!
    idNumber: String!
    name: String!
    email: String!
    phoneNumber: String!
    accessToken: String
    refreshToken: String
  }

  type AuthPayload {
    accessToken: String
    refreshToken: String
    faculty: Faculty
  }

  type FacultyApiResponse {
    status: Int
    message: String
    data: Faculty
  }

  extend type Query {
    getFaculty(id: ID!): Faculty
  }

  input RegisterInput {
    idNumber: ID!
    name: String!
    email: String!
    password: String!
    phoneNumber: String!
  }

  input LoginInput {
    idNumber: ID!
    password: String!
  }

   input UpdateFacInput {
  idNumber: ID!
  name: String
  email: String
  phoneNumber: String
}


  input ChangePasswordInputFaculty {
        idNumber: ID!
        oldPassword: String!
        newPassword: String!
    }


  extend type Mutation {
    registerFaculty(input: RegisterInput!): FacultyApiResponse
    loginFaculty(input: LoginInput!): FacultyApiResponse
    updateFaculty(input: UpdateFacInput!): FacultyApiResponse
    deleteFaculty(id: ID!): Faculty
    logoutFaculty(idNumber: ID!): FacultyApiResponse
    changePasswordFaculty(input: ChangePasswordInputFaculty!): FacultyApiResponse
  }

`;

export default facultyTypeDef;
