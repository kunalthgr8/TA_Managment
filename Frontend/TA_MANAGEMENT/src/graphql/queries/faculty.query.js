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

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      idNumber
      name
      email
      phoneNumber
      gender
      bio
      refreshToken
      approved
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
