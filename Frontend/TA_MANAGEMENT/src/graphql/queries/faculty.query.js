import { gql } from "@apollo/client";
export const GET_USER = gql`
  query GetUser($idNumber: ID!) {
    getUser(idNumber: $idNumber) {
      idNumber
      name
      email
      phoneNumber
      gender
      bio
      refreshToken
    }
  }
`;

export const GET_USER_COURSES = gql`
  query GetUserCourses($idNumber: ID!) {
    getUserCourses(idNumber: $idNumber) {
      status
      message
      data {
        idNumber
        approved
        }
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers($courseId: ID!) {
    getAllUsers(courseId: $courseId) {
      status
      message
      data {
        idNumber
        name
        email
        phoneNumber
        approved
      } 
    }
  }
`;


export const GET_USER_ABOUT_DETAILS = gql`
  query GetUserAboutDetails($idNumber: ID!) {
    getUser(idNumber: $idNumber) {
      idNumber
      name
      email
      phoneNumber
      gender
      bio
      refreshToken
    }
    getSocialProfile(idNumber: $idNumber) {
      idNumber
      portfolio
      linkedin
      github
      twitter
      kaggle
    }
  }
`;
