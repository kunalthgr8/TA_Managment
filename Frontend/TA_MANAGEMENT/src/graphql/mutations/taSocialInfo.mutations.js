import { gql } from "@apollo/client";

export const CREATE_SOCIAL_PROFILE = gql`
  mutation createSocialProfile(
    $idNumber: ID!
    $portfolio: String
    $linkedin: String
    $github: String
    $twitter: String
    $kaggle: String
  ) {
    createSocialProfile(
      idNumber: $idNumber
      portfolio: $portfolio
      linkedin: $linkedin
      github: $github
      twitter: $twitter
      kaggle: $kaggle
    ) {
      idNumber
      portfolio
      linkedin
      github
      twitter
      kaggle
    }
  }
`;


export const UPDATE_SOCIAL_PROFILE = gql`
  mutation updateSocialProfile(
    $idNumber: ID!
    $portfolio: String
    $linkedin: String
    $github: String
    $twitter: String
    $kaggle: String
  ) {
    updateSocialProfile(
      idNumber: $idNumber
      portfolio: $portfolio
      linkedin: $linkedin
      github: $github
      twitter: $twitter
      kaggle: $kaggle
    ) {
      idNumber
      portfolio
      linkedin
      github
      twitter
      kaggle
    }
  }
`;


export const DELETE_SOCIAL_PROFILE = gql`
  mutation deleteSocialProfile($idNumber: ID!) {
    deleteSocialProfile(idNumber: $idNumber) {
      idNumber
    }
  }
`;