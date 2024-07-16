const courseTypeDef = `
  type CourseDetail {
    courseName: String!
    courseCode: String!
    semester: String!
    skills: [String!]!
    status: String!
    selectedTAs: [String]
  }

  type Course {
    idNumber: ID!
    courses: [CourseDetail]
  }

  type CourseDetailApiResponse {
    status: Int
    message: String
    data: CourseDetail
  }

  type CourseApiResponse {
    status: Int
    message: String
    data: Course
  }

  input CourseInfo {
    courseName: String!
    courseCode: String!
    semester: String!
    skills: [String!]!
    status: String!
    selectedTAs: [String]
  }

  input CourseDetailInput {
    idNumber: ID!
    courses: [CourseInfo]
  }

  type Query {
    getCourses(idNumber: ID!): CourseApiResponse
    getCourseByCode(courseCode: String!, idNumber: ID!): CourseDetailApiResponse
  }

  type Mutation {
    addCourse(input: CourseDetailInput): CourseApiResponse
    deleteFacultyCourse(idNumber: ID!): CourseApiResponse
  }
`;

export default courseTypeDef;
