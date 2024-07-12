// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      status
      message
      data {
        user {
          _id
          name
          idNumber
          email
          phoneNumber
        }
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
