import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
    mutation createProject($input: ProjectDetailInput!) {
        createProject(input: $input) {
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