const FacultyLeaveTypeDefs = `
  type FacultyLeaveDetail {
    startDate: String
    endDate: String
    duration: String
    reason: String
    status: String
    id: ID
  }

  type FacultyLeaveApiResponse {
    status: Int
    message: String
    data: Leave
  }

  input FacultyleaveInput {
    courseId: ID!
    idNumber: ID!
  }

  input FacultyLeaveApprove{
    courseId: ID!
    idNumber: ID!
    id: ID!
    flag: String!
  }


  extend type Query {
    getLeave(input: FacultyleaveInput): FacultyLeaveApiResponse
    
    
  }

  extend type Mutation{
    leaveApprove(input: FacultyLeaveApprove): FacultyLeaveApiResponse
  }

`;

export default FacultyLeaveTypeDefs;
