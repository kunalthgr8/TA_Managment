import { gql } from "@apollo/client";

export const GET_EDUCATION_USER = gql`
  query getEducation($idNumber: ID!) {
    getEducation(idNumber: $idNumber) {
      status
      message
      data {
        idNumber
        education {
          degree
          major
          college
          year
          CGPA
        }
      }
    }
  }
`;

export const GET_EXPERIENCE_USER = gql`
  query getExperience($idNumber: ID!) {
    getExperience(idNumber: $idNumber) {
      status
      message
      data {
        idNumber
        experience {
          company
          role
          description
          startDate
          endDate
        }
      }
    }
  }
`;
export const GET_USER = gql`
  query GetUser($idNumber: ID!) {
    getUser(idNumber: $idNumber) {
      idNumber
      name
      email
      phoneNumber
      gender
      bio
      profilePicture {
        taId
        picture
      }
    }
  }
`;
