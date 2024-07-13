import { gql } from "@apollo/client";

export const CREATE_SKILLS = gql`
  mutation CreateSkills(
    $idNumber: ID!
    $areaOfSpecialization: [String]
    $primarySkills: [String]
    $secondarySkills: [String]
    $primaryProgSkills: [String]
    $secondaryProgSkills: [String]
    $softwareTools: [String]
    $hardwareTools: [String]
    $patents: [String]
    $publications: [String]
  ) {
    createSkills(
      idNumber: $idNumber
      areaOfSpecialization: $areaOfSpecialization
      primarySkills: $primarySkills
      secondarySkills: $secondarySkills
      primaryProgSkills: $primaryProgSkills
      secondaryProgSkills: $secondaryProgSkills
      softwareTools: $softwareTools
      hardwareTools: $hardwareTools
      patents: $patents
      publications: $publications
    ) {
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

export const UPDATE_SKILLS = gql`
  mutation UpdateSkills(
    $idNumber: ID!
    $areaOfSpecialization: [String]
    $primarySkills: [String]
    $secondarySkills: [String]
    $primaryProgSkills: [String]
    $secondaryProgSkills: [String]
    $softwareTools: [String]
    $hardwareTools: [String]
    $patents: [String]
    $publications: [String]
  ) {
    updateSkills(
      idNumber: $idNumber
      areaOfSpecialization: $areaOfSpecialization
      primarySkills: $primarySkills
      secondarySkills: $secondarySkills
      primaryProgSkills: $primaryProgSkills
      secondaryProgSkills: $secondaryProgSkills
      softwareTools: $softwareTools
      hardwareTools: $hardwareTools
      patents: $patents
      publications: $publications
    ) {
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

export const DELETE_SKILLS = gql`
  mutation DeleteSkills($idNumber: ID!) {
    deleteSkills(idNumber: $idNumber) {
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
