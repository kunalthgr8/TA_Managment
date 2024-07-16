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

export const GET_TA_BY_COURSE_CODE = gql`
  query getTAByCourseCode($courseCode: String!, $idNumber: ID!) {
    getTAByCourseCode(courseCode: $courseCode, idNumber: $idNumber) {
      status
      message
      data {
        idNumber
        name
        email
        phoneNumber
      }
    }
  }
`;

export const ADD_TA_TO_COURSE = gql`
  mutation addTaToCourse($idNumber: ID!, $courseCode: String!, $taId: ID!) {
    addTaToCourse(idNumber: $idNumber, courseCode: $courseCode, taId: $taId) {
      status
      message
      data {
        courseName
        courseCode
        semester
        skills
        status
        # selectedTAs {
        #   idNumber
        #   name
        #   email
        #   phoneNumber
        # }
      }
    }
  }
`;
