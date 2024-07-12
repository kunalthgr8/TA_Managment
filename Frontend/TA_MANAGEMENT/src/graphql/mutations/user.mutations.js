// src/graphql/mutations.js
// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    registerUser(input: $input) {
      status
      message
      data {
        idNumber
        name
        email
        phoneNumber
        gender
        bio
        refreshToken
      }
    }
  }
`;


// export const LOGIN_USER = gql`
//   mutation RegisterUser($input: RegisterUserInput!) {
//     registerUser(input: $input) {
//       status
//       message
//       data {
//         user {
//           _id
//           name
//           idNumber
//           email
//           phoneNumber
//         }
//       }
//     }
//   }
// `;
