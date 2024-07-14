// src/graphql/mutations.js
// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const REGISTER_FACULTY = gql`
  mutation RegisterFaculty($input: RegisterInput!) {
    registerFaculty(input: $input) {
      status
      message
      data {
        idNumber
        name
        email
        phoneNumber
        accessToken
      }
    }
  }
`;

export const LOGIN_FACULTY = gql`
  mutation loginFaculty($input: LoginInput!) {
    loginFaculty(input: $input) {
      status
      message
      data {
        name
        idNumber
        email
        phoneNumber
        accessToken
      }
    }
  }
`;



// export const LOGOUT_USER = gql`
//   mutation logoutUser($idNumber: ID!) {
//     logoutUser(idNumber: $idNumber) {
//       status
//       message
//     }
//   }
// `;
