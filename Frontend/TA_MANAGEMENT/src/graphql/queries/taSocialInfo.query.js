import { gql } from "@apollo/client";

export const GET_SOCIAL_PROFILE = gql`
  query getSocialProfile($idNumber: ID!) {
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

export const GET_ALL_SOCIAL_PROFILES = gql`
  query getAllSocialProfiles {
    getAllSocialProfiles {
      idNumber
      portfolio
      linkedin
      github
      twitter
      kaggle
    }
  }
`;
