const LeaveTypeDefs = `
  type LeaveDetail {
    startDate: String
    endDate: String
    duration: String
    reason: String
    status: String
  }

  type LeaveId {
    idNumber: ID!
    leaves: [LeaveDetail]
  }

  type Leave {
    courseId: ID!
    leave: [LeaveId]
  }

  type LeaveApiResponse {
    status: Int
    message: String
    data: Leave
  }

  input TAleaveInput {
    courseId: ID!
    idNumber: ID!
  }

  input leaveDetail {
    startDate: String
    endDate: String
    duration: String
    reason: String
    status: String
  }

  input leave {
    courseId: ID
    idNumber: ID
    leaves: [leaveDetail]
  }

  
  extend type Query {
    getleaveTA(input: TAleaveInput): LeaveApiResponse
    
  }

  extend type Mutation{
    createLeave(input: leave): LeaveApiResponse
  }

`;

export default LeaveTypeDefs;
