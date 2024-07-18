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

export const LOGOUT_FACULTY = gql`
  mutation logoutFaculty($idNumber: ID!) {
    logoutFaculty(idNumber: $idNumber) {
      status
      message
    }
  }
`;

export const CHANGE_PASSWORD_FACULTY = gql`
  mutation changePasswordFaculty($input: ChangePasswordInputFaculty!) {
    changePasswordFaculty(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_FACULTY = gql`
  mutation updateFaculty($input: UpdateFacInput!) {
    updateFaculty(input: $input) {
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