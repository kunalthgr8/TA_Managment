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



export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    loginUser(input: $input) {
      status
      message
      data {
        name
        idNumber
        email
        phoneNumber
      }
    }
  }
`;
