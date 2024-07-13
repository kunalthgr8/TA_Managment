import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query GetSkills($idNumber: ID!) {
    getSkills(idNumber: $idNumber) {
      idNumber
      areaOfSpecialization
      primarySkills
      secondarySkills
      primaryProgSkills
      secondaryProgSkills
      softwareTools
      hardwareTools
      patents
      publications
    }
  }
`;

export const GET_ALL_SKILLS = gql`
  query GetAllSkills {
    getAllSkills {
      idNumber
      areaOfSpecialization
      primarySkills
      secondarySkills
      primaryProgSkills
      secondaryProgSkills
      softwareTools
      hardwareTools
      patents
      publications
    }
  }
`;
