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

  type TADetail {
  idNumber: String
  name: String
  email: String
  phoneNumber: String
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

  type TADetailApiResponse {
  status: Int
  message: String
  data: [TADetail]
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
    getTAByCourseCode(courseCode: String!, idNumber: ID!): TADetailApiResponse
  }

  type Mutation {
    addCourse(input: CourseDetailInput): CourseApiResponse
    deleteFacultyCourse(idNumber: ID!): CourseApiResponse
    addTaToCourse(idNumber: ID!, courseCode: String!, taId:ID! ): CourseDetailApiResponse
  }
`;

export default courseTypeDef;
