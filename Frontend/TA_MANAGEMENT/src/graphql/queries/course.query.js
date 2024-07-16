import { gql } from "@apollo/client";

export const GET_ALL_COURSES = gql`
  query getCourses($idNumber: ID!) {
    getCourses(idNumber: $idNumber) {
      status
      message
      data {
        idNumber
        courses {
          courseName
          courseCode
          semester
          skills
          status
          selectedTAs
        }
      }
    }
  }
`;

export const GET_COURSE_BY_CODE = gql`
  query getCourseByCode($courseCode: String!, $idNumber: ID!) {
    getCourseByCode(courseCode: $courseCode, idNumber: $idNumber) {
      status
      message
      data {
        courseName
        courseCode
        semester
        skills
        status
        selectedTAs
      }
    }
  }
`;
