const courseTypeDef = `
type SelectedTa {
  idNumber: ID!
  courseCodes: [String!]!
  leaveRequests: [Leave!]!
  leaveHistory: [Leave!]!
}

type Course {
  courseName: String!
  courseCode: String!
  semester: String!
  skills: [String!]!
  selectedTAs: [SelectedTa!]!
  courseInstructor: Faculty
}

type Courses {
  idNumber: ID!
  courses: [Course!]!
}

type Query {
  getCourses(idNumber: ID!): Courses
  getCourseByCode(courseCode: String!): Course
}

type Mutation {
  addCourse(idNumber: ID!, course: CourseInput!): Courses
  updateCourse(idNumber: ID!, courseCode: String!, course: CourseInput!): Course
  deleteCourse(idNumber: ID!, courseCode: String!): Course
}

input CourseInput {
  courseName: String!
  courseCode: String!
  semester: String!
  skills: [String!]!
  courseInstructor: ID!
}

`;

export default courseTypeDef;
