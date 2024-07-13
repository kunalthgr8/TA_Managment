import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
    query getProjects($idNumber: ID!) {
        getProjects(idNumber: $idNumber) {
        status
        message
        data {
            idNumber
            projects {
                title
                role
                description
                githubLink
                liveLink
                techstack
            }
        }
    }
}
`;