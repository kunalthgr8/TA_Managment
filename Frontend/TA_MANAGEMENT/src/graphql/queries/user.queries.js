import { gql } from '@apollo/client';

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