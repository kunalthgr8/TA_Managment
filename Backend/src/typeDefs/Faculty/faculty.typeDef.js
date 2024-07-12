const facultyTypeDef = `
type Faculty {
  id: ID!
  idNumber: String!
  name: String!
  email: String!
  phoneNumber: String!
}

type Query {
  getFaculty(id: ID!): Faculty
}

type Mutation {
  updateFaculty(id: ID!, name: String, email: String, phoneNumber: String): Faculty
  deleteFaculty(id: ID!): Faculty
}

`;

export default facultyTypeDef;
