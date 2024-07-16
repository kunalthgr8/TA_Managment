const FacultyLeaveTypeDefs = `
  type FacultyLeaveDetail {
    startDate: String
    endDate: String
    duration: String
    reason: String
    status: String
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


  extend type Query {
    getLeave(input: FacultyleaveInput): FacultyLeaveApiResponse
    
  }

`;

export default FacultyLeaveTypeDefs;
